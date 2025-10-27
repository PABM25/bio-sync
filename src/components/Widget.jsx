import React from 'react';

// Un componente simple y reutilizable para todas las tarjetas del dashboard
function Widget({ title, children, style }) { // <-- Añade 'style'
  return (
    <div className="widget" style={style}> {/* <-- Pasa 'style' al div */}
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

export default Widget;