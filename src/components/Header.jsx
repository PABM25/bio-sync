import React from 'react';

function Header({ view, setView }) {
  return (
    <header className="app-header">
      <div className="logo">Vida Saludable IA</div>
      <nav>
        {/* Usamos <a> tags por simplicidad, pero con onClick para actuar como botones */}
        <a
          href="#"
          className={view === 'alimentacion' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('alimentacion');
          }}
        >
          Alimentación Saludable
        </a>
        <a
          href="#"
          className={view === 'rutinas' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('rutinas');
          }}
        >
          Rutinas de Ejercicio
        </a>
        <a
          href="#"
          className={view === 'progreso' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setView('progreso');
          }}
        >
          Mi Progreso
        </a>
      </nav>
    </header>
  );
}

export default Header;