import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityBackButton.css';

/**
 * CommunityBackButton
 *
 * A consistent "← Back to [label]" control for community sub-pages.
 *
 * Props:
 *   label        — text shown after the arrow, e.g. "Community"
 *   fallbackPath — route to navigate to when there is no browser history
 *                  within the app (e.g. user opened the page directly via URL)
 *
 * Navigation logic:
 *   - If the browser has at least one entry in its session history before this
 *     page, go back (respects where the user actually came from).
 *   - Otherwise fall back to the provided fallbackPath so we never send the
 *     user outside the app or into an empty history state.
 *
 * Not rendered on top-level community pages — only import it where needed.
 */
export default function CommunityBackButton({ label = 'Community', fallbackPath = '/community/gallery' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { replace: true });
    }
  };

  return (
    <nav className="comm-back-nav" aria-label="Back navigation">
      <button
        type="button"
        className="comm-back-btn"
        onClick={handleBack}
        aria-label={`Go back to ${label}`}
      >
        <span className="comm-back-arrow" aria-hidden="true">←</span>
        <span className="comm-back-label">Back to {label}</span>
      </button>
    </nav>
  );
}
