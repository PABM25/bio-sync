// src/store/appStore.js
import { create } from 'zustand';
import { getTodayName, getChallengeDay, resetChallengeDate } from '../utils/dateUtils';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import { useAuthStore } from './authStore';

const PLAN_ALIMENTACION_KEY = 'miPlanAlimentacion';
const PLAN_RUTINA_KEY = 'miRutinaEjercicios';
const HISTORICAL_DATA_KEY = 'historicalData'; 

// --- Funciones Auxiliares ---
const loadDataFromFirestore = async (uid) => {
  if (!uid) return { initialPlanAlimentacion: [], initialRutinaEjercicios: [], initialProgreso: {}, initialHistoricalData: {} };

  const docRef = doc(firestore, "userProgress", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      initialPlanAlimentacion: data.miPlanAlimentacion || [],
      initialRutinaEjercicios: data.miRutinaEjercicios || [],
      initialProgreso: data.progreso || { vasosDeAgua: 0 },
      initialHistoricalData: data.historicalData || { completedTasks: [], weight: [] },
    };
  } else {
    console.log("No existe documento para el usuario, creando uno nuevo...");
    const initialData = {
      miPlanAlimentacion: [],
      miRutinaEjercicios: [],
      progreso: {
        comidasPlanificadas: 0,
        ejerciciosProgramados: 0,
        actividadesCompletadas: 0,
        vasosDeAgua: 0,
      },
      historicalData: { completedTasks: [], weight: [] }
    };
    // Intenta crear el documento inicial
    try {
      await setDoc(docRef, initialData);
      return {
        initialPlanAlimentacion: initialData.miPlanAlimentacion,
        initialRutinaEjercicios: initialData.miRutinaEjercicios,
        initialProgreso: initialData.progreso,
        initialHistoricalData: initialData.historicalData,
      };
    } catch (error) {
       console.error("Error al crear el documento inicial en Firestore:", error);
       // Devuelve valores vacíos si la creación falla para no bloquear la app
       return { initialPlanAlimentacion: [], initialRutinaEjercicios: [], initialProgreso: {}, initialHistoricalData: {} };
    }
  }
};

const saveDataToFirestore = async (key, value) => {
  const uid = useAuthStore.getState().user?.uid;
  if (!uid) return;
  
  const docRef = doc(firestore, "userProgress", uid);
  try {
    // Intenta actualizar primero (más eficiente si el doc ya existe)
    await updateDoc(docRef, { [key]: value });
  } catch (error) {
    console.warn(`Error al actualizar ${key} (intentando crear/fusionar):`, error.code);
    // Si falla (ej. NOT_FOUND), intenta crear/fusionar con setDoc + merge
    try {
        await setDoc(docRef, { [key]: value }, { merge: true });
    } catch (finalError) {
        console.error(`Error final al guardar ${key} en Firestore:`, finalError);
    }
  }
};
// --- Fin Funciones Auxiliares ---

export const useAppStore = create((set, get) => ({
  // --- Estado ---
  challengeDay: getChallengeDay(),
  todayName: getTodayName(),
  miPlanAlimentacion: [],
  miRutinaEjercicios: [],
  historicalData: { completedTasks: [], weight: [] }, 
  progreso: {
    comidasPlanificadas: 0,
    ejerciciosProgramados: 0,
    actividadesCompletadas: 0,
    vasosDeAgua: 0,
  },
  isStoreLoading: true, 

  // --- Acciones ---
  fetchUserData: async (uid) => {
    set({ isStoreLoading: true });
    try {
      const { initialPlanAlimentacion, initialRutinaEjercicios, initialProgreso, initialHistoricalData } = await loadDataFromFirestore(uid);
      
      // Recalcula contadores basados en los datos cargados
      const comidasCompletadas = initialPlanAlimentacion.filter(c => c.completed).length;
      const rutinasCompletadas = initialRutinaEjercicios.filter(r => r.completed).length;

      set({ 
        miPlanAlimentacion: initialPlanAlimentacion,
        miRutinaEjercicios: initialRutinaEjercicios,
        progreso: { // Asegura que todos los campos de progreso existan
            ...initialProgreso, // Usa los valores cargados como base
            comidasPlanificadas: initialPlanAlimentacion.length,
            ejerciciosProgramados: initialRutinaEjercicios.length,
            actividadesCompletadas: comidasCompletadas + rutinasCompletadas,
            vasosDeAgua: initialProgreso.vasosDeAgua || 0, // Valor por defecto si no existe
        },
        historicalData: initialHistoricalData || { completedTasks: [], weight: [] }, // Valor por defecto
        isStoreLoading: false 
      });

    } catch (error) {
      console.error("Error crítico al cargar datos de Firestore:", error);
      set({ isStoreLoading: false }); // ¡Importante!
    }
  },

  clearUserData: () => {
    set({
      miPlanAlimentacion: [],
      miRutinaEjercicios: [],
      historicalData: { completedTasks: [], weight: [] },
      progreso: {
        comidasPlanificadas: 0,
        ejerciciosProgramados: 0,
        actividadesCompletadas: 0,
        vasosDeAgua: 0,
      },
      isStoreLoading: true // Se pondrá en false cuando inicie sesión el próximo usuario
    });
  },

  recalcularProgreso: (comidas, rutinas) => {
    // Esta función ahora solo actualiza el estado local y llama a guardar
    const comidasPlanificadas = comidas.length;
    const ejerciciosProgramados = rutinas.length;
    const comidasCompletadas = comidas.filter(c => c.completed).length;
    const rutinasCompletadas = rutinas.filter(r => r.completed).length;
    
    const newProgreso = {
      ...get().progreso, // Mantiene vasosDeAgua
      comidasPlanificadas: comidasPlanificadas,
      ejerciciosProgramados: ejerciciosProgramados,
      actividadesCompletadas: comidasCompletadas + rutinasCompletadas
    };
    
    set({ progreso: newProgreso });
    saveDataToFirestore('progreso', newProgreso); // Guarda el objeto completo
  },

  addAlPlanAlimentacion: (texto) => {
    const newId = Date.now(); // Usa Date.now() para un ID numérico simple
    const newItem = { id: newId, text: texto, completed: false };
    // Obtiene el estado actual de forma segura
    const currentState = get().miPlanAlimentacion;
    const newState = [...currentState, newItem];
    
    set({ miPlanAlimentacion: newState });
    saveDataToFirestore(PLAN_ALIMENTACION_KEY, newState);
    get().recalcularProgreso(newState, get().miRutinaEjercicios);
  },

  addAlPlanRutina: (texto) => {
    const newId = Date.now();
    const newItem = { id: newId, text: texto, completed: false };
    const currentState = get().miRutinaEjercicios;
    const newState = [...currentState, newItem];

    set({ miRutinaEjercicios: newState });
    saveDataToFirestore(PLAN_RUTINA_KEY, newState);
    get().recalcularProgreso(get().miPlanAlimentacion, newState);
  },
  
  togglePlanItem: (tipo, id) => {
    let key, stateSlice;
    if (tipo === 'comida') {
      key = PLAN_ALIMENTACION_KEY;
      stateSlice = 'miPlanAlimentacion';
    } else if (tipo === 'ejercicio') {
      key = PLAN_RUTINA_KEY;
      stateSlice = 'miRutinaEjercicios';
    } else return;

    const currentState = get()[stateSlice];
    const item = currentState.find(i => i.id === id);
    const itemWasCompleted = item?.completed; // Guarda el estado *antes* de cambiar

    // Actualiza el plan (comida/ejercicio)
    const newState = currentState.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    set({ [stateSlice]: newState });
    saveDataToFirestore(key, newState); // Guarda el plan actualizado

    // Actualiza el historial *solo si se marcó como completado*
    if (item && !itemWasCompleted) { // Si existe y NO estaba completado antes
      const currentHistoricalData = get().historicalData;
      const newRecord = {
        id: Date.now(), // ID para el registro histórico
        date: new Date().toISOString(),
        text: item.text,
        type: tipo,
        originalItemId: item.id // Guarda referencia al item original
      };
      // Asegura que completedTasks sea un array antes de hacer push
      const currentTasks = Array.isArray(currentHistoricalData.completedTasks) 
                           ? currentHistoricalData.completedTasks 
                           : [];
      const newHistoricalTasks = [...currentTasks, newRecord];
      
      const newHistoricalData = { ...currentHistoricalData, completedTasks: newHistoricalTasks };
      set({ historicalData: newHistoricalData });
      saveDataToFirestore(HISTORICAL_DATA_KEY, newHistoricalData); // Guarda el historial actualizado
    }
    // (Opcional: Si quieres quitar del historial al desmarcar, añade lógica 'else if (item && itemWasCompleted)')

    // Recalcula el progreso (esto también lo guarda en Firestore)
    if (tipo === 'comida') {
      get().recalcularProgreso(newState, get().miRutinaEjercicios);
    } else {
      get().recalcularProgreso(get().miPlanAlimentacion, newState);
    }
  },

  setVasosDeAgua: (cantidad) => {
    if (cantidad < 0) cantidad = 0;
    // Actualiza solo el campo vasosDeAgua dentro del objeto progreso
    const newProgreso = { ...get().progreso, vasosDeAgua: cantidad };
    set({ progreso: newProgreso });
    // Guarda el objeto de progreso completo
    saveDataToFirestore('progreso', newProgreso); 
  },
  
  reiniciarRetoCompleto: async () => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return;

    if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso y planes de la nube, y volverás al Día 1.")) {
      resetChallengeDate(); // Resetea fecha inicio en localStorage
      
      const initialProgreso = { 
        comidasPlanificadas: 0, 
        ejerciciosProgramados: 0, 
        actividadesCompletadas: 0, 
        vasosDeAgua: 0
      };
      const initialHistoricalData = { completedTasks: [], weight: [] };

      // Resetea estado local
      set({ 
        challengeDay: 1, // Actualiza el día localmente
        progreso: initialProgreso,
        miPlanAlimentacion: [],
        miRutinaEjercicios: [],
        historicalData: initialHistoricalData
      });

      // Resetea Firestore (sobrescribe todo el documento)
      try {
        const docRef = doc(firestore, "userProgress", uid);
        await setDoc(docRef, { // Usa setDoc para reemplazar completamente
          progreso: initialProgreso,
          miPlanAlimentacion: [],
          miRutinaEjercicios: [],
          historicalData: initialHistoricalData
        });
        // Opcional: Recargar la página para asegurar estado limpio
        // window.location.reload(); 
      } catch (error) {
        console.error("Error al reiniciar el reto en Firestore:", error);
        // Podrías mostrar un mensaje al usuario aquí
      }
    }
  }
}));

// --- Conexión entre Stores ---
// Escucha cambios en el usuario del authStore
useAuthStore.subscribe(
  (state) => state.user, // Selector: solo notifica si 'user' cambia
  (user, prevUser) => {
    // Evita ejecuciones innecesarias si el usuario no ha cambiado
    if (user?.uid === prevUser?.uid) return; 

    if (user) {
      // Usuario inició sesión: Carga sus datos
      console.log("Usuario detectado, cargando datos...", user.uid);
      useAppStore.getState().fetchUserData(user.uid);
    } else {
      // Usuario cerró sesión: Limpia los datos
      console.log("Usuario cerró sesión, limpiando datos...");
      useAppStore.getState().clearUserData();
    }
  }
);