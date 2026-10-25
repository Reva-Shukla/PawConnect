import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Hum aapke experience ko behtar banane ke liye cookies ka istemal karte hain. 
          Aap hamari <a href="/privacy-policy">Privacy Policy</a> padh sakte hain.
        </p>
        <div className="cookie-buttons">
          <button className="btn-accept" onClick={handleAccept}>Accept All</button>
          <button className="btn-reject" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;