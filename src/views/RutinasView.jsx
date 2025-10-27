// src/views/RutinasView.jsx
import React, { useState } from 'react';
import Widget from '../components/Widget';
import { PLAN_TORO_RUTINAS } from '../data';
import { useAppStore } from '../store/appStore';
import { useTimer } from '../hooks/useTimer';

function RutinasView() {
  // Estado y acciones del store
  const challengeDay = useAppStore((state) => state.challengeDay);
  const miRutinaEjercicios = useAppStore((state) => state.miRutinaEjercicios);
  const addAlPlanRutina = useAppStore((state) => state.addAlPlanRutina);
  const togglePlanItem = useAppStore((state) => state.togglePlanItem); // ¡NUEVO!

  const [ejercicioPersonalizado, setEjercicioPersonalizado] = useState('');
  const { timeLeftFormatted, isRunning, startPause, reset, setTime } = useTimer(5);

  // Lógica para encontrar rutinas
  const rutinaHoy = PLAN_TORO_RUTINAS.find(r => r.dia === challengeDay) || PLAN_TORO_RUTINAS[0];
  const rutinaMananaIndex = challengeDay % PLAN_TORO_RUTINAS.length;
  const rutinaPasadoIndex = (challengeDay + 1) % PLAN_TORO_RUTINAS.length;
  const rutinaManana = PLAN_TORO_RUTINAS[rutinaMananaIndex];
  const rutinaPasado = PLAN_TORO_RUTINAS[rutinaPasadoIndex];

  // Handler para agregar rutina sugerida
  const handleAgregarRutina = (rutina) => {
    const texto = `Día ${rutina.dia}: ${rutina.titulo}`;
    addAlPlanRutina(texto);
    // Ya no se necesita 'incrementarProgreso'
  };

  // Handler para agregar ejercicio personalizado
  const handleAgregarPersonalizado = () => {
    if (ejercicioPersonalizado.trim()) {
      addAlPlanRutina(ejercicioPersonalizado);
      setEjercicioPersonalizado('');
    }
  };
  
   if (!rutinaHoy || !rutinaManana || !rutinaPasado) {
     return <Widget title="Error">⚠️ No se pudieron cargar las rutinas.</Widget>;
   }

  return (
    <div className="rutinas-grid">
      <Widget title="💪 Rutinas Recomendadas (Manual del Toro)">
        <div className="suggestion-list">
          {/* Hoy */}
          <div className="suggestion-card cardio">
            <div className="card-content">
              <strong>¡HOY! Día {rutinaHoy.dia}: {rutinaHoy.titulo}</strong>
              <p>{rutinaHoy.ejercicios}</p>
            </div>
            <button className="btn-add" onClick={() => handleAgregarRutina(rutinaHoy)}>Agregar</button>
          </div>
          {/* Mañana */}
          <div className="suggestion-card strength">
            <div className="card-content">
              <strong>Mañana: Día {rutinaManana.dia}: {rutinaManana.titulo}</strong>
              <p>{rutinaManana.ejercicios}</p>
            </div>
            <button className="btn-add" onClick={() => console.log(`Detalles Día ${rutinaManana.dia}:\n${rutinaManana.ejercicios}`)}>Ver</button>
          </div>
          {/* Pasado */}
          <div className="suggestion-card flex">
            <div className="card-content">
              <strong>Pasado: Día {rutinaPasado.dia}: {rutinaPasado.titulo}</strong>
              <p>{rutinaPasado.ejercicios}</p>
            </div>
            <button className="btn-add" onClick={() => console.log(`Detalles Día ${rutinaPasado.dia}:\n${rutinaPasado.ejercicios}`)}>Ver</button>
          </div>
        </div>
        <button className="btn-generate" style={{backgroundColor: 'var(--accent-red)'}} onClick={() => console.log('Generar Nuevas Rutinas (Próximamente)')}>
          Generar Nuevas Rutinas
        </button>
      </Widget>

      <Widget title="⏱️ Timer de Entrenamiento">
        <div className="timer-display">{timeLeftFormatted}</div>
        <div className="timer-buttons">
          <button className={`btn-timer ${isRunning ? 'pause' : 'start'}`} onClick={startPause}>
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button className="btn-timer reset" onClick={() => reset(5)}>Reset (5min)</button>
        </div>
        <div className="timer-presets">
          <button className="btn-preset" onClick={() => setTime(5)}>5 min</button>
          <button className="btn-preset" onClick={() => setTime(10)}>10 min</button>
          <button className="btn-preset" onClick={() => setTime(15)}>15 min</button>
          <button className="btn-preset" onClick={() => setTime(20)}>20 min</button>
        </div>
      </Widget>

      <Widget title="📝 Mi Rutina de Ejercicios">
        {/* --- INICIO DE LA MEJORA --- */}
        <div className="my-plan-display">
           {miRutinaEjercicios.length === 0 ? (
             <p className="widget-placeholder">Agrega rutinas o ejercicios aquí...</p>
           ) : (
            <ul className="plan-list">
              {miRutinaEjercicios.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    id={`rutina-${item.id}`}
                    checked={item.completed}
                    onChange={() => togglePlanItem('ejercicio', item.id)}
                  />
                  <label htmlFor={`rutina-${item.id}`} className={item.completed ? 'completed' : ''}>
                    {item.text}
                  </label>
                </li>
              ))}
            </ul>
           )}
        </div>
        {/* --- FIN DE LA MEJORA --- */}

        <p style={{marginTop: '1rem', textAlign:'center', color: '#555', fontSize: '0.9rem'}}>O crea tu rutina personalizada:</p>
        <div className="plan-input-wrapper">
          <textarea
            className="plan-textarea"
            placeholder="Agregar ejercicio personalizado..."
            value={ejercicioPersonalizado}
            onChange={(e) => setEjercicioPersonalizado(e.target.value)}
          ></textarea>
          <button className="btn-add-plan" style={{backgroundColor: 'var(--accent-orange)'}} onClick={handleAgregarPersonalizado}>+</button>
        </div>
      </Widget>
    </div>
  );
}

export default RutinasView;