// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Vistas
import Header from './components/Header';
import ProgresoView from './views/ProgresoView';
import AlimentacionView from './views/AlimentacionView';
import RutinasView from './views/RutinasView';
import AuthView from './views/AuthView';
import BienestarView from './views/BienestarView';
import PerfilView from './views/PerfilView'; // <-- 1. Importa la vista de Perfil

// Stores
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore'; // <-- Importa appStore

function App() {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const checkAuthState = useAuthStore((state) => state.checkAuthState);
  
  // --- NUEVO: Estado de carga del store ---
  const isStoreLoading = useAppStore((state) => state.isStoreLoading);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Muestra 'cargando' si la auth O el store de datos están cargando
  if (isAuthLoading || (user && isStoreLoading)) {
    return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Cargando...</h2>;
  }

  return (
    <Router>
      <div className="app-container">
        
        {user && <Header />}

        <main className="main-content">
          <Routes>
            {user ? (
              <>
                <Route path="/progreso" element={<ProgresoView />} />
                <Route path="/alimentacion" element={<AlimentacionView />} />
                <Route path="/rutinas" element={<RutinasView />} />
                <Route path="/bienestar" element={<BienestarView />} />
                <Route path="/perfil" element={<PerfilView />} /> {/* <-- 2. Añade la ruta */}
                
                <Route path="/" element={<Navigate replace to="/progreso" />} />
                <Route path="/auth" element={<Navigate replace to="/progreso" />} />
              </>
            ) : (
              <>
                <Route path="/auth" element={<AuthView />} />
                <Route path="*" element={<Navigate replace to="/auth" />} />
              </>
            )}
            
            <Route path="*" element={<h2 style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Página no encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;