// src/App.jsx
import React, { useEffect } from 'react'; // <-- Importa useEffect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes y vistas
import Header from './components/Header';
import ProgresoView from './views/ProgresoView';
import AlimentacionView from './views/AlimentacionView';
import RutinasView from './views/RutinasView';
import AuthView from './views/AuthView'; // <-- Importa la vista de Auth
import BienestarView from './views/BienestarView'; // <-- Importa la vista de Bienestar

// Importa el hook del store de Autenticación
import { useAuthStore } from './store/authStore';

function App() {
  // Obtiene el estado de autenticación
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const checkAuthState = useAuthStore((state) => state.checkAuthState);

  // Comprueba el estado de autenticación al cargar la app
  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Muestra un 'cargando' mientras se verifica la sesión
  if (isLoading) {
    return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Cargando...</h2>;
  }

  return (
    <Router>
      <div className="app-container">
        
        {/* El Header solo se muestra si el usuario está logueado */}
        {user && <Header />}

        <main className="main-content">
          <Routes>
            {/* Si el usuario está logueado */}
            {user ? (
              <>
                <Route path="/progreso" element={<ProgresoView />} />
                <Route path="/alimentacion" element={<AlimentacionView />} />
                <Route path="/rutinas" element={<RutinasView />} />
                <Route path="/bienestar" element={<BienestarView />} /> {/* <-- Nueva Ruta */}
                
                {/* Redirige la raíz a /progreso si está logueado */}
                <Route path="/" element={<Navigate replace to="/progreso" />} />
                
                {/* Si está logueado e intenta ir a /auth, lo mandamos a progreso */}
                <Route path="/auth" element={<Navigate replace to="/progreso" />} />
              </>
            ) : (
              // Si el usuario NO está logueado
              <>
                <Route path="/auth" element={<AuthView />} />
                {/* Cualquier otra ruta lo redirige a /auth */}
                <Route path="*" element={<Navigate replace to="/auth" />} />
              </>
            )}
            
            {/* Página no encontrada genérica (aunque la lógica anterior ya cubre todo) */}
            <Route path="*" element={<h2 style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Página no encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;