// src/store/appStore.js
import { create } from 'zustand';
import { getTodayName, getChallengeDay, resetChallengeDate } from '../utils/dateUtils';

// Claves para LocalStorage
const PLAN_ALIMENTACION_KEY = 'miPlanAlimentacion';
const PLAN_RUTINA_KEY = 'miRutinaEjercicios';
const PROGRESO_KEY = 'progresoActividades';

// --- Funciones Auxiliares de LocalStorage ---

// VV FUNCIÓN CORREGIDA VV
// Función auxiliar para cargar desde LocalStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  try {
    const parsed = storedValue ? JSON.parse(storedValue) : defaultValue;
    
    // --- INICIO DE LA CORRECCIÓN ---
    // Si la clave es una de las que esperamos que sea un array,
    // nos aseguramos de que sea un array. Si no, usamos el valor por defecto.
    if (key === PLAN_ALIMENTACION_KEY || key === PLAN_RUTINA_KEY) {
      // Si el dato guardado NO es un array, devuelve el valor por defecto (un array vacío)
      return Array.isArray(parsed) ? parsed : defaultValue;
    }
    // --- FIN DE LA CORRECCIÓN ---

    // Devuelve otros valores (como el objeto de progreso)
    return parsed;

  } catch (error) {
    // Si el JSON.parse falla (ej. datos corruptos), devuelve el valor por defecto
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};
// ^^ FUNCIÓN CORREGIDA ^^

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};
// --- Fin Funciones Auxiliares ---


export const useAppStore = create((set, get) => {
  
  // Carga inicial (ahora usa la función corregida)
  const initialPlanAlimentacion = loadFromLocalStorage(PLAN_ALIMENTACION_KEY, []);
  const initialRutinaEjercicios = loadFromLocalStorage(PLAN_RUTINA_KEY, []);
  const initialProgreso = loadFromLocalStorage(PROGRESO_KEY, {
    comidasPlanificadas: 0,
    ejerciciosProgramados: 0,
    actividadesCompletadas: 0,
    vasosDeAgua: 0, // ¡NUEVO!
  });

  // Recalcula los contadores al cargar la app
  // Esta línea ahora es segura gracias a la función corregida
  initialProgreso.comidasPlanificadas = initialPlanAlimentacion.length;
  initialProgreso.ejerciciosProgramados = initialRutinaEjercicios.length;
  initialProgreso.actividadesCompletadas = 
    initialPlanAlimentacion.filter(c => c.completed).length + 
    initialRutinaEjercicios.filter(r => r.completed).length;


  return {
    // --- Estado ---
    challengeDay: getChallengeDay(),
    todayName: getTodayName(),
    miPlanAlimentacion: initialPlanAlimentacion,
    miRutinaEjercicios: initialRutinaEjercicios,
    progreso: initialProgreso,

    // --- Acciones (Mutaciones del estado) ---

    // Función auxiliar para recalcular todo el progreso
    recalcularProgreso: () => {
      const comidas = get().miPlanAlimentacion;
      const rutinas = get().miRutinaEjercicios;
      
      const comidasPlanificadas = comidas.length;
      const ejerciciosProgramados = rutinas.length;
      
      const comidasCompletadas = comidas.filter(c => c.completed).length;
      const rutinasCompletadas = rutinas.filter(r => r.completed).length;
      
      const newProgreso = {
        ...get().progreso,
        comidasPlanificadas: comidasPlanificadas,
        ejerciciosProgramados: ejerciciosProgramados,
        actividadesCompletadas: comidasCompletadas + rutinasCompletadas
      };
      
      set({ progreso: newProgreso });
      saveToLocalStorage(PROGRESO_KEY, newProgreso);
    },

    // Acción para añadir texto al plan de alimentación
    addAlPlanAlimentacion: (texto) => {
      const newId = new Date().getTime(); // ID simple
      const newItem = { id: newId, text: texto, completed: false };
      const newState = [...get().miPlanAlimentacion, newItem];
      
      set({ miPlanAlimentacion: newState });
      saveToLocalStorage(PLAN_ALIMENTACION_KEY, newState);
      get().recalcularProgreso(); // Recalcula
    },

    // Acción para añadir texto a la rutina de ejercicios
    addAlPlanRutina: (texto) => {
      const newId = new Date().getTime(); // ID simple
      const newItem = { id: newId, text: texto, completed: false };
      const newState = [...get().miRutinaEjercicios, newItem];

      set({ miRutinaEjercicios: newState });
      saveToLocalStorage(PLAN_RUTINA_KEY, newState);
      get().recalcularProgreso(); // Recalcula
    },

    // ¡NUEVO! Acción para marcar/desmarcar un ítem
    togglePlanItem: (tipo, id) => {
      let key, stateSlice;
      if (tipo === 'comida') {
        key = PLAN_ALIMENTACION_KEY;
        stateSlice = 'miPlanAlimentacion';
      } else if (tipo === 'ejercicio') {
        key = PLAN_RUTINA_KEY;
        stateSlice = 'miRutinaEjercicios';
      } else return;

      // Mapea el array correspondiente y cambia el 'completed' del ítem
      const newState = get()[stateSlice].map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );

      set({ [stateSlice]: newState });
      saveToLocalStorage(key, newState);
      get().recalcularProgreso(); // Recalcula
    },

    // ¡NUEVO! Acción para el tracker de agua
    setVasosDeAgua: (cantidad) => {
      if (cantidad < 0) cantidad = 0;
      const newProgreso = { ...get().progreso, vasosDeAgua: cantidad };
      set({ progreso: newProgreso });
      saveToLocalStorage(PROGRESO_KEY, newProgreso);
    },
    
    // Acción para limpiar los planes
    clearPlanes: () => {
      if (window.confirm("¿Vaciar 'Mi Plan de Alimentación' y 'Mi Rutina de Ejercicios'?")) {
        set({ miPlanAlimentacion: [], miRutinaEjercicios: [] });
        localStorage.removeItem(PLAN_ALIMENTACION_KEY);
        localStorage.removeItem(PLAN_RUTINA_KEY);
        get().recalcularProgreso(); // Recalcula
      }
    },

    // Acción para reiniciar el reto
    reiniciarRetoCompleto: () => {
      if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso y planes guardados, y volverás al Día 1.")) {
        resetChallengeDate();
        const initialProgreso = { 
          comidasPlanificadas: 0, 
          ejerciciosProgramados: 0, 
          actividadesCompletadas: 0, 
          vasosDeAgua: 0
        };
        set({ 
          challengeDay: 1,
          progreso: initialProgreso,
          miPlanAlimentacion: [],
          miRutinaEjercicios: []
        });
        localStorage.removeItem(PROGRESO_KEY);
        localStorage.removeItem(PLAN_ALIMENTACION_KEY);
        localStorage.removeItem(PLAN_RUTINA_KEY);
        window.location.reload();
      }
    }
  };
});