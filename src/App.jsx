import React, { useState, useEffect } from 'react';

// Importa los componentes
import Header from './components/Header';
import ProgresoView from './views/ProgresoView';
import AlimentacionView from './views/AlimentacionView';
import RutinasView from './views/RutinasView';

// Mapeo de getDay() a los nombres en los datos del Plan (1).docx
const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Función para calcular en qué día del reto de 45 días estamos
const getChallengeDay = () => {
  const startDateString = localStorage.getItem('challengeStartDate');
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche

  let challengeDay = 1;

  if (startDateString) {
    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0); // Normalizar
    
    // Calcula la diferencia en días
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    challengeDay = diffDays + 1; // El primer día es 1
  } else {
    // Si no hay fecha guardada, hoy es el día 1. La guardamos.
    localStorage.setItem('challengeStartDate', today.toISOString());
  }

  // El reto es de 45 días, así que usamos el módulo % para que reinicie
  // (challengeDay - 1) % 45 + 1;
  // (Día 1-1) % 45 + 1 = 1
  // (Día 45-1) % 45 + 1 = 45
  // (Día 46-1) % 45 + 1 = 1 (reinicia el ciclo)
  return ((challengeDay - 1) % 45) + 1;
};


function App() {
  // Este estado controla qué vista se muestra
  const [view, setView] = useState('progreso');
  
  // Nuevos estados para el día actual
  const [challengeDay, setChallengeDay] = useState(1);
  const [todayName, setTodayName] = useState("Lunes");

  // Este Hook se ejecuta una vez cuando la App carga
  useEffect(() => {
    // 1. Calcular el día del reto (del 1 al 45)
    setChallengeDay(getChallengeDay());
    
    // 2. Obtener el nombre del día de la semana (Lunes, Martes...)
    const dayIndex = new Date().getDay();
    setTodayName(DIAS_SEMANA[dayIndex]);

    // Opcional: Para probar, puedes forzar un día:
    // setChallengeDay(3);
    // setTodayName("Miércoles");

  }, []); // El array vacío [] asegura que solo se ejecute al inicio

  return (
    <div className="app-container">
      
      {/* El Header recibe el estado y la función para cambiarlo */}
      <Header view={view} setView={setView} />

      {/* El contenido principal cambia según el estado 'view' */}
      <main className="main-content">
        
        {/* Pasamos los datos del día a las vistas correspondientes */}
        {view === 'progreso' && <ProgresoView challengeDay={challengeDay} />}
        {view === 'alimentacion' && <AlimentacionView todayName={todayName} />}
        {view === 'rutinas' && <RutinasView challengeDay={challengeDay} />}
      </main>

    </div>
  );
}

export default App;