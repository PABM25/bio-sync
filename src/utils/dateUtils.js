// src/utils/dateUtils.js

// Mapeo de getDay() a los nombres en los datos del Plan (1).docx
export const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Clave para guardar la fecha de inicio en localStorage
const CHALLENGE_START_DATE_KEY = 'challengeStartDate';

// Función para obtener el nombre del día de la semana actual
export const getTodayName = () => {
  const dayIndex = new Date().getDay();
  return DIAS_SEMANA[dayIndex];
};

// Función para calcular en qué día del reto de 45 días estamos
export const getChallengeDay = () => {
  const startDateString = localStorage.getItem(CHALLENGE_START_DATE_KEY);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche

  let challengeDay = 1;

  if (startDateString) {
    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0); // Normalizar

    // Calcula la diferencia en días
    const diffTime = Math.abs(today - startDate);
    // +1 porque la diferencia de 0 días es el día 1
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    challengeDay = diffDays;
  } else {
    // Si no hay fecha guardada, hoy es el día 1. La guardamos.
    localStorage.setItem(CHALLENGE_START_DATE_KEY, today.toISOString());
  }

  // Asegura que el día esté entre 1 y 45, reiniciando si pasa de 45
  // (challengeDay - 1) % 45 + 1;
  return ((challengeDay - 1) % 45) + 1;
};

// Función para reiniciar el reto borrando la fecha guardada
export const resetChallengeDate = () => {
  localStorage.removeItem(CHALLENGE_START_DATE_KEY);
  // Podrías añadir aquí lógica para borrar otros datos guardados si es necesario
};