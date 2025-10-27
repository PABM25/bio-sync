// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Header() {
  const handleSignOut = useAuthStore((state) => state.handleSignOut);
  const user = useAuthStore((state) => state.user);

  // Genera URL de avatar por defecto si no hay photoURL
  const avatarUrl = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}&background=2C2C2E&color=fff&size=40`;

  return (
    <header className="app-header-container">
      <div className="app-header-top">
        <div className="logo-container">
          <span className="logo-icon">🥗</span>
          <div className="logo-text">
            <div className="logo-title">Vida Saludable IA</div>
            <div className="logo-subtitle">Tu asistente personal de salud</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Enlace al Perfil con Avatar */}
          <NavLink to="/perfil" style={{ textDecoration: 'none' }}>
            <img 
              src={avatarUrl}
              alt="Perfil"
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)' }}
            />
          </NavLink>
          {/* Botón Cerrar Sesión */}
          <button 
            onClick={handleSignOut} 
            className="btn-reset-challenge" // Reutiliza estilo
            style={{ marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: 'var(--widget-bg)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)' }} // Estilo alternativo
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Barra de Navegación */}
      <nav className="app-nav">
        <NavLink to="/progreso" className={({ isActive }) => (isActive ? 'active' : '')}>
          📊 Mi Progreso
        </NavLink>
        <NavLink to="/alimentacion" className={({ isActive }) => (isActive ? 'active' : '')}>
          🍎 Alimentación
        </NavLink>
        <NavLink to="/rutinas" className={({ isActive }) => (isActive ? 'active' : '')}>
          💪 Rutinas
        </NavLink>
        <NavLink to="/bienestar" className={({ isActive }) => (isActive ? 'active' : '')}>
          🧘‍♀️ Bienestar
        </NavLink>
        {/* Enlace de Perfil en la nav (opcional, bueno para móvil si el avatar es pequeño) */}
        {/* <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'active' : '')}>
          👤 Perfil
        </NavLink> */}
      </nav>
    </header>
  );
}

export default Header;