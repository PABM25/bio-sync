// src/views/AuthView.jsx
import React from 'react';
import { useAuthStore } from '../store/authStore';
import Widget from '../components/Widget'; // Reutilizamos el Widget

function AuthView() {
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto' }}>
      <Widget title="Bienvenido a Bio-Sync">
        <div style={{ padding: '1rem' }}>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-color-dim)' }}>
            Inicia sesión para guardar tu progreso en la nube y acceder desde cualquier dispositivo.
          </p>
          <button 
            className="btn-generate" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              color: '#333'
            }} 
            onClick={signInWithGoogle}
          >
            {/* Puedes añadir un icono de Google aquí */}
            <span style={{fontSize: '1.2rem'}}>G</span> Iniciar Sesión con Google
          </button>
        </div>
      </Widget>
    </div>
  );
}

export default AuthView;