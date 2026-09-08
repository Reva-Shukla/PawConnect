import React from 'react';
import './PawPrintDoodle.css';

/**
 * PawPrintDoodle Component
 * - SVG-based hand-drawn scrapbook style paw print doodle
 * - Used as subtle, pastel background & accent motifs in Pets, Adoption, Shelters, and Community pages
 * - Configurable size, color, opacity, rotation, and positioning
 */
export default function PawPrintDoodle({
  size = 28,
  color = 'currentColor',
  opacity = 0.35,
  rotation = 0,
  className = '',
  style = {}
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`paw-print-doodle ${className}`}
      style={{
        opacity: opacity,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'inline-block',
        ...style
      }}
      aria-hidden="true"
    >
      {/* Main Bottom Paw Pad */}
      <path
        d="M 50,48 C 36,48 26,60 30,76 C 33,88 42,94 50,94 C 58,94 67,88 70,76 C 74,60 64,48 50,48 Z"
        fill={color}
      />
      {/* Toe 1 (Far Left) */}
      <ellipse cx="22" cy="40" rx="8.5" ry="12.5" transform="rotate(-28 22 40)" fill={color} />
      {/* Toe 2 (Center Left) */}
      <ellipse cx="40" cy="24" rx="8.5" ry="13" transform="rotate(-10 40 24)" fill={color} />
      {/* Toe 3 (Center Right) */}
      <ellipse cx="60" cy="24" rx="8.5" ry="13" transform="rotate(10 60 24)" fill={color} />
      {/* Toe 4 (Far Right) */}
      <ellipse cx="78" cy="40" rx="8.5" ry="12.5" transform="rotate(28 78 40)" fill={color} />
    </svg>
  );
}
