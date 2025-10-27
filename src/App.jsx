import React, { useState } from 'react';

// Importa los componentes
import Header from './components/Header';
import ProgresoView from './views/ProgresoView';
import AlimentacionView from './views/AlimentacionView';
import RutinasView from './views/RutinasView';

function App() {
  // Este estado controla qué vista se muestra
  // Opciones: 'progreso', 'alimentacion', 'rutinas'
  const [view, setView] = useState('progreso');

  return (
    <div className="app-container">
      
      {/* El Header recibe el estado y la función para cambiarlo */}
      <Header view={view} setView={setView} />

      {/* El contenido principal cambia según el estado 'view' */}
      <main className="main-content">
        {view === 'progreso' && <ProgresoView />}
        {view === 'alimentacion' && <AlimentacionView />}
        {view === 'rutinas' && <RutinasView />}
      </main>

    </div>
  );
}

export default App;