import React from 'react';

// El Header ahora renderiza la barra superior Y la barra de navegación
function Header({ view, setView }) {
  return (
    <header className="app-header-container">
      {/* 1. Barra superior (Logo e Info) */}
      <div className="app-header-top">
        <div className="logo-container">
          {/* Usamos un emoji como placeholder del logo */}
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

      {/* 2. Barra de Navegación (la que se ve como widget) */}
      <nav className="app-nav">
        <a
          href="#"
          className={view === 'alimentacion' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('alimentacion');
          }}
        >
          {/* Usamos emojis para los iconos */}
          🍎 Alimentación Saludable
        </a>
        <a
          href="#"
          className={view === 'rutinas' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('rutinas');
          }}
        >
          💪 Rutinas de Ejercicio
        </a>
        <a
          href="#"
          className={view === 'progreso' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('progreso');
          }}
        >
          📊 Mi Progreso
        </a>
      </nav>
    </header>
  );
}

export default Header;