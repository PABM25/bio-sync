// src/utils/dateUtils.js

export const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const CHALLENGE_START_DATE_KEY = 'challengeStartDate';

export const getTodayName = () => {
  const dayIndex = new Date().getDay();
  return DIAS_SEMANA[dayIndex];
};

export const getChallengeDay = () => {
  let startDateString = null;
  try {
      startDateString = localStorage.getItem(CHALLENGE_START_DATE_KEY);
  } catch (e) {
      // --- CORRECCIÓN 1 ---
      console.warn("localStorage no está disponible. El día del reto no se guardará.", e); 
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  let challengeDay = 1;

  if (startDateString) {
    try {
        const startDate = new Date(startDateString);
        if (!isNaN(startDate.getTime())) {
            startDate.setHours(0, 0, 0, 0); 
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            challengeDay = diffDays;
        } else {
             console.warn("Fecha de inicio guardada inválida. Reiniciando al día 1.");
             startDateString = null; 
        }
    } catch(e) {
        console.error("Error al parsear fecha de inicio:", e);
        startDateString = null; 
    }
  } 
  
  if (!startDateString) {
    try {
        localStorage.setItem(CHALLENGE_START_DATE_KEY, today.toISOString());
    } catch (e) {
        // --- CORRECCIÓN 2 ---
        console.warn("No se pudo guardar la fecha de inicio en localStorage.", e); 
    }
  }

  return ((challengeDay - 1) % 45) + 1;
};

export const resetChallengeDate = () => {
   try {
        localStorage.removeItem(CHALLENGE_START_DATE_KEY);
   } catch (e) {
        // --- CORRECCIÓN 3 ---
        console.warn("No se pudo borrar la fecha de inicio de localStorage.", e); 
   }
};