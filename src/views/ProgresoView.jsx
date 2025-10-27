import React from 'react';
import Widget from '../components/Widget';

// Recibimos challengeDay como prop
function ProgresoView({ challengeDay }) {

  // Función para reiniciar el reto
  const handleResetChallenge = () => {
    // Pregunta al usuario para confirmar
    if (window.confirm("¿Estás seguro de que quieres reiniciar el reto? Se borrará tu progreso actual y volverás al Día 1.")) {
      localStorage.removeItem('challengeStartDate'); // Borra la fecha de inicio guardada
      window.location.reload(); // Recarga la página para aplicar el cambio
    }
  };

  return (
    <>
      {/* Grid superior con 3 widgets */}
      <div className="progreso-summary-grid">
        <Widget title="🍎 Comidas Planificadas">
          <div className="stat-number green">0</div>
          {/* Aquí podrías añadir lógica para contar comidas agregadas */}
        </Widget>
        <Widget title="💪 Ejercicios Programados">
          <div className="stat-number orange">0</div>
          {/* Aquí podrías añadir lógica para contar rutinas agregadas */}
        </Widget>
        <Widget title="✅ Actividades Completadas">
          <div className="stat-number blue">0</div>
          {/* Aquí podrías añadir lógica para marcar actividades */}
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

        {/* Botón para reiniciar el reto */}
        <button className="btn-reset-challenge" onClick={handleResetChallenge}>
          Reiniciar Reto
        </button>
      </Widget>
    </>
  );
}

export default ProgresoView;