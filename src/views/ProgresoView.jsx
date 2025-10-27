import React from 'react';
import Widget from '../components/Widget';

// Basado en la Captura de pantalla 2025-10-26 221924.png
function ProgresoView() {
  return (
    <>
      {/* Grid superior con 3 widgets */}
      <div className="progreso-summary-grid">
        <Widget title="Comidas Planificadas">
          <div className="stat-number">0</div>
        </Widget>
        <Widget title="Ejercicios Programados">
          <div className="stat-number">0</div>
        </Widget>
        <Widget title="Actividades Completadas">
          <div className="stat-number">0</div>
        </Widget>
      </div>

      {/* Widget inferior de actividad */}
      <Widget title="Actividad Reciente">
        <p>Comienza agregando comidas y ejercicios para ver tu progreso aquí.</p>
      </Widget>
    </>
  );
}

export default ProgresoView;