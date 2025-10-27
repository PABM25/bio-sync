import React from 'react';
import Widget from '../components/Widget';

// Basado en la Captura de pantalla 2025-10-26 221919.jpg
// y datos de PDF-CHUY-ALMADA-RETO-45-DIAS-FULL_.pdf
function RutinasView() {
  return (
    <div className="rutinas-grid">
      <Widget title="Rutinas Recomendadas (Manual del Toro)">
        <ul>
          <li>
            <strong>Día 1:</strong> Cardio y Pierna (Jumping Jacks, Sentadillas, Desplantes).
          </li>
          <li>
            <strong>Día 2:</strong> Abdomen y Core (Crunches, Plancha, Abdominales en bicicleta).
          </li>
          <li>
            <strong>Día 3:</strong> Cardio y Golpes (Rodillas a la cintura, Golpes al aire, Burpees).
          </li>
          <li>
            <strong>Día 4:</strong> Fuerza de Piernas y Abdomen (Sentadillas, Elevación de piernas).
          </li>
        </ul>
      </Widget>

      <Widget title="Timer de Entrenamiento">
        <div className="timer-display">05:00</div>
        {/* Aquí irían los botones de Iniciar/Reset en una app real */}
      </Widget>

      <Widget title="Mi Rutina de Ejercicios">
        <p>Agrega ejercicios desde las recomendaciones o crea tu rutina personalizada.</p>
      </Widget>
    </div>
  );
}

export default RutinasView;