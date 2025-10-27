import React, { useState, useEffect, useRef } from 'react'; // Importa hooks
import Widget from '../components/Widget';
import { PLAN_TORO_RUTINAS } from '../data'; // Importamos los datos del reto

// Función para formatear el tiempo (MM:SS)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// La vista ahora recibe 'challengeDay' como prop desde App.jsx
function RutinasView({ challengeDay }) {

  // --- Estados para el Plan Personalizado ---
  const [miRutina, setMiRutina] = useState('');
  const [ejercicioPersonalizado, setEjercicioPersonalizado] = useState('');

  // --- Estados y lógica para el Timer ---
  const [timerSeconds, setTimerSeconds] = useState(5 * 60); // 5 minutos por defecto
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef(null); // Para guardar la referencia al intervalo

  // Efecto para manejar el intervalo del timer
  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
            // Opcional: Sonido o alerta al terminar
            alert("¡Tiempo!");
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current); // Limpia el intervalo si no está corriendo
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta o isTimerRunning cambia
    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning]); // Dependencia: el efecto se re-ejecuta si isTimerRunning cambia

  const handleStartPauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = (minutes = 5) => { // Por defecto resetea a 5 min
    setIsTimerRunning(false);
    setTimerSeconds(minutes * 60);
  };

  // --- Lógica para mostrar Rutinas ---
  const rutinaHoy = PLAN_TORO_RUTINAS.find(r => r.dia === challengeDay) || PLAN_TORO_RUTINAS[0];
  const rutinaManana = PLAN_TORO_RUTINAS.find(r => r.dia === ((challengeDay % 45) + 1)) || PLAN_TORO_RUTINAS[0];
  const rutinaPasado = PLAN_TORO_RUTINAS.find(r => r.dia === (((challengeDay + 1) % 45) + 1)) || PLAN_TORO_RUTINAS[0];

  // --- Funciones para el Plan Personalizado ---
  const agregarRutinaAlPlan = (rutina) => {
    setMiRutina(prev => prev + `\n- Día ${rutina.dia}: ${rutina.titulo}`.trim());
    alert(`Rutina del Día ${rutina.dia} agregada a "Mi Rutina".`);
  };

  const agregarEjercicioPersonalizadoHandler = () => {
    if (ejercicioPersonalizado.trim()) {
      setMiRutina(prev => prev + `\n- ${ejercicioPersonalizado}`.trim());
      setEjercicioPersonalizado('');
    }
  };

  // --- Control de errores básicos ---
   if (!rutinaHoy || !rutinaManana || !rutinaPasado) {
     return <Widget title="Error">⚠️ No se pudieron cargar las rutinas.</Widget>;
   }

  return (
    <div className="rutinas-grid">
      <Widget title="💪 Rutinas Recomendadas (Manual del Toro)">
        <div className="suggestion-list">

          {/* Tarjeta de Rutina de HOY (Dinámica) */}
          <div className="suggestion-card cardio">
            <div className="card-content">
              <strong>¡HOY! Día {rutinaHoy.dia}: {rutinaHoy.titulo}</strong>
              <p>{rutinaHoy.ejercicios}</p>
            </div>
            {/* Botón para agregar al plan personal */}
            <button className="btn-add" onClick={() => agregarRutinaAlPlan(rutinaHoy)}>Agregar</button>
          </div>

          {/* Tarjeta de Rutina de Mañana (Dinámica) */}
          <div className="suggestion-card strength">
            <div className="card-content">
              <strong>Mañana: Día {rutinaManana.dia}: {rutinaManana.titulo}</strong>
              <p>{rutinaManana.ejercicios}</p>
            </div>
            <button className="btn-add" onClick={() => alert(`Detalles Día ${rutinaManana.dia}:\n${rutinaManana.ejercicios}`)}>Ver</button>
          </div>

          {/* Tarjeta de Rutina de Pasado Mañana (Dinámica) */}
          <div className="suggestion-card flex">
            <div className="card-content">
              <strong>Pasado: Día {rutinaPasado.dia}: {rutinaPasado.titulo}</strong>
              <p>{rutinaPasado.ejercicios}</p>
            </div>
            <button className="btn-add" onClick={() => alert(`Detalles Día ${rutinaPasado.dia}:\n${rutinaPasado.ejercicios}`)}>Ver</button>
          </div>
        </div>

        <button className="btn-generate" style={{backgroundColor: 'var(--accent-red)'}} onClick={() => alert('Generar Nuevas Rutinas (Próximamente)')}>
          Generar Nuevas Rutinas
        </button>
      </Widget>

      {/* Widget del Timer con funcionalidad */}
      <Widget title="⏱️ Timer de Entrenamiento">
        <div className="timer-display">{formatTime(timerSeconds)}</div>
        <div className="timer-buttons">
          <button
            className={`btn-timer ${isTimerRunning ? 'pause' : 'start'}`}
            onClick={handleStartPauseTimer}
          >
            {isTimerRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button className="btn-timer reset" onClick={() => handleResetTimer(5)}>Reset (5min)</button>
        </div>
        <div className="timer-presets">
          {/* Botones de preset que resetean el timer a ese valor */}
          <button className="btn-preset" onClick={() => handleResetTimer(5)}>5 min</button>
          <button className="btn-preset" onClick={() => handleResetTimer(10)}>10 min</button>
          <button className="btn-preset" onClick={() => handleResetTimer(15)}>15 min</button>
          <button className="btn-preset" onClick={() => handleResetTimer(20)}>20 min</button>
        </div>
      </Widget>

      {/* Widget de Mi Rutina con interactividad */}
      <Widget title="📝 Mi Rutina de Ejercicios">
        <div className="my-plan-display">
           {miRutina || <p className="widget-placeholder">Agrega rutinas o ejercicios aquí...</p>}
        </div>
        <p style={{marginTop: '1rem', textAlign:'center', color: '#555', fontSize: '0.9rem'}}>
          O crea tu rutina personalizada:
        </p>
        <div className="plan-input-wrapper">
          <textarea
            className="plan-textarea"
            placeholder="Agregar ejercicio personalizado..."
            value={ejercicioPersonalizado}
            onChange={(e) => setEjercicioPersonalizado(e.target.value)}
          ></textarea>
          <button
            className="btn-add-plan"
            style={{backgroundColor: 'var(--accent-orange)'}}
            onClick={agregarEjercicioPersonalizadoHandler}
           >+</button>
        </div>
      </Widget>
    </div>
  );
}

export default RutinasView;