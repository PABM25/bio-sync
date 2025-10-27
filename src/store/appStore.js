// src/store/appStore.js
import { create } from 'zustand';
import { getTodayName, getChallengeDay, resetChallengeDate } from '../utils/dateUtils';

// Claves para LocalStorage
const PLAN_ALIMENTACION_KEY = 'miPlanAlimentacion';
const PLAN_RUTINA_KEY = 'miRutinaEjercicios';
const PROGRESO_KEY = 'progresoActividades'; // Para guardar contadores

// Función auxiliar para cargar desde LocalStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  try {
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Función auxiliar para guardar en LocalStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};


export const useAppStore = create((set, get) => ({
  // --- Estado ---
  challengeDay: getChallengeDay(),
  todayName: getTodayName(),
  miPlanAlimentacion: loadFromLocalStorage(PLAN_ALIMENTACION_KEY, ''), // Carga inicial
  miRutinaEjercicios: loadFromLocalStorage(PLAN_RUTINA_KEY, ''), // Carga inicial
  progreso: loadFromLocalStorage(PROGRESO_KEY, { // Carga inicial de progreso
    comidasPlanificadas: 0,
    ejerciciosProgramados: 0,
    actividadesCompletadas: 0,
    // Podríamos añadir listas de IDs completados, etc.
  }),

  // --- Acciones (Mutaciones del estado) ---

  // Acción para añadir texto al plan de alimentación
  addAlPlanAlimentacion: (texto) => {
    const newState = get().miPlanAlimentacion + `\n- ${texto}`.trim();
    set({ miPlanAlimentacion: newState });
    saveToLocalStorage(PLAN_ALIMENTACION_KEY, newState); // Guarda en localStorage
  },

  // Acción para añadir texto a la rutina de ejercicios
  addAlPlanRutina: (texto) => {
     const newState = get().miRutinaEjercicios + `\n- ${texto}`.trim();
    set({ miRutinaEjercicios: newState });
    saveToLocalStorage(PLAN_RUTINA_KEY, newState); // Guarda en localStorage
  },
  
  // Acción para limpiar los planes (opcional)
  clearPlanes: () => {
    if (window.confirm("¿Vaciar 'Mi Plan de Alimentación' y 'Mi Rutina de Ejercicios'?")) {
      set({ miPlanAlimentacion: '', miRutinaEjercicios: '' });
      localStorage.removeItem(PLAN_ALIMENTACION_KEY);
      localStorage.removeItem(PLAN_RUTINA_KEY);
    }
  },

  // Acción para actualizar el progreso (ejemplo simple)
  incrementarProgreso: (tipo) => {
    const currentProgreso = get().progreso;
    let updatedProgreso = { ...currentProgreso };
    if (tipo === 'comida') {
      updatedProgreso.comidasPlanificadas += 1;
    } else if (tipo === 'ejercicio') {
      updatedProgreso.ejerciciosProgramados += 1;
    }
     // Aquí podrías añadir lógica más compleja para "completadas"
    
    set({ progreso: updatedProgreso });
    saveToLocalStorage(PROGRESO_KEY, updatedProgreso); // Guarda progreso
  },

  // Acción para reiniciar el reto (borra fecha y progreso)
  reiniciarRetoCompleto: () => {
     if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso y planes guardados, y volverás al Día 1.")) {
       resetChallengeDate(); // Borra la fecha de inicio
       const initialProgreso = { comidasPlanificadas: 0, ejerciciosProgramados: 0, actividadesCompletadas: 0 };
       set({ 
         challengeDay: 1, // Resetea el día en el estado
         progreso: initialProgreso, // Resetea progreso en estado
         miPlanAlimentacion: '', // Opcional: limpiar planes también
         miRutinaEjercicios: '' 
       });
       localStorage.removeItem(PROGRESO_KEY); // Borra progreso guardado
       localStorage.removeItem(PLAN_ALIMENTACION_KEY); // Opcional: borrar planes
       localStorage.removeItem(PLAN_RUTINA_KEY);
       window.location.reload(); // Recarga para que App.jsx recalcule el día 1
     }
  }
}));