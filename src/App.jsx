// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes y vistas
import Header from './components/Header'; // Asegúrate que la ruta sea correcta
import ProgresoView from './views/ProgresoView';
import AlimentacionView from './views/AlimentacionView';
import RutinasView from './views/RutinasView';

// Importa el hook del store de Zustand (pero ya no necesitamos leer todo aquí)
// import { useAppStore } from './store/appStore'; // <-- Ya no es necesario importar aquí si no se usa

function App() {
  // Ya NO necesitamos obtener challengeDay ni todayName aquí
  // const challengeDay = useAppStore((state) => state.challengeDay); // <--- LÍNEA ELIMINADA
  // const todayName = useAppStore((state) => state.todayName);      // <--- LÍNEA ELIMINADA

  return (
    <Router> {/* Envuelve todo en el Router */}
      <div className="app-container">

        {/* El Header ahora estará presente en todas las rutas */}
        <Header />

        {/* El contenido principal cambia según la ruta */}
        <main className="main-content">
          <Routes> {/* Define las rutas */}
            <Route
              path="/progreso"
              element={<ProgresoView />} // Las vistas obtienen los datos del store internamente
            />
            <Route
              path="/alimentacion"
              element={<AlimentacionView />} // Ya no necesitan props
            />
            <Route
              path="/rutinas"
              element={<RutinasView />} // Ya no necesitan props
            />
            {/* Ruta por defecto: redirige a /progreso */}
            <Route
              path="/"
              element={<Navigate replace to="/progreso" />}
            />
             {/* Opcional: Ruta para página no encontrada */}
            <Route path="*" element={<h2 style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Página no encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;