import React from 'react';
import Widget from '../components/Widget';

// Recibimos challengeDay como prop
function ProgresoView({ challengeDay }) {
  return (
    <>
      {/* Grid superior con 3 widgets */}
      <div className="progreso-summary-grid">
        <Widget title="🍎 Comidas Planificadas">
          <div className="stat-number green">0</div>
        </Widget>
        <Widget title="💪 Ejercicios Programados">
          <div className="stat-number orange">0</div>
        </Widget>
        <Widget title="✅ Actividades Completadas">
          <div className="stat-number blue">0</div>
        </Widget>
      </div>

      {/* Widget inferior de actividad */}
      <Widget title="📝 Actividad Reciente">
        {/* Mostramos el día actual del reto */}
        <p className="widget-placeholder">
          ¡Bienvenido al <strong>Día {challengeDay}</strong> de tu reto!
          <br/>
          Comienza agregando comidas y ejercicios para ver tu progreso aquí.
        </p>
      </Widget>
    </>
  );
}

export default ProgresoView;