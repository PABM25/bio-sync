import React from 'react';

// Un componente simple y reutilizable para todas las tarjetas del dashboard
function Widget({ title, children }) {
  return (
    <div className="widget">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

export default Widget;