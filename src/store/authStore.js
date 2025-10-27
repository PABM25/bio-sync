// src/store/authStore.js
import { create } from 'zustand';
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  checkAuthState: () => {
    set({ isLoading: true });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // --- INICIO DE LA MEJORA ---
        // Guardamos más datos del usuario para el perfil
        set({ 
          user: { 
            uid: user.uid, 
            email: user.email, 
            displayName: user.displayName, 
            photoURL: user.photoURL // Guardamos la foto
          }, 
          isLoading: false 
        });
        // --- FIN DE LA MEJORA ---
      } else {
        set({ user: null, isLoading: false });
      }
    });
  },

  signInWithGoogle: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  },

  handleSignOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));