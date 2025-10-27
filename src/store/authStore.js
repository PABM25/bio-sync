// src/store/authStore.js
import { create } from 'zustand';
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  checkAuthState: () => {
    set({ isLoading: true });
    // --- CORRECCIÓN ---
    // Simplemente llamamos a la función sin guardar su resultado
    onAuthStateChanged(auth, (user) => {
    // --- FIN CORRECCIÓN ---
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
  },

  signInWithGoogle: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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