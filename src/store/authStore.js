// src/store/authStore.js
import { create } from 'zustand';
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';

export const useAuthStore = create((set) => ({
  user: null,         // Almacenará el objeto de usuario de Firebase
  isLoading: true,    // Para saber si estamos comprobando el estado de auth

  // Observador que se ejecuta al iniciar la app
  checkAuthState: () => {
    set({ isLoading: true });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario está logueado
        set({ user: { uid: user.uid, email: user.email, displayName: user.displayName }, isLoading: false });
      } else {
        // Usuario no está logueado
        set({ user: null, isLoading: false });
      }
    });
  },

  // Iniciar sesión con Google
  signInWithGoogle: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // El observador (checkAuthState) se encargará de actualizar el estado
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  },

  // Cerrar sesión
  handleSignOut: async () => {
    try {
      await signOut(auth);
      // El observador (checkAuthState) pondrá el usuario a null
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));