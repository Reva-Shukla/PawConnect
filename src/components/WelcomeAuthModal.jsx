import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PawPrintDoodle from './PawPrintDoodle';
import './WelcomeAuthModal.css';

/**
 * WelcomeAuthModal Component
 * - Displays a welcome popup on initial site entry
 * - Matches PawConnect blue/lavender pastel visual identity
 * - Offers Log In, Create Account, and Maybe later actions
 * - Dismissable via ESC key or overlay click
 */
export default function WelcomeAuthModal() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal was already dismissed in this session
    const isDismissed = sessionStorage.getItem('paw_welcome_modal_dismissed');
    if (!isDismissed) {
      setIsOpen(true);
    }
  }, []);

  // Handle Close / Dismissal
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('paw_welcome_modal_dismissed', 'true');
  };

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="paw-welcome-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        className="paw-welcome-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Decorative SVG Paw Accents */}
        <div className="paw-modal-doodle paw-modal-doodle--left" aria-hidden="true">
          <PawPrintDoodle size={32} color="#60A5FA" opacity={0.25} rotation={-15} />
        </div>
        <div className="paw-modal-doodle paw-modal-doodle--right" aria-hidden="true">
          <PawPrintDoodle size={28} color="#8B5CF6" opacity={0.22} rotation={18} />
        </div>

        {/* Modal Header */}
        <div className="paw-welcome-badge">PAWCONNECT COMMUNITY</div>
        <h2 id="welcome-modal-title" className="paw-welcome-title">
          Welcome to PawConnect
        </h2>

        {/* Modal Description */}
        <p className="paw-welcome-text">
          Find your new best friend, connect with shelters, and become part of the community.
        </p>

        {/* Action Buttons */}
        <div className="paw-welcome-actions">
          <button
            type="button"
            className="paw-btn-welcome-primary"
            onClick={() => {
              handleClose();
              navigate('/adoption/login');
            }}
          >
            Log In
          </button>

          <button
            type="button"
            className="paw-btn-welcome-secondary"
            onClick={() => {
              handleClose();
              navigate('/adoption/register');
            }}
          >
            Create Account
          </button>
        </div>

        {/* Dismiss Link */}
        <button
          type="button"
          className="paw-welcome-dismiss-btn"
          onClick={handleClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
