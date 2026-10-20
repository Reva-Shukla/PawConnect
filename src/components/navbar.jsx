
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/pawconnect-logo.png";
import "./navbar.css";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const dropdownRef = useRef(null);

  const isCommunityActive = location.pathname.startsWith("/community");
  const isPetsPage = location.pathname === "/pets";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    setIsCommunityOpen(false);
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCommunityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleCommunityClick = (event) => {
    event.preventDefault();
    setIsCommunityOpen((previous) => !previous);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (isPetsPage) {
      const params = new URLSearchParams(location.search);

      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      const queryString = params.toString();

      navigate(queryString ? `/pets?${queryString}` : "/pets", {
        replace: true,
      });
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/pets?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/pets");
    }

    setIsMobileOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsCommunityOpen(false);
  };

  return (
    <header className="paw-navbar">
      <div className="paw-navbar-container">
        <NavLink
          to="/"
          className="paw-brand"
          onClick={closeMobileMenu}
        >
          <img
            src={logoImg}
            alt="PawConnect Logo"
            className="paw-brand-img"
          />
        </NavLink>

        <nav
          className={`paw-nav-links ${
            isMobileOpen ? "paw-nav-links--mobile-open" : ""
          }`}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `paw-nav-item ${isActive ? "paw-nav-item--active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/pets"
            className={({ isActive }) =>
              `paw-nav-item ${isActive ? "paw-nav-item--active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Pets
          </NavLink>

          <NavLink
            to="/shelters"
            className={({ isActive }) =>
              `paw-nav-item ${isActive ? "paw-nav-item--active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Shelters
          </NavLink>

          <NavLink
            to="/adoption"
            className={({ isActive }) =>
              `paw-nav-item ${isActive ? "paw-nav-item--active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Adopt
          </NavLink>

          <div
            ref={dropdownRef}
            className="paw-nav-dropdown"
            onMouseEnter={() => setIsCommunityOpen(true)}
            onMouseLeave={() => setIsCommunityOpen(false)}
          >
            <button
              type="button"
              className={`paw-nav-item paw-dropdown-button ${
                isCommunityActive ? "paw-nav-item--active" : ""
              }`}
              onClick={handleCommunityClick}
              aria-expanded={isCommunityOpen}
            >
              Community{" "}
              <svg
                className={`paw-chevron ${
                  isCommunityOpen ? "paw-chevron--open" : ""
                }`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isCommunityOpen && (
              <div className="paw-dropdown-menu">
                <NavLink
                  to="/community/gallery"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${
                      isActive ? "paw-dropdown-item--active" : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Gallery
                </NavLink>

                <NavLink
                  to="/community/reviews"
                  className={({ isActive }) =>
                    `paw-dropdown-item ${
                      isActive ? "paw-dropdown-item--active" : ""
                    }`
                  }
                  onClick={closeMobileMenu}
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
                    `paw-dropdown-item ${
                      isActive ? "paw-dropdown-item--active" : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Donations
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <div className="paw-nav-actions">
          <button
            type="button"
            className="paw-icon-btn"
            aria-label={`Favorites${
              favorites.length ? `, ${favorites.length} saved` : ""
            }`}
            title="Favorites"
            style={{ position: "relative" }}
            onClick={() => {
              navigate("/pets?favorites=true");
              closeMobileMenu();
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={favorites.length > 0 ? "#E85D75" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            {favorites.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  minWidth: "16px",
                  height: "16px",
                  padding: "0 4px",
                  borderRadius: "999px",
                  backgroundColor: "#E85D75",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                {favorites.length}
              </span>
            )}
          </button>

          <NavLink
            to="/adoption/login"
            className="paw-btn-login"
            onClick={closeMobileMenu}
          >
            Log in
          </NavLink>

          <button
            type="button"
            className="paw-mobile-toggle"
            onClick={() => setIsMobileOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isPetsPage && (
        <div className="paw-search-section">
          <div className="paw-search-container">
            <form
              className="paw-search-bar"
              onSubmit={handleSearchSubmit}
            >
              <span className="paw-search-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="paw-search-input"
                placeholder="Search pets, shelters, breeds, supplies..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search pets, shelters, breeds, supplies"
              />

              <button type="submit" className="paw-search-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
