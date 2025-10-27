// src/store/appStore.js
import { create } from 'zustand';
import { getTodayName, getChallengeDay, resetChallengeDate } from '../utils/dateUtils';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import { useAuthStore } from './authStore';

const PLAN_ALIMENTACION_KEY = 'miPlanAlimentacion';
const PLAN_RUTINA_KEY = 'miRutinaEjercicios';
const HISTORICAL_DATA_KEY = 'historicalData'; 

// --- Funciones Auxiliares (sin cambios) ---
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
    await setDoc(docRef, initialData);
    return {
      initialPlanAlimentacion: initialData.miPlanAlimentacion,
      initialRutinaEjercicios: initialData.miRutinaEjercicios,
      initialProgreso: initialData.progreso,
      initialHistoricalData: initialData.historicalData,
    };
  }
};

const saveDataToFirestore = async (key, value) => {
  const uid = useAuthStore.getState().user?.uid;
  if (!uid) return;
  
  const docRef = doc(firestore, "userProgress", uid);
  try {
    await updateDoc(docRef, { [key]: value });
  } catch (error) {
    console.error(`Error guardando ${key} en Firestore:`, error);
    await setDoc(docRef, { [key]: value }, { merge: true });
  }
};
// --- Fin Funciones Auxiliares ---


export const useAppStore = create((set, get) => ({
  // --- Estado (sin cambios) ---
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

  // ¡¡¡ --- FUNCIÓN MODIFICADA --- !!!
  fetchUserData: async (uid) => {
    set({ isStoreLoading: true });
    
    // --- INICIO DE LA CORRECCIÓN ---
    try {
      const { initialPlanAlimentacion, initialRutinaEjercicios, initialProgreso, initialHistoricalData } = await loadDataFromFirestore(uid);
      
      // Recalcula los contadores al cargar
      initialProgreso.comidasPlanificadas = initialPlanAlimentacion.length;
      initialProgreso.ejerciciosProgramados = initialRutinaEjercicios.length;
      initialProgreso.actividadesCompletadas = 
        initialPlanAlimentacion.filter(c => c.completed).length + 
        initialRutinaEjercicios.filter(r => r.completed).length;

      set({ 
        miPlanAlimentacion: initialPlanAlimentacion,
        miRutinaEjercicios: initialRutinaEjercicios,
        progreso: initialProgreso,
        historicalData: initialHistoricalData, 
        isStoreLoading: false // <-- Se pone en false al TERMINAR
      });

    } catch (error) {
      console.error("Error al cargar datos de Firestore:", error);
      // ¡Importante! Poner loading en false incluso si hay error,
      // para que la app no se quede pegada.
      set({ isStoreLoading: false });
    }
    // --- FIN DE LA CORRECCIÓN ---
  },
  // --- FIN DE LA FUNCIÓN MODIFICADA ---

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
      isStoreLoading: true
    });
  },

  recalcularProgreso: (comidas, rutinas) => {
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
    saveDataToFirestore('progreso', newProgreso);
  },

  addAlPlanAlimentacion: (texto) => {
    const newId = new Date().getTime();
    const newItem = { id: newId, text: texto, completed: false };
    const newState = [...get().miPlanAlimentacion, newItem];
    
    set({ miPlanAlimentacion: newState });
    saveDataToFirestore(PLAN_ALIMENTACION_KEY, newState);
    get().recalcularProgreso(newState, get().miRutinaEjercicios);
  },

  addAlPlanRutina: (texto) => {
    const newId = new Date().getTime();
    const newItem = { id: newId, text: texto, completed: false };
    const newState = [...get().miRutinaEjercicios, newItem];

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

    let newHistoricalTasks = [...get().historicalData.completedTasks];
    const item = get()[stateSlice].find(i => i.id === id);

    if (item && !item.completed) {
      const newRecord = {
        id: new Date().getTime(),
        date: new Date().toISOString(),
        text: item.text,
        type: tipo
      };
      newHistoricalTasks.push(newRecord);
      
      const newHistoricalData = { ...get().historicalData, completedTasks: newHistoricalTasks };
      set({ historicalData: newHistoricalData });
      saveDataToFirestore(HISTORICAL_DATA_KEY, newHistoricalData);
    }

    const newState = get()[stateSlice].map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    set({ [stateSlice]: newState });
    saveDataToFirestore(key, newState);
    
    if (tipo === 'comida') {
      get().recalcularProgreso(newState, get().miRutinaEjercicios);
    } else {
      get().recalcularProgreso(get().miPlanAlimentacion, newState);
    }
  },

  setVasosDeAgua: (cantidad) => {
    if (cantidad < 0) cantidad = 0;
    const newProgreso = { ...get().progreso, vasosDeAgua: cantidad };
    set({ progreso: newProgreso });
    saveDataToFirestore('progreso', newProgreso);
  },
  
  reiniciarRetoCompleto: async () => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return;

    if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso y planes de la nube, y volverás al Día 1.")) {
      resetChallengeDate();
      
      const initialProgreso = { 
        comidasPlanificadas: 0, 
        ejerciciosProgramados: 0, 
        actividadesCompletadas: 0, 
        vasosDeAgua: 0
      };
      const initialHistoricalData = { completedTasks: [], weight: [] };

      set({ 
        challengeDay: 1,
        progreso: initialProgreso,
        miPlanAlimentacion: [],
        miRutinaEjercicios: [],
        historicalData: initialHistoricalData
      });

      try {
        const docRef = doc(firestore, "userProgress", uid);
        await setDoc(docRef, {
          progreso: initialProgreso,
          miPlanAlimentacion: [],
          miRutinaEjercicios: [],
          historicalData: initialHistoricalData
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al reiniciar el reto en Firestore:", error);
      }
    }
  }
}));

// --- Conexión entre Stores (sin cambios) ---
useAuthStore.subscribe(
  (state) => state.user,
  (user, prevUser) => {
    if (user && !prevUser) {
      useAppStore.getState().fetchUserData(user.uid);
    } else if (!user && prevUser) {
      useAppStore.getState().clearUserData();
    }
  }
);