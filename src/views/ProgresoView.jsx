// src/views/ProgresoView.jsx
import React from 'react';
import Widget from '../components/Widget'; // Ajusta ruta si es necesario
import { useAppStore } from '../store/appStore'; // Importa store

function ProgresoView() {
  // Obtenemos datos y acción del store
  const challengeDay = useAppStore((state) => state.challengeDay);
  const { comidasPlanificadas, ejerciciosProgramados, actividadesCompletadas } = useAppStore((state) => state.progreso);
  const reiniciarRetoCompleto = useAppStore((state) => state.reiniciarRetoCompleto);
  // const clearPlanes = useAppStore((state) => state.clearPlanes); // <--- LÍNEA ELIMINADA

  return (
    <>
      <div className="progreso-summary-grid">
        {/* Muestra los contadores del store */}
        <Widget title="🍎 Comidas Planificadas">
          <div className="stat-number green">{comidasPlanificadas}</div>
        </Widget>
        <Widget title="💪 Ejercicios Programados">
          <div className="stat-number orange">{ejerciciosProgramados}</div>
        </Widget>
        <Widget title="✅ Actividades Completadas">
          <div className="stat-number blue">{actividadesCompletadas}</div>
        </Widget>
      </div>

      <Widget title="📝 Actividad Reciente">
        <p className="widget-placeholder">
          ¡Bienvenido al <strong>Día {challengeDay}</strong> de tu reto!
          <br/>
          Aquí verás un resumen de tus actividades completadas.
        </p>

        {/* Botón para reiniciar */}
        <button className="btn-reset-challenge" onClick={reiniciarRetoCompleto}>
          Reiniciar Reto Completo
        </button>
        {/* El botón que usaba clearPlanes también se puede eliminar si no se necesita */}
        {/* <button style={{marginLeft: '1rem'}} onClick={clearPlanes}>Limpiar Planes</button> */}
      </Widget>
    </>
  );
}

export default ProgresoView;