import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
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

  return (
    <header className="paw-navbar">
      <div className="paw-navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="paw-brand" onClick={() => setIsMobileOpen(false)}>
          <span className="paw-brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12.5C9.5 12.5 7.5 14.5 7.5 17C7.5 19.5 9.5 21.5 12 21.5C14.5 21.5 16.5 19.5 16.5 17C16.5 14.5 14.5 12.5 12 12.5ZM6.5 9C5.1 9 4 10.1 4 11.5C4 12.9 5.1 14 6.5 14C7.9 14 9 12.9 9 11.5C9 10.1 7.9 9 6.5 9ZM17.5 9C16.1 9 15 10.1 15 11.5C15 12.9 16.1 14 17.5 14C18.9 14 20 12.9 20 11.5C20 10.1 18.9 9 17.5 9ZM9.5 3.5C8.4 3.5 7.5 4.4 7.5 5.5C7.5 6.6 8.4 7.5 9.5 7.5C10.6 7.5 11.5 6.6 11.5 5.5C11.5 4.4 10.6 3.5 9.5 3.5ZM14.5 3.5C13.4 3.5 12.5 4.4 12.5 5.5C12.5 6.6 13.4 7.5 14.5 7.5C15.6 7.5 16.5 6.6 16.5 5.5C16.5 4.4 15.6 3.5 14.5 3.5Z" />
            </svg>
          </span>
          <span className="paw-brand-text">
            Paw<span className="paw-brand-accent">Connect</span>
          </span>
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
              Community <span className={`paw-arrow ${isCommunityOpen ? 'paw-arrow--open' : ''}`}>▾</span>
            </button>

            {isCommunityOpen && (
              <div className="paw-dropdown-menu">
                <NavLink
                  to="/community/gallery"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                >
                  Gallery
                </NavLink>

                <NavLink
                  to="/community/reviews"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                >
                  Reviews
                </NavLink>

                <NavLink
                  to="/community/supplies"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                >
                  Supplies
                </NavLink>

                <NavLink
                  to="/community/donations"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${isActive ? 'paw-dropdown-item--active' : ''}`
                  }
                >
                  Donations
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          className="paw-mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
