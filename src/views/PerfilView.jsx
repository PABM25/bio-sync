// src/views/PerfilView.jsx
import React from 'react';
import Widget from '../components/Widget';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import HistoryChart from '../components/HistoryChart';

function PerfilView() {
  const user = useAuthStore((state) => state.user);
  const historicalTasks = useAppStore((state) => state.historicalData.completedTasks);

  const totalTasksCompleted = historicalTasks.length;
  
  // Contar por tipo
  const foodTasks = historicalTasks.filter(t => t.type === 'comida').length;
  const exerciseTasks = historicalTasks.filter(t => t.type === 'ejercicio').length;

  if (!user) {
    return <Widget title="Error">No se pudo cargar el perfil.</Widget>;
  }

  return (
    <div className="alimentacion-grid"> {/* Reutilizamos layout de 2 cols */}
      <Widget title="👤 Mi Perfil">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=0A84FF&color=fff&size=128`} 
            alt="Avatar"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h2 style={{ margin: 0, color: 'var(--text-color-light)' }}>{user.displayName}</h2>
          <p style={{ margin: 0, color: 'var(--text-color-dim)' }}>{user.email}</p>
        </div>
      </Widget>

      <Widget title="📊 Estadísticas Totales">
        <div className="progreso-summary-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 0 }}>
          {/* Total */}
          <div className="widget" style={{ backgroundColor: 'var(--bg-color-dark)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-cyan)', margin: 0 }}>{totalTasksCompleted}</h3>
            <p style={{ color: 'var(--text-color-dim)', marginTop: '0.5rem' }}>Tareas Totales</p>
          </div>
          {/* Comidas */}
          <div className="widget" style={{ backgroundColor: 'var(--bg-color-dark)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-orange)', margin: 0 }}>{foodTasks}</h3>
            <p style={{ color: 'var(--text-color-dim)', marginTop: '0.5rem' }}>Comidas</p>
          </div>
          {/* Ejercicios */}
          <div className="widget" style={{ backgroundColor: 'var(--bg-color-dark)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-purple)', margin: 0 }}>{exerciseTasks}</h3>
            <p style={{ color: 'var(--text-color-dim)', marginTop: '0.5rem' }}>Ejercicios</p>
          </div>
        </div>
      </Widget>

      {/* El widget del gráfico ocupará todo el ancho */}
      <Widget title="📈 Historial de Actividad" style={{ gridColumn: '1 / -1' }}>
        <HistoryChart historicalTasks={historicalTasks} />
      </Widget>
    </div>
  );
}

export default PerfilView;