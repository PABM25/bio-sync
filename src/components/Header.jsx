// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // <-- Importa authStore

function Header() {
  const handleSignOut = useAuthStore((state) => state.handleSignOut); // <-- Obtiene la acción

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
        
        {/* Botón de Cerrar Sesión */}
        <button 
          onClick={handleSignOut} 
          className="btn-reset-challenge" // Reutilizamos el estilo del botón
          style={{ marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          Cerrar Sesión
        </button>
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
        {/* --- NUEVO ENLACE --- */}
        <NavLink to="/bienestar" className={({ isActive }) => (isActive ? 'active' : '')}>
          🧘‍♀️ Bienestar
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;