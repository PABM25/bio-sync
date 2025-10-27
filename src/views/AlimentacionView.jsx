import React from 'react';
import Widget from '../components/Widget';
import { PLAN_PILAR_COMIDAS } from '../data'; // Importamos los datos del plan

// La vista ahora recibe 'todayName' como prop desde App.jsx
function AlimentacionView({ todayName }) {
  
  // Encontrar el plan de comidas para el día de hoy
  // Si es un día sin plan (ej. Sábado sin datos), usa Lunes como fallback
  const comidaHoy = PLAN_PILAR_COMIDAS.find(p => p.dia === todayName) || PLAN_PILAR_COMIDAS[0];

  return (
    <div className="alimentacion-grid">
      {/* El título ahora es dinámico */}
      <Widget title={`🍽️ Sugerencias IA (Plan ${comidaHoy.dia})`}>
        <div className="suggestion-list">
          
          {/* Tarjeta de Desayuno (Dinámica) */}
          <div className="suggestion-card breakfast">
            <div className="card-content">
              <strong>Desayuno</strong>
              <p>{comidaHoy.desayuno}</p>
            </div>
            <button className="btn-add">Agregar</button>
          </div>

          {/* Tarjeta de Almuerzo (Dinámica) */}
          <div className="suggestion-card lunch">
            <div className="card-content">
              <strong>Almuerzo</strong>
              <p>{comidaHoy.almuerzo}</p>
            </div>
            <button className="btn-add">Agregar</button>
          </div>

          {/* Tarjeta de Snack (Dinámica) */}
          <div className="suggestion-card dinner">
            <div className="card-content">
              <strong>Snack</strong>
              <p>{comidaHoy.snack}</p>
            </div>
            <button className="btn-add">Agregar</button>
          </div>
          
          {/* Tarjeta de Cena (Dinámica) */}
          <div className="suggestion-card" style={{borderColor: 'var(--accent-purple)', backgroundColor: '#fcf0ff'}}>
            <div className="card-content">
              <strong>Cena</strong>
              <p>{comidaHoy.cena}</p>
            </div>
            <button className="btn-add" style={{backgroundColor: 'var(--accent-purple)'}}>Agregar</button>
          </div>

        </div>
        
        <button className="btn-generate">Generar Nuevas Sugerencias</button>
      </Widget>

      <Widget title="📝 Mi Plan de Alimentación">
        <p className="widget-placeholder">
          Agrega comidas desde las sugerencias de IA o crea tu propio plan personalizado.
        </p>
        <div className="plan-input-wrapper">
          <textarea className="plan-textarea" placeholder="Agregar comida personalizada..."></textarea>
          <button className="btn-add-plan">+</button>
        </div>
      </Widget>
    </div>
  );
}

export default AlimentacionView;