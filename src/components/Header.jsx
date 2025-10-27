// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Importa NavLink

// Ya no necesita recibir 'view' ni 'setView'
function Header() {
  return (
    <header className="app-header-container">
      {/* 1. Barra superior (Logo e Info) */}
      <div className="app-header-top">
        <div className="logo-container">
          <span className="logo-icon">🥗</span>
          <div className="logo-text">
            <div className="logo-title">Vida Saludable IA</div>
            <div className="logo-subtitle">Tu asistente personal de salud</div>
          </div>
        </div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          IA Activa
        </div>
      </div>

      {/* 2. Barra de Navegación con NavLink */}
      <nav className="app-nav">
        {/* NavLink añade la clase 'active' automáticamente */}
        <NavLink 
          to="/alimentacion" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          🍎 Alimentación Saludable
        </NavLink>
        <NavLink 
          to="/rutinas" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          💪 Rutinas de Ejercicio
        </NavLink>
        <NavLink 
          to="/progreso" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          📊 Mi Progreso
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;