import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 *
 * Scrolls the window to (0, 0) whenever the route pathname changes.
 * - Respects prefers-reduced-motion: uses instant scroll instead of smooth.
 * - Only triggers on pathname changes, not on query-string or hash-only updates.
 * - Place this once inside <BrowserRouter> so it covers the entire app.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'instant' : 'instant',
    });
  }, [pathname]);

  // Renders nothing — purely a side-effect component.
  return null;
}
