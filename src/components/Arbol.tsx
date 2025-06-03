import React, { useEffect, useState } from "react";

const Arbol = ({ colorHojas = "#4CAF50", colorFruta = "red" }) => {
  const [position, setPosition] = useState<{ x: number; y: number }[]>([]);

  const randomPositions = () => {
    const x = -10 + Math.random() * 10;
    const y = -10 + Math.random() * 10;
    return { x, y };
  };

  useEffect(() => {
    const newPositions = Array.from({ length: 6 }, () => randomPositions());
    setPosition(newPositions);
  }, []);

  return (
    <svg
      width="150"
      height="200"
      viewBox="0 0 150 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tronco */}
      <rect x="70" y="100" width="10" height="80" fill="#8B4513" />

      {/* Copa del árbol */}
      <ellipse cx="75" cy="80" rx="45" ry="35" fill={colorHojas} />
      <ellipse cx="50" cy="90" rx="35" ry="30" fill={colorHojas} />
      <ellipse cx="100" cy="90" rx="35" ry="30" fill={colorHojas} />
      <ellipse cx="75" cy="60" rx="30" ry="25" fill={colorHojas} />

      {/* Frutas - Cerezos */}
      {position.length > 0 && (
        <>
          <circle
            cx={60 + position[0].x}
            cy={70 + position[0].y}
            r="4"
            fill={colorFruta}
          />
          <circle
            cx={90 + position[1].x}
            cy={65 + position[1].y}
            r="4"
            fill={colorFruta}
          />
          <circle
            cx={70 + position[2].x}
            cy={85 + position[2].y}
            r="4"
            fill={colorFruta}
          />
          <circle
            cx={80 + position[3].x}
            cy={95 + position[3].y}
            r="4"
            fill={colorFruta}
          />
          <circle
            cx={45 + position[4].x}
            cy={105 + position[4].y}
            r="4"
            fill={colorFruta}
          />
          <circle
            cx={120 + position[5].x}
            cy={110 + position[5].y}
            r="4"
            fill={colorFruta}
          />
        </>
      )}
    </svg>
  );
};

export default Arbol;
