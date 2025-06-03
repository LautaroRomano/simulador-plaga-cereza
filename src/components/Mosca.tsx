import React from 'react';

const Mosca = ({ colorCuerpo = 'black', colorAlas = 'gray' }) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cuerpo */}
      <ellipse cx="40" cy="40" rx="6" ry="15" fill={colorCuerpo} />

      {/* Cabeza */}
      <circle cx="40" cy="25" r="5" fill={colorCuerpo} />

      {/* Alas */}
      <ellipse cx="30" cy="35" rx="12" ry="6" fill={colorAlas} opacity="0.5" />
      <ellipse cx="50" cy="35" rx="12" ry="6" fill={colorAlas} opacity="0.5" />

    </svg>
  );
};

export default Mosca;
