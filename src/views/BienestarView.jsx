// src/views/BienestarView.jsx
import React from 'react';
import Widget from '../components/Widget';
import { useTimer } from '../hooks/useTimer'; // Reutilizamos el timer

function BienestarView() {
  const { timeLeftFormatted, isRunning, startPause, reset, setTime } = useTimer(1); // Timer de 1 min por defecto

  return (
    <div className="alimentacion-grid"> {/* Reutilizamos este layout de 2 cols */}
      <Widget title="🧘‍♀️ Meditación y Respiración">
        <p style={{ color: 'var(--text-color-dim)', marginBottom: '1rem' }}>
          Tómate un momento para centrarte. Inicia el temporizador y concéntrate solo en tu respiración.
        </p>
        
        <div className="timer-display">{timeLeftFormatted}</div>
        <div className="timer-buttons">
          <button className={`btn-timer ${isRunning ? 'pause' : 'start'}`} onClick={startPause}>
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button className="btn-timer reset" onClick={() => reset(1)}>Reset (1min)</button>
        </div>
        <div className="timer-presets">
          <button className="btn-preset" onClick={() => setTime(1)}>1 min</button>
          <button className="btn-preset" onClick={() => setTime(3)}>3 min</button>
          <button className="btn-preset" onClick={() => setTime(5)}>5 min</button>
        </div>
      </Widget>

      <Widget title="💡 Tips de Mentalidad Saludable">
        <ul className="plan-list" style={{textAlign: 'left', maxHeight: 'none', overflowY: 'visible'}}>
          <li style={{border: 'none', padding: '8px 0'}}>
            <span style={{marginRight: '12px'}}>✅</span>
            <label><strong>Consistencia sobre intensidad:</strong> Es mejor hacer 15 minutos todos los días que 2 horas un día y rendirse.</label>
          </li>
          <li style={{border: 'none', padding: '8px 0'}}>
            <span style={{marginRight: '12px'}}>💧</span>
            <label><strong>Hidratación es clave:</strong> Tu cerebro y músculos necesitan agua. No esperes a tener sed.</label>
          </li>
          <li style={{border: 'none', padding: '8px 0'}}>
            <span style={{marginRight: '12px'}}>😴</span>
            <label><strong>El descanso es parte del entrenamiento:</strong> El músculo crece y la mente se repara mientras duermes.</label>
          </li>
        </ul>
      </Widget>
    </div>
  );
}

export default BienestarView;