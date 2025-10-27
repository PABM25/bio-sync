// src/store/appStore.js
import { create } from 'zustand';
import { getTodayName, getChallengeDay, resetChallengeDate } from '../utils/dateUtils';
// --- Importaciones de Firebase ---
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // 'writeBatch' no se usó, se elimina
import { firestore } from '../firebaseConfig';
import { useAuthStore } from './authStore'; // Importamos el authStore

// --- INICIO DE LA CORRECCIÓN ---
// Claves para los campos en Firestore (reemplazan las claves de LocalStorage)
const PLAN_ALIMENTACION_KEY = 'miPlanAlimentacion';
const PLAN_RUTINA_KEY = 'miRutinaEjercicios';
// --- FIN DE LA CORRECCIÓN ---

/* NOTA: Hemos eliminado TODAS las referencias a 'localStorage'.
  El estado ahora se inicializa vacío y se cargará desde Firestore.
*/

// --- Funciones Auxiliares de Firestore ---

// Función para cargar los datos del usuario desde Firestore
const loadDataFromFirestore = async (uid) => {
  if (!uid) return { initialPlanAlimentacion: [], initialRutinaEjercicios: [], initialProgreso: {} };

  const docRef = doc(firestore, "userProgress", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Devolvemos los datos con los valores por defecto si no existen
    return {
      initialPlanAlimentacion: data.miPlanAlimentacion || [],
      initialRutinaEjercicios: data.miRutinaEjercicios || [],
      initialProgreso: data.progreso || { vasosDeAgua: 0 },
    };
  } else {
    // Si el documento no existe, creamos uno básico
    console.log("No existe documento para el usuario, creando uno nuevo...");
    const initialData = {
      miPlanAlimentacion: [],
      miRutinaEjercicios: [],
      progreso: {
        comidasPlanificadas: 0,
        ejerciciosProgramados: 0,
        actividadesCompletadas: 0,
        vasosDeAgua: 0,
      }
    };
    await setDoc(docRef, initialData);
    return {
      initialPlanAlimentacion: initialData.miPlanAlimentacion,
      initialRutinaEjercicios: initialData.miRutinaEjercicios,
      initialProgreso: initialData.progreso,
    };
  }
};

// Función genérica para guardar un campo específico en Firestore
const saveDataToFirestore = async (key, value) => {
  const uid = useAuthStore.getState().user?.uid;
  if (!uid) return;
  
  const docRef = doc(firestore, "userProgress", uid);
  try {
    // Usamos updateDoc para actualizar solo los campos enviados
    await updateDoc(docRef, {
      [key]: value
    });
  } catch (error) {
    console.error(`Error guardando ${key} en Firestore:`, error);
    // Si falla (ej. el doc no existe), intentamos crearlo con setDoc (merge)
    await setDoc(docRef, { [key]: value }, { merge: true });
  }
};
// --- Fin Funciones Auxiliares ---


export const useAppStore = create((set, get) => ({
  // --- Estado ---
  challengeDay: getChallengeDay(),
  todayName: getTodayName(),
  miPlanAlimentacion: [], // Inicia vacío
  miRutinaEjercicios: [], // Inicia vacío
  progreso: {
    comidasPlanificadas: 0,
    ejerciciosProgramados: 0,
    actividadesCompletadas: 0,
    vasosDeAgua: 0,
  }, // Inicia vacío
  isStoreLoading: true, // Estado para saber si el store está cargando datos de FS

  // --- Acciones (Mutaciones del estado) ---

  // NUEVA ACCIÓN: Cargar datos cuando el usuario inicia sesión
  fetchUserData: async (uid) => {
    set({ isStoreLoading: true });
    const { initialPlanAlimentacion, initialRutinaEjercicios, initialProgreso } = await loadDataFromFirestore(uid);
    
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
      isStoreLoading: false 
    });
  },

  // NUEVA ACCIÓN: Limpiar datos cuando el usuario cierra sesión
  clearUserData: () => {
    set({
      miPlanAlimentacion: [],
      miRutinaEjercicios: [],
      progreso: {
        comidasPlanificadas: 0,
        ejerciciosProgramados: 0,
        actividadesCompletadas: 0,
        vasosDeAgua: 0,
      },
      isStoreLoading: true
    });
  },


  // Función auxiliar para recalcular todo el progreso
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
    // Guardamos el objeto de progreso actualizado
    saveDataToFirestore('progreso', newProgreso);
  },

  // Acción para añadir texto al plan de alimentación
  addAlPlanAlimentacion: (texto) => {
    const newId = new Date().getTime();
    const newItem = { id: newId, text: texto, completed: false };
    const newState = [...get().miPlanAlimentacion, newItem];
    
    set({ miPlanAlimentacion: newState });
    saveDataToFirestore(PLAN_ALIMENTACION_KEY, newState); // <-- Ahora funciona
    get().recalcularProgreso(newState, get().miRutinaEjercicios);
  },

  // Acción para añadir texto a la rutina de ejercicios
  addAlPlanRutina: (texto) => {
    const newId = new Date().getTime();
    const newItem = { id: newId, text: texto, completed: false };
    const newState = [...get().miRutinaEjercicios, newItem];

    set({ miRutinaEjercicios: newState });
    saveDataToFirestore(PLAN_RUTINA_KEY, newState); // <-- Ahora funciona
    get().recalcularProgreso(get().miPlanAlimentacion, newState);
  },

  // Acción para marcar/desmarcar un ítem
  togglePlanItem: (tipo, id) => {
    let key, stateSlice;
    if (tipo === 'comida') {
      key = PLAN_ALIMENTACION_KEY; // <-- Ahora funciona
      stateSlice = 'miPlanAlimentacion';
    } else if (tipo === 'ejercicio') {
      key = PLAN_RUTINA_KEY; // <-- Ahora funciona
      stateSlice = 'miRutinaEjercicios';
    } else return;

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

  // Acción para el tracker de agua
  setVasosDeAgua: (cantidad) => {
    if (cantidad < 0) cantidad = 0;
    const newProgreso = { ...get().progreso, vasosDeAgua: cantidad };
    set({ progreso: newProgreso });
    saveDataToFirestore('progreso', newProgreso);
  },
  
  // Acción para reiniciar el reto
  reiniciarRetoCompleto: async () => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return;

    if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso y planes de la nube, y volverás al Día 1.")) {
      resetChallengeDate(); // Resetea el día en localStorage (esto sigue siendo local)
      
      const initialProgreso = { 
        comidasPlanificadas: 0, 
        ejerciciosProgramados: 0, 
        actividadesCompletadas: 0, 
        vasosDeAgua: 0
      };
      
      // Resetea el estado local en Zustand
      set({ 
        challengeDay: 1,
        progreso: initialProgreso,
        miPlanAlimentacion: [],
        miRutinaEjercicios: []
      });

      // Resetea los datos en Firestore
      try {
        const docRef = doc(firestore, "userProgress", uid);
        await setDoc(docRef, {
          progreso: initialProgreso,
          miPlanAlimentacion: [],
          miRutinaEjercicios: []
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al reiniciar el reto en Firestore:", error);
      }
    }
  }
}));

// --- Conexión entre Stores (MUY IMPORTANTE) ---
// Hacemos que el authStore escuche los cambios del appStore

useAuthStore.subscribe(
  (state) => state.user, // Escuchamos solo al 'user'
  (user, prevUser) => {
    if (user && !prevUser) {
      // El usuario acaba de iniciar sesión
      // Llamamos a la acción de appStore para cargar sus datos
      useAppStore.getState().fetchUserData(user.uid);
    } else if (!user && prevUser) {
      // El usuario acaba de cerrar sesión
      // Limpiamos los datos de appStore
      useAppStore.getState().clearUserData();
    }
  }
);