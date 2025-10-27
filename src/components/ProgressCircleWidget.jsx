// src/components/ProgressCircleWidget.jsx
import React from 'react';
import Widget from './Widget';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Componente reutilizable para los widgets de progreso
function ProgressCircleWidget({ title, value, maxValue, unit, color }) {
  // Calcula el porcentaje, asegurándote de no dividir por cero
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <Widget title={title}>
      <div className="progress-circle-wrapper">
        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          styles={buildStyles({
            // Estilos del círculo
            pathColor: color,
            textColor: 'var(--text-color-light)',
            trailColor: 'var(--border-color)',
            backgroundColor: '#3e98c7',
          })}
        />
        <div className="progress-circle-unit">{unit}</div>
      </div>
    </Widget>
  );
}

export default ProgressCircleWidget;