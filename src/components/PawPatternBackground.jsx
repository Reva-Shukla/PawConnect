import PawPrintDoodle from './PawPrintDoodle';
import './PawPatternBackground.css';

/**
 * PawPatternBackground Component
 * - Wraps pages or sections with scattered pastel paw-print doodles
 * - Supports 4 intensity levels:
 *   - 'pets': Sparse, tiny paw accents around edges (lowest)
 *   - 'adoption': Extremely subtle watermark paws around margins
 *   - 'shelter': Sparse paw accents around the page edges
 *   - 'community': A few subtle paw accents for community pages
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
    { top: '3%', left: '3%', size: 24, rotation: -15, color: '#7656A6', opacity: 0.13 },
    { top: '4%', right: '4%', size: 26, rotation: 22, color: '#FF7188', opacity: 0.12 },
    { top: '48%', left: '2%', size: 22, rotation: 10, color: '#7656A6', opacity: 0.11 },
    { top: '52%', right: '2%', size: 24, rotation: -20, color: '#FF7188', opacity: 0.11 },
    { bottom: '4%', left: '4%', size: 24, rotation: 8, color: '#FF7188', opacity: 0.12 },
    { bottom: '3%', right: '4%', size: 22, rotation: -22, color: '#7656A6', opacity: 0.12 },
  ],
  community: [
    { top: '3%', left: '3%', size: 26, rotation: -16, color: '#7656A6', opacity: 0.12 },
    { top: '4%', right: '3%', size: 28, rotation: 22, color: '#FF7188', opacity: 0.11 },
    { top: '54%', left: '2%', size: 22, rotation: 24, color: '#FF7188', opacity: 0.10 },
    { top: '58%', right: '2%', size: 24, rotation: -18, color: '#7656A6', opacity: 0.11 },
    { bottom: '3%', left: '3%', size: 26, rotation: 18, color: '#7656A6', opacity: 0.12 },
    { bottom: '3%', right: '3%', size: 22, rotation: -12, color: '#FF7188', opacity: 0.11 },
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
