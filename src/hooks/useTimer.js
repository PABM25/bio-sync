// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';

// Función para formatear el tiempo (MM:SS)
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// --- ¡NUEVO! Función de sonido ---
const playBeep = () => {
  try {
    // Intenta usar la API de Audio moderna
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Tono simple
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // Frecuencia (A5)
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volumen

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5); // Duración de 0.5s
  } catch (e) {
    console.error("AudioContext no soportado.", e);
    console.log("¡Tiempo!"); // Fallback para navegadores antiguos
  }
};
// --- Fin de la función de sonido ---


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
            
            // --- INICIO DE LA MEJORA ---
            playBeep(); // Llama a la función de sonido en lugar del alert
            // --- FIN DE LA MEJORA ---

            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]); // Dependencia sin cambios

  const startPause = () => {
    if (!isRunning && secondsLeft <= 0) return; 
    setIsRunning(!isRunning);
  };

  const reset = (minutes = initialMinutes) => {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  };

  const setTime = (minutes) => {
     setIsRunning(false);
     setSecondsLeft(minutes * 60);
  }

  return {
    timeLeftFormatted: formatTime(secondsLeft),
    isRunning,
    startPause,
    reset,
    setTime,
  };
};