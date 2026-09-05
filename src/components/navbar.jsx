import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoImg from '../assets/pawconnect-logo.png'
import './navbar.css'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const dropdownRef = useRef(null)

  const isCommunityActive = location.pathname.startsWith('/community')

  // Automatically close menus when route changes
  useEffect(() => {
    setIsCommunityOpen(false)
    setIsMobileOpen(false)
  }, [location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCommunityOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const handleCommunityClick = (e) => {
    e.preventDefault()
    setIsCommunityOpen((prev) => !prev)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="paw-navbar">
      {/* Main Desktop & Mobile Header Row */}
      <div className="paw-navbar-container">
        {/* Brand Logo Image */}
        <NavLink to="/" className="paw-brand" onClick={() => setIsMobileOpen(false)}>
          <img src={logoImg} alt="PawConnect Logo" className="paw-brand-img" />
        </NavLink>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`paw-nav-links ${isMobileOpen ? 'paw-nav-links--mobile-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `paw-nav-item ${isActive ? 'paw-nav-item--active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/pets"
            className={({ isActive }) => `paw-nav-item ${isActive ? 'paw-nav-item--active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            Pets
          </NavLink>

          <NavLink
            to="/adoption"
            className={({ isActive }) => `paw-nav-item ${isActive ? 'paw-nav-item--active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            Adoption
          </NavLink>

          <NavLink
            to="/shelters"
            className={({ isActive }) => `paw-nav-item ${isActive ? 'paw-nav-item--active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            Shelters
          </NavLink>

          {/* Community Dropdown Navigation */}
          <div
            ref={dropdownRef}
            className="paw-nav-dropdown"
            onMouseEnter={() => setIsCommunityOpen(true)}
            onMouseLeave={() => setIsCommunityOpen(false)}
          >
            <button
              type="button"
              className={`paw-nav-item paw-dropdown-button ${
                isCommunityActive ? 'paw-nav-item--active' : ''
              }`}
              onClick={handleCommunityClick}
              aria-expanded={isCommunityOpen}
            >
              Community{' '}
              <svg
                className={`paw-chevron ${isCommunityOpen ? 'paw-chevron--open' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {isCommunityOpen && (
              <div className="paw-dropdown-menu">
                <NavLink
                  to="/community/gallery"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  Gallery
                </NavLink>

                <NavLink
                  to="/community/reviews"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  Reviews
                </NavLink>

                <NavLink
                  to="/community/supplies"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  Supplies
                </NavLink>

                <NavLink
                  to="/community/donations"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  Donations
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Utility Actions */}
        <div className="paw-nav-actions">
          <button
            type="button"
            className="paw-icon-btn"
            aria-label="Favorites"
            title="Favorites"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <button type="button" className="paw-btn-login">
            Log in
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="paw-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Blinkit-Inspired Search Bar Row */}
      <div className="paw-search-section">
        <div className="paw-search-container">
          <form className="paw-search-bar" onSubmit={handleSearchSubmit}>
            <span className="paw-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="paw-search-input"
              placeholder="Search pets, shelters, breeds, supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search pets, shelters, breeds, supplies"
            />
            <button type="submit" className="paw-search-btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
