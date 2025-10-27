// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Header() {
  const handleSignOut = useAuthStore((state) => state.handleSignOut);
  // --- NUEVO: Obtiene la foto del usuario ---
  const user = useAuthStore((state) => state.user);

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
          {/* --- NUEVO: Enlace al Perfil con Avatar --- */}
          <NavLink to="/perfil" style={{ textDecoration: 'none' }}>
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || user?.email}&background=2C2C2E&color=fff&size=40`}
              alt="Perfil"
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)' }}
            />
          </NavLink>
          <button 
            onClick={handleSignOut} 
            className="btn-reset-challenge"
            style={{ marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

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
        {/* --- NUEVO: Enlace al Perfil (alternativo o para móvil) --- */}
        {/* <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'active' : '')}>
          👤 Perfil
        </NavLink> */}
      </nav>
    </header>
  );
}

export default Header;