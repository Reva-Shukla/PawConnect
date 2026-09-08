import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import dogImg from '../assets/dog.png';
import catImg from '../assets/cat.png';
import './HeroHighFive.css';

/**
 * Animated High-Five Hero Component for PawConnect
 * - Uses exact dog.png (left) and cat.png (right) assets
 * - Interactive proximity approach on mouse move
 * - Triggered high-five contact with soft ripple effect
 * - Accessible (prefers-reduced-motion) & Mobile touch responsive
 */
export default function HeroHighFive({ onExplorePets }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Animation states
  const [dogOffset, setDogOffset] = useState(-45); // Initial left offset
  const [catOffset, setCatOffset] = useState(45);   // Initial right offset
  const [isHighFive, setIsHighFive] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Trigger High-Five Animation
  const triggerHighFive = useCallback(() => {
    if (isHighFive || isCooldown || prefersReducedMotion) return;

    setIsHighFive(true);
    setDogOffset(0);
    setCatOffset(0);

    // Impact ripple effect at point of contact
    setTimeout(() => {
      setShowRipple(true);
    }, 120);

    // Hide ripple shortly after contact
    setTimeout(() => {
      setShowRipple(false);
    }, 650);

    // Hold high-five pose briefly, then reset
    setTimeout(() => {
      setIsHighFive(false);
      setDogOffset(-45);
      setCatOffset(45);
      setIsCooldown(true);
    }, 1000);
  }, [isHighFive, isCooldown, prefersReducedMotion]);

  // Handle Mouse Proximity Interaction
  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isHighFive || !heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.35; // Paw meeting height

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = Math.abs(mouseX - centerX);
    const distY = Math.abs(mouseY - centerY);

    const triggerDistance = 90;
    const maxInfluenceDist = 340;

    // Reset cooldown when user moves away from center
    if (isCooldown && distX > 140) {
      setIsCooldown(false);
    }

    // Trigger high-five if mouse reaches interaction zone
    if (distX < triggerDistance && distY < triggerDistance && !isCooldown) {
      triggerHighFive();
      return;
    }

    // Smooth approach calculation
    if (!isHighFive && !isCooldown) {
      const progress = Math.max(0, 1 - distX / maxInfluenceDist);
      const approach = progress * 28; // Move up to 28px closer
      setDogOffset(-45 + approach);
      setCatOffset(45 - approach);
    }
  };

  // Reset when mouse leaves hero section
  const handleMouseLeave = () => {
    if (!isHighFive && !prefersReducedMotion) {
      setDogOffset(-45);
      setCatOffset(45);
      setIsCooldown(false);
    }
  };

  return (
    <section
      className="paw-hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={triggerHighFive}
    >
      {/* Background Vertical Stripes Pattern */}
      <div className="paw-hero-stripes" aria-hidden="true" />

      <div className="paw-hero-container">
        {/* Animated High-Five Scene */}
        <div className="paw-scene-wrapper">
          
          {/* Blue/White Dog (Left - dog.png) */}
          <div
            className={`paw-animal-container paw-dog-container ${isHighFive ? 'paw-animal--highfive' : ''}`}
            style={{
              transform: prefersReducedMotion
                ? 'translateX(0px)'
                : `translateX(${dogOffset}px)`
            }}
          >
            <img
              src={dogImg}
              alt="PawConnect Blue Dog"
              className="paw-animal-img paw-dog-img"
            />
          </div>

          {/* Impact Ripple Effect */}
          {showRipple && (
            <div className="paw-impact-ripple" aria-hidden="true">
              <span className="paw-ripple-ring paw-ripple-ring--1" />
              <span className="paw-ripple-ring paw-ripple-ring--2" />
            </div>
          )}

          {/* Soft Lavender/White Cat (Right - cat.png) */}
          <div
            className={`paw-animal-container paw-cat-container ${isHighFive ? 'paw-animal--highfive' : ''}`}
            style={{
              transform: prefersReducedMotion
                ? 'translateX(0px)'
                : `translateX(${catOffset}px)`
            }}
          >
            <img
              src={catImg}
              alt="PawConnect Lavender Cat"
              className="paw-animal-img paw-cat-img"
            />
          </div>

        </div>

        {/* PawConnect Centered Branding */}
        <div className="paw-hero-branding">
          <div className="paw-brand-header">
            <span className="paw-brand-name">PawConnect</span>
            <span className="paw-brand-badge">Pet Adoption & Welfare</span>
          </div>

          <h1 className="paw-hero-headline">
            Find your new best friend.
          </h1>

          <p className="paw-hero-subtext">
            Connecting loving homes with pets looking for a second chance. High-five your way to adopting, fostering, or supporting local shelters.
          </p>

          {/* Action Buttons */}
          <div className="paw-hero-actions">
            <button
              type="button"
              className="paw-btn-hero-primary"
              onClick={(e) => {
                e.stopPropagation();
                if (onExplorePets) {
                  onExplorePets();
                } else {
                  navigate('/pets');
                }
              }}
            >
              <span>Find a Pet</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="paw-btn-hero-secondary"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/shelters');
              }}
            >
              <span>Find a Shelter</span>
            </button>
          </div>

          {/* Interaction Instruction Hint */}
          <p className="paw-hero-hint">
            <span className="paw-hint-dot" aria-hidden="true" />
            Move cursor or tap to high-five!
          </p>
        </div>

      </div>
    </section>
  );
}
