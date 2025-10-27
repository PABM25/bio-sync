// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfp8GR667Dilvj_DcXEz9Snv1kg5FUNcA",
  authDomain: "bio-sync-47237.firebaseapp.com",
  projectId: "bio-sync-47237",
  storageBucket: "bio-sync-47237.firebasestorage.app",
  messagingSenderId: "629850559608",
  appId: "1:629850559608:web:341d52e01acf3321e0098d",
  measurementId: "G-RHFD8DBZQP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usaremos
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;