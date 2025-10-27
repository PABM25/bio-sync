import React from 'react';
import Widget from '../components/Widget';
import { PLAN_TORO_RUTINAS } from '../data'; // Importamos los datos del reto

// La vista ahora recibe 'challengeDay' como prop desde App.jsx
function RutinasView({ challengeDay }) {

  // Encontrar las rutinas (hoy, mañana, pasado)
  // Restamos 1 porque los arrays empiezan en 0 (Día 1 es índice 0)
  const rutinaHoy = PLAN_TORO_RUTINAS[challengeDay - 1];
  
  // Usamos % 45 para que el día 45 muestre el día 1 como "siguiente"
  const rutinaManana = PLAN_TORO_RUTINAS[challengeDay % 45]; 
  const rutinaPasado = PLAN_TORO_RUTINAS[(challengeDay + 1) % 45];

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
            <button className="btn-add">Empezar</button>
          </div>

          {/* Tarjeta de Rutina de Mañana (Dinámica) */}
          <div className="suggestion-card strength">
            <div className="card-content">
              <strong>Mañana: Día {rutinaManana.dia}: {rutinaManana.titulo}</strong>
              <p>{rutinaManana.ejercicios}</p>
            </div>
            <button className="btn-add">Ver</button>
          </div>

          {/* Tarjeta de Rutina de Pasado Mañana (Dinámica) */}
          <div className="suggestion-card flex">
            <div className="card-content">
              <strong>Pasado: Día {rutinaPasado.dia}: {rutinaPasado.titulo}</strong>
              <p>{rutinaPasado.ejercicios}</p>
            </div>
            <button className="btn-add">Ver</button>
          </div>
        </div>
        
        <button className="btn-generate" style={{backgroundColor: 'var(--accent-red)'}}>
          Generar Nuevas Rutinas
        </button>
      </Widget>

      <Widget title="⏱️ Timer de Entrenamiento">
        <div className="timer-display">05:00</div>
        <div className="timer-buttons">
          <button className="btn-timer start">Iniciar</button>
          <button className="btn-timer reset">Reset</button>
        </div>
        <div className="timer-presets">
          <button className="btn-preset">5 min</button>
          <button className="btn-preset">10 min</button>
          <button className="btn-preset">15 min</button>
          <button className="btn-preset">20 min</button>
        </div>
      </Widget>

      <Widget title="📝 Mi Rutina de Ejercicios">
        <p className="widget-placeholder">
          Agrega ejercicios desde las recomendaciones o crea tu rutina personalizada.
        </p>
        <div className="plan-input-wrapper">
          <textarea className="plan-textarea" placeholder="Agregar ejercicio personalizado..."></textarea>
          <button className="btn-add-plan" style={{backgroundColor: 'var(--accent-orange)'}}>+</button>
        </div>
      </Widget>
    </div>
  );
}

export default RutinasView;