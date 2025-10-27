// src/views/ProgresoView.jsx
import React from 'react';
import Widget from '../components/Widget';
import { useAppStore } from '../store/appStore';
import ProgressCircleWidget from '../components/ProgressCircleWidget'; // <-- 1. Importa el nuevo componente

function ProgresoView() {
  const challengeDay = useAppStore((state) => state.challengeDay);
  const { comidasPlanificadas, ejerciciosProgramados, actividadesCompletadas, vasosDeAgua } = useAppStore((state) => state.progreso);
  const reiniciarRetoCompleto = useAppStore((state) => state.reiniciarRetoCompleto);
  const setVasosDeAgua = useAppStore((state) => state.setVasosDeAgua);

  // Define metas (puedes mover esto al store más tarde)
  const metaAgua = 8;
  const metaActividades = comidasPlanificadas + ejerciciosProgramados;

  return (
    <>
      {/* --- INICIO DE LA MEJORA --- */}
      <div className="progreso-summary-grid">
        {/* Widget de Hidratación (con el estilo nuevo) */}
        <ProgressCircleWidget 
          title="💧 Hidratación"
          value={vasosDeAgua}
          maxValue={metaAgua}
          unit="Vasos"
          color="var(--accent-blue)"
        />

        {/* Widget de Actividades Completadas */}
        <ProgressCircleWidget 
          title="✅ Tareas Completadas"
          value={actividadesCompletadas}
          maxValue={metaActividades}
          unit="Tareas"
          color="var(--accent-green)"
        />

        {/* Widget de Comidas (como en la imagen) */}
        <ProgressCircleWidget 
          title="🍎 Comidas"
          value={comidasPlanificadas}
          maxValue={comidasPlanificadas > 0 ? comidasPlanificadas : 1} // Meta simple
          unit="Planificadas"
          color="var(--accent-orange)"
        />

        {/* Widget de Ejercicios (como en la imagen) */}
        <ProgressCircleWidget 
          title="💪 Ejercicios"
          value={ejerciciosProgramados}
          maxValue={ejerciciosProgramados > 0 ? ejerciciosProgramados : 1} // Meta simple
          unit="Programados"
          color="var(--accent-purple)"
        />
      </div>
      {/* --- FIN DE LA MEJORA --- */}


      {/* Widget de Control (Agua y Reinicio) */}
      <Widget title="⚙️ Control del Reto">
        <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-color-dim)' }}>
          ¡Bienvenido al <strong>Día {challengeDay}</strong> de tu reto!
        </p>

        {/* Mantenemos los botones de agua aquí */}
        <h3 style={{textAlign: 'center', fontSize: '1rem', fontWeight: '500'}}>Añadir Vaso de Agua:</h3>
        <div className="hydration-buttons">
          <button onClick={() => setVasosDeAgua(vasosDeAgua - 1)}>-</button>
          <button onClick={() => setVasosDeAgua(vasosDeAgua + 1)}>+</button>
        </div>

        <button className="btn-reset-challenge" onClick={reiniciarRetoCompleto} style={{marginTop: '2rem'}}>
          Reiniciar Reto Completo
        </button>
      </Widget>
    </>
  );
}

export default ProgresoView;