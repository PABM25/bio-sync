// src/store/authStore.js
import { create } from 'zustand';

// --- CAMBIOS DE IMPORTACIÓN ---
import { 
  onAuthStateChanged, 
  signInWithRedirect, // <-- CAMBIO: Ya no es signInWithPopup
  getRedirectResult,  // <-- NUEVO: Para capturar el login al volver
  signOut 
} from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  // --- CAMBIOS EN checkAuthState ---
  checkAuthState: () => {
    set({ isLoading: true });

    // 1. Revisa si vienes de un redirect de Google
    getRedirectResult(auth)
      .then((result) => {
        // 'result' será null si la página solo se cargó
        // 'result' tendrá datos si acabas de iniciar sesión
        if (result) {
          console.log("Login capturado por getRedirectResult");
        }
      })
      .catch((error) => {
        console.error("Error al capturar redirect de Google:", error);
      })
      .finally(() => {
        // 2. Escucha los cambios de auth (esto es lo que ya tenías)
        // Se ejecutará después de getRedirectResult y establecerá el usuario
        onAuthStateChanged(auth, (user) => {
          try {
            if (user) {
              set({ 
                user: { 
                  uid: user.uid, 
                  email: user.email, 
                  displayName: user.displayName, 
                  photoURL: user.photoURL 
                }, 
                isLoading: false 
              });
            } else {
              set({ user: null, isLoading: false }); 
            }
          } catch (error) {
             console.error("Error dentro del callback onAuthStateChanged:", error);
             set({ user: null, isLoading: false }); 
          }
        }, (error) => {
            console.error("Error en el observador onAuthStateChanged:", error);
            set({ user: null, isLoading: false }); 
        });
      });
  },

  // --- CAMBIOS EN signInWithGoogle ---
  signInWithGoogle: async () => {
    try {
      // CAMBIO: Usa redirect en lugar de popup
      await signInWithRedirect(auth, googleProvider);
      // La app se recargará, y checkAuthState (arriba) capturará el resultado.
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      set({ isLoading: false }); 
    }
  },

  handleSignOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
       set({ isLoading: false }); 
    }
  },
}));