// src/views/ProgresoView.jsx
import React from 'react';
import Widget from '../components/Widget';
import { useAppStore } from '../store/appStore';

function ProgresoView() {
  // Obtenemos datos y acción del store
  const challengeDay = useAppStore((state) => state.challengeDay);
  const { comidasPlanificadas, ejerciciosProgramados, actividadesCompletadas, vasosDeAgua } = useAppStore((state) => state.progreso); // vasosDeAgua ¡NUEVO!
  const reiniciarRetoCompleto = useAppStore((state) => state.reiniciarRetoCompleto);
  const setVasosDeAgua = useAppStore((state) => state.setVasosDeAgua); // ¡NUEVO!

  return (
    <>
      <div className="progreso-summary-grid">
        {/* ¡NUEVO WIDGET DE HIDRATACIÓN! */}
        <Widget title="💧 Hidratación">
          <div className="stat-number blue">{vasosDeAgua}</div>
          <p style={{marginTop: '-0.5rem', marginBottom: '1rem', color: '#555'}}>Vasos (250ml)</p>
          <div className="hydration-buttons">
            <button onClick={() => setVasosDeAgua(vasosDeAgua - 1)}>-</button>
            <button onClick={() => setVasosDeAgua(vasosDeAgua + 1)}>+</button>
          </div>
        </Widget>
        
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
          Marca tus comidas y rutinas como completadas para ver tu progreso.
        </p>
        <button className="btn-reset-challenge" onClick={reiniciarRetoCompleto}>
          Reiniciar Reto Completo
        </button>
      </Widget>
    </>
  );
}

export default ProgresoView;