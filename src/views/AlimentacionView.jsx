import React, { useState } from 'react'; // Importa useState
import Widget from '../components/Widget';
import { PLAN_PILAR_COMIDAS } from '../data'; // Importamos los datos del plan

// La vista ahora recibe 'todayName' como prop desde App.jsx
function AlimentacionView({ todayName }) {

  // Encontrar el plan de comidas para el día de hoy
  const comidaHoy = PLAN_PILAR_COMIDAS.find(p => p.dia === todayName) || PLAN_PILAR_COMIDAS[0];

  // Estado para el plan personalizado guardado
  const [miPlan, setMiPlan] = useState('');
  // Estado para el input de comida personalizada
  const [comidaPersonalizada, setComidaPersonalizada] = useState('');

  // Función para agregar una sugerencia al plan
  const agregarAlPlan = (tipoComida, comidaTexto) => {
    // Añade la comida con su tipo al estado miPlan
    setMiPlan(prevPlan => prevPlan + `\n- ${tipoComida}: ${comidaTexto}`.trim());
  };

  // Función para agregar comida personalizada desde el textarea
  const agregarComidaPersonalizadaHandler = () => {
    if (comidaPersonalizada.trim()) {
      setMiPlan(prevPlan => prevPlan + `\n- ${comidaPersonalizada}`.trim());
      setComidaPersonalizada(''); // Limpia el input después de agregar
    }
  };

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
            {/* Botón con onClick */}
            <button className="btn-add" onClick={() => agregarAlPlan('Desayuno', comidaHoy.desayuno)}>Agregar</button>
          </div>

          {/* Tarjeta de Almuerzo (Dinámica) */}
          <div className="suggestion-card lunch">
            <div className="card-content">
              <strong>Almuerzo</strong>
              <p>{comidaHoy.almuerzo}</p>
            </div>
            {/* Botón con onClick */}
            <button className="btn-add" onClick={() => agregarAlPlan('Almuerzo', comidaHoy.almuerzo)}>Agregar</button>
          </div>

          {/* Tarjeta de Snack (Dinámica) */}
          <div className="suggestion-card dinner">
            <div className="card-content">
              <strong>Snack</strong>
              <p>{comidaHoy.snack}</p>
            </div>
            {/* Botón con onClick */}
            <button className="btn-add" onClick={() => agregarAlPlan('Snack', comidaHoy.snack)}>Agregar</button>
          </div>

          {/* Tarjeta de Cena (Dinámica) */}
          <div className="suggestion-card" style={{borderColor: 'var(--accent-purple)', backgroundColor: '#fcf0ff'}}>
            <div className="card-content">
              <strong>Cena</strong>
              <p>{comidaHoy.cena}</p>
            </div>
            {/* Botón con onClick */}
            <button
              className="btn-add"
              style={{backgroundColor: 'var(--accent-purple)'}}
              onClick={() => agregarAlPlan('Cena', comidaHoy.cena)}
            >
              Agregar
            </button>
          </div>

        </div>

        {/* Botón Generar con alerta placeholder */}
        <button className="btn-generate" onClick={() => alert('Generar Nuevas Sugerencias (Próximamente)')}>
          Generar Nuevas Sugerencias
        </button>
      </Widget>

      <Widget title="📝 Mi Plan de Alimentación">
         {/* Muestra el plan guardado */}
        <div className="my-plan-display">
          {miPlan || <p className="widget-placeholder">Agrega comidas aquí...</p>}
        </div>

        <p style={{marginTop: '1rem', textAlign:'center', color: '#555', fontSize: '0.9rem'}}>
          O crea tu propio plan personalizado:
        </p>
        <div className="plan-input-wrapper">
          {/* Textarea controlado */}
          <textarea
            className="plan-textarea"
            placeholder="Escribe tu comida personalizada aquí..."
            value={comidaPersonalizada}
            onChange={(e) => setComidaPersonalizada(e.target.value)}
          ></textarea>
          {/* Botón para agregar la comida personalizada */}
          <button className="btn-add-plan" onClick={agregarComidaPersonalizadaHandler}>+</button>
        </div>
      </Widget>
    </div>
  );
}

export default AlimentacionView;