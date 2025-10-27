// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';

// Función para formatear el tiempo (MM:SS) - movida aquí
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60); // Usar floor por si acaso
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const useTimer = (initialMinutes = 5) => {
  const initialSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            // Podríamos pasar una función onComplete como prop al hook
            // onComplete?.(); 
            alert("¡Tiempo!"); // Placeholder
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Limpieza al desmontar
  }, [isRunning]);

  const startPause = () => {
    // No iniciar si ya está en 0
    if (!isRunning && secondsLeft <= 0) return; 
    setIsRunning(!isRunning);
  };

  const reset = (minutes = initialMinutes) => {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  };

  const setTime = (minutes) => {
     setIsRunning(false); // Detiene si estaba corriendo
     setSecondsLeft(minutes * 60);
  }

  return {
    timeLeftFormatted: formatTime(secondsLeft),
    isRunning,
    startPause,
    reset,
    setTime, // Nueva función para presets
  };
};