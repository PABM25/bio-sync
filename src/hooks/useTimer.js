// src/hooks/useTimer.js
import { useState, useEffect, useRef, useCallback } from 'react'; // Import useCallback

// Función para formatear el tiempo (MM:SS)
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// --- Función de sonido ---
const playBeep = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Previene error si el usuario interactúa antes con la página
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); 
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); 

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5); 
  } catch (e) {
    console.error("AudioContext no soportado o error al reproducir:", e);
    // Considera un fallback visual si el audio falla consistentemente
  }
};
// --- Fin función de sonido ---


export const useTimer = (initialMinutes = 5) => {
  const initialSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Limpia el intervalo al desmontar el componente
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playBeep(); 
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    // No necesita limpiar aquí porque ya lo hace el useEffect de desmontaje
  }, [isRunning]); 

  const startPause = useCallback(() => {
    // No iniciar si ya está en 0
    if (!isRunning && secondsLeft <= 0) return; 
    setIsRunning(prev => !prev);
  }, [isRunning, secondsLeft]); // Dependencias: isRunning y secondsLeft

  const reset = useCallback((minutes = initialMinutes) => {
    clearInterval(intervalRef.current); // Asegura parar el intervalo
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  }, [initialMinutes]); // Dependencia: initialMinutes (si cambia)

  const setTime = useCallback((minutes) => {
     clearInterval(intervalRef.current); // Asegura parar el intervalo
     setIsRunning(false);
     setSecondsLeft(minutes * 60);
  }, []); // Sin dependencias, siempre hace lo mismo

  return {
    timeLeftFormatted: formatTime(secondsLeft),
    isRunning,
    startPause,
    reset,
    setTime, // Asegúrate de exportarla
  };
};