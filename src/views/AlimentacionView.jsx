import React from 'react';
import Widget from '../components/Widget';

// Basado en la Captura de pantalla 2025-10-26 221914.jpg
// y datos del Plan (1).docx
function AlimentacionView() {
  return (
    <div className="alimentacion-grid">
      <Widget title="Sugerencias IA (Plan de Pilar)">
        <ul>
          <li>
            <strong>Desayuno:</strong> 40g avena + 150ml leche + ½ plátano + 1 huevo.
          </li>
          <li>
            <strong>Almuerzo:</strong> 120g pollo + 100g arroz integral cocido + Ensalada verde.
          </li>
          <li>
            <strong>Snack:</strong> 1 yogur griego (120g) + 1 fruta.
          </li>
          <li>
            <strong>Cena:</strong> 100g pescado blanco + 200g verduras salteadas.
          </li>
        </ul>
      </Widget>

      <Widget title="Mi Plan de Alimentación">
        <p>Agrega comidas desde las sugerencias de IA o crea tu propio plan personalizado.</p>
        {/* Aquí iría un <textarea> y un botón en una app real */}
      </Widget>
    </div>
  );
}

export default AlimentacionView;