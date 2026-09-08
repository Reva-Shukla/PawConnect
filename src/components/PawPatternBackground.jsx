import React from 'react';
import PawPrintDoodle from './PawPrintDoodle';
import './PawPatternBackground.css';

/**
 * PawPatternBackground Component
 * - Wraps pages or sections with scattered pastel paw-print doodles
 * - Supports 4 intensity levels:
 *   - 'pets': Sparse, tiny paw accents around edges (lowest)
 *   - 'adoption': Extremely subtle watermark paws around margins
 *   - 'shelter': Scattered small & medium paws in background
 *   - 'community': Strongest hand-drawn scrapbook background (highest)
 * - Ensures zero pointer interaction interference and zero horizontal overflow
 */

const PAW_PRESETS = {
  pets: [
    { top: '3%', left: '2%', size: 20, rotation: -12, color: '#93C5FD', opacity: 0.16 },
    { top: '4%', right: '3%', size: 22, rotation: 18, color: '#C4B5FD', opacity: 0.15 },
    { top: '45%', left: '1%', size: 18, rotation: -22, color: '#60A5FA', opacity: 0.14 },
    { top: '50%', right: '2%', size: 24, rotation: 15, color: '#93C5FD', opacity: 0.15 },
    { bottom: '5%', left: '3%', size: 22, rotation: 10, color: '#C4B5FD', opacity: 0.14 },
    { bottom: '4%', right: '2%', size: 20, rotation: -18, color: '#60A5FA', opacity: 0.16 },
  ],
  adoption: [
    { top: '4%', left: '4%', size: 24, rotation: -15, color: '#93C5FD', opacity: 0.11 },
    { top: '6%', right: '5%', size: 28, rotation: 20, color: '#C4B5FD', opacity: 0.10 },
    { top: '52%', left: '2%', size: 20, rotation: -10, color: '#60A5FA', opacity: 0.09 },
    { bottom: '8%', right: '4%', size: 26, rotation: 14, color: '#93C5FD', opacity: 0.10 },
    { bottom: '6%', left: '5%', size: 22, rotation: -18, color: '#C4B5FD', opacity: 0.11 },
  ],
  shelter: [
    { top: '2%', left: '3%', size: 26, rotation: -15, color: '#3B82F6', opacity: 0.22 },
    { top: '3%', right: '4%', size: 30, rotation: 22, color: '#8B5CF6', opacity: 0.20 },
    { top: '22%', left: '1.5%', size: 22, rotation: 10, color: '#93C5FD', opacity: 0.24 },
    { top: '28%', right: '2%', size: 28, rotation: -20, color: '#8B5CF6', opacity: 0.21 },
    { top: '55%', left: '3%', size: 24, rotation: 14, color: '#3B82F6', opacity: 0.23 },
    { top: '60%', right: '2.5%', size: 32, rotation: -12, color: '#93C5FD', opacity: 0.20 },
    { bottom: '15%', left: '2%', size: 28, rotation: -18, color: '#8B5CF6', opacity: 0.22 },
    { bottom: '18%', right: '3%', size: 20, rotation: 16, color: '#3B82F6', opacity: 0.24 },
    { bottom: '3%', left: '4%', size: 26, rotation: 8, color: '#93C5FD', opacity: 0.21 },
    { bottom: '2%', right: '4%', size: 24, rotation: -22, color: '#8B5CF6', opacity: 0.23 },
  ],
  community: [
    { top: '1.5%', left: '2%', size: 32, rotation: -16, color: '#60A5FA', opacity: 0.36 },
    { top: '2%', right: '2.5%', size: 36, rotation: 22, color: '#8B5CF6', opacity: 0.38 },
    { top: '12%', left: '4%', size: 22, rotation: 8, color: '#F472B6', opacity: 0.28 },
    { top: '15%', right: '4.5%', size: 26, rotation: -14, color: '#60A5FA', opacity: 0.34 },
    { top: '30%', left: '1.5%', size: 38, rotation: 24, color: '#8B5CF6', opacity: 0.35 },
    { top: '34%', right: '2%', size: 24, rotation: -18, color: '#F472B6', opacity: 0.26 },
    { top: '48%', left: '3.5%', size: 28, rotation: -10, color: '#60A5FA', opacity: 0.34 },
    { top: '52%', right: '3%', size: 40, rotation: 16, color: '#8B5CF6', opacity: 0.36 },
    { top: '68%', left: '2%', size: 24, rotation: 12, color: '#F472B6', opacity: 0.28 },
    { top: '72%', right: '2.5%', size: 34, rotation: -22, color: '#60A5FA', opacity: 0.35 },
    { bottom: '12%', left: '4%', size: 30, rotation: -15, color: '#8B5CF6', opacity: 0.37 },
    { bottom: '14%', right: '3.5%', size: 22, rotation: 20, color: '#F472B6', opacity: 0.30 },
    { bottom: '2%', left: '2.5%', size: 36, rotation: 18, color: '#60A5FA', opacity: 0.36 },
    { bottom: '2.5%', right: '2%', size: 28, rotation: -12, color: '#8B5CF6', opacity: 0.38 },
  ]
};

export default function PawPatternBackground({
  intensity = 'pets',
  children,
  className = '',
  style = {}
}) {
  const pawList = PAW_PRESETS[intensity] || PAW_PRESETS.pets;

  return (
    <div className={`paw-pattern-wrapper paw-pattern--${intensity} ${className}`} style={style}>
      {/* Background Scattered Paw Doodles Layer */}
      <div className="paw-pattern-layer" aria-hidden="true">
        {pawList.map((paw, idx) => (
          <div
            key={idx}
            className="paw-pattern-item"
            style={{
              position: 'absolute',
              top: paw.top,
              bottom: paw.bottom,
              left: paw.left,
              right: paw.right,
              pointerEvents: 'none'
            }}
          >
            <PawPrintDoodle
              size={paw.size}
              color={paw.color}
              opacity={paw.opacity}
              rotation={paw.rotation}
            />
          </div>
        ))}
      </div>

      {/* Foreground Main Content */}
      <div className="paw-pattern-content">
        {children}
      </div>
    </div>
  );
}
