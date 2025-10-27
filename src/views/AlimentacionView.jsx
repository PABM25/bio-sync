// src/views/AlimentacionView.jsx
import React, { useState } from 'react';
import Widget from '../components/Widget'; // Ajusta la ruta si moviste Widget
import { PLAN_PILAR_COMIDAS } from '../data';
import { useAppStore } from '../store/appStore'; // Importa el hook del store

function AlimentacionView() {
  // Obtenemos estado y acciones del store
  const todayName = useAppStore((state) => state.todayName);
  const miPlanAlimentacion = useAppStore((state) => state.miPlanAlimentacion);
  const addAlPlanAlimentacion = useAppStore((state) => state.addAlPlanAlimentacion);
  const incrementarProgreso = useAppStore((state) => state.incrementarProgreso);

  // Estado local solo para el input de comida personalizada
  const [comidaPersonalizada, setComidaPersonalizada] = useState('');

  // Busca la comida de hoy
  const comidaHoy = PLAN_PILAR_COMIDAS.find(p => p.dia === todayName) || PLAN_PILAR_COMIDAS[0];

  // Handler para agregar sugerencia
  const handleAgregarSugerencia = (tipoComida, comidaTexto) => {
    addAlPlanAlimentacion(`${tipoComida}: ${comidaTexto}`);
    incrementarProgreso('comida'); // Incrementa contador de comidas planificadas
     console.log(`"${tipoComida}" agregada al plan.`); // Feedback simple
  };

  // Handler para agregar comida personalizada
  const handleAgregarPersonalizada = () => {
    if (comidaPersonalizada.trim()) {
      addAlPlanAlimentacion(comidaPersonalizada);
      incrementarProgreso('comida');
      setComidaPersonalizada(''); // Limpia input
      console.log(`Comida personalizada agregada.`);
    }
  };
  
   // Control de errores básicos
   if (!comidaHoy) {
     return <Widget title="Error">⚠️ No se pudo cargar el plan de alimentación.</Widget>;
   }

  return (
    <div className="alimentacion-grid">
      <Widget title={`🍽️ Sugerencias IA (Plan ${comidaHoy.dia})`}>
        <div className="suggestion-list">
          {/* Desayuno */}
          <div className="suggestion-card breakfast">
            <div className="card-content">
              <strong>Desayuno</strong>
              <p>{comidaHoy.desayuno}</p>
            </div>
            <button className="btn-add" onClick={() => handleAgregarSugerencia('Desayuno', comidaHoy.desayuno)}>Agregar</button>
          </div>
          {/* Almuerzo */}
          <div className="suggestion-card lunch">
            <div className="card-content">
              <strong>Almuerzo</strong>
              <p>{comidaHoy.almuerzo}</p>
            </div>
            <button className="btn-add" onClick={() => handleAgregarSugerencia('Almuerzo', comidaHoy.almuerzo)}>Agregar</button>
          </div>
          {/* Snack */}
          <div className="suggestion-card dinner">
            <div className="card-content">
              <strong>Snack</strong>
              <p>{comidaHoy.snack}</p>
            </div>
            <button className="btn-add" onClick={() => handleAgregarSugerencia('Snack', comidaHoy.snack)}>Agregar</button>
          </div>
          {/* Cena */}
          <div className="suggestion-card" style={{borderColor: 'var(--accent-purple)', backgroundColor: '#fcf0ff'}}>
            <div className="card-content">
              <strong>Cena</strong>
              <p>{comidaHoy.cena}</p>
            </div>
            <button className="btn-add" style={{backgroundColor: 'var(--accent-purple)'}} onClick={() => handleAgregarSugerencia('Cena', comidaHoy.cena)}>Agregar</button>
          </div>
        </div>
        <button className="btn-generate" onClick={() => console.log('Generar Nuevas Sugerencias (Próximamente)')}>Generar Nuevas Sugerencias</button>
      </Widget>

      <Widget title="📝 Mi Plan de Alimentación">
        <div className="my-plan-display">
          {/* Muestra el plan desde el store */}
          {miPlanAlimentacion || <p className="widget-placeholder">Agrega comidas aquí...</p>}
        </div>
        <p style={{marginTop: '1rem', textAlign:'center', color: '#555', fontSize: '0.9rem'}}>O crea tu propio plan personalizado:</p>
        <div className="plan-input-wrapper">
          <textarea
            className="plan-textarea"
            placeholder="Escribe tu comida personalizada aquí..."
            value={comidaPersonalizada}
            onChange={(e) => setComidaPersonalizada(e.target.value)}
          ></textarea>
          <button className="btn-add-plan" onClick={handleAgregarPersonalizada}>+</button>
        </div>
      </Widget>
    </div>
  );
}

export default AlimentacionView;