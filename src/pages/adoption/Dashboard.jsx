import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { PETS } from "../pets/petData";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./Adoption.css";
import "./Dashboard.css";

export default function Dashboard() {
  const { favorites } = useFavorites();
  const savedPets = PETS.filter((p) => favorites.includes(p.id)).slice(0, 4);

  return (
    <PawPatternBackground intensity="adoption" className="paw-pattern--butter">
      <div className="dashboard-page">
        {/* Header */}
        <header className="dashboard-header">
          <span className="dashboard-eyebrow">MY PAWCONNECT</span>
          <h1>Your Dashboard</h1>
          <p>Track your saved pets, applications, and shelter activity all in one place.</p>
        </header>

        {/* Stats Row */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-icon">❤️</span>
            <h2>{favorites.length}</h2>
            <p>Saved Pets</p>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-icon">📋</span>
            <h2>0</h2>
            <p>Applications</p>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-icon">🏠</span>
            <h2>0</h2>
            <p>Fosters</p>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-icon">🐾</span>
            <h2>0</h2>
            <p>Rescues Reported</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="dashboard-section" aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title">Quick Actions</h2>
          <div className="dashboard-actions">
            <Link to="/pets" className="dashboard-action-card">
              <span className="dashboard-action-icon">🐶</span>
              <div>
                <strong>Browse Pets</strong>
                <p>Find your perfect companion</p>
              </div>
            </Link>
            <Link to="/adoption" className="dashboard-action-card">
              <span className="dashboard-action-icon">📝</span>
              <div>
                <strong>Apply to Adopt</strong>
                <p>Start an adoption application</p>
              </div>
            </Link>
            <Link to="/shelters/foster" className="dashboard-action-card">
              <span className="dashboard-action-icon">🏡</span>
              <div>
                <strong>Become a Foster</strong>
                <p>Give an animal a temporary home</p>
              </div>
            </Link>
            <Link to="/community/donations" className="dashboard-action-card">
              <span className="dashboard-action-icon">💖</span>
              <div>
                <strong>Donate</strong>
                <p>Support shelters in need</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Saved Pets */}
        <section className="dashboard-section" aria-labelledby="saved-pets-title">
          <div className="dashboard-section-header">
            <h2 id="saved-pets-title">Saved Pets</h2>
            <Link to="/pets?favorites=true" className="dashboard-view-all">
              View all →
            </Link>
          </div>

          {savedPets.length === 0 ? (
            <div className="dashboard-empty-state">
              <span className="dashboard-empty-icon">🐾</span>
              <p>No pets saved yet. Browse available pets and heart the ones you love!</p>
              <Link to="/pets">
                <button type="button" className="dashboard-cta-btn">
                  Explore Pets
                </button>
              </Link>
            </div>
          ) : (
            <div className="dashboard-pet-grid">
              {savedPets.map((pet) => (
                <Link
                  key={pet.id}
                  to={`/pets?search=${encodeURIComponent(pet.name)}`}
                  className="dashboard-pet-card"
                >
                  {pet.image && (
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="dashboard-pet-image"
                    />
                  )}
                  <div className="dashboard-pet-info">
                    <strong>{pet.name}</strong>
                    <p>{pet.breed} · {pet.location}</p>
                    <span
                      className={`dashboard-pet-badge ${
                        pet.health?.toLowerCase() === "healthy"
                          ? "badge--healthy"
                          : "badge--other"
                      }`}
                    >
                      {pet.health}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Community CTA */}
        <section className="dashboard-community-cta">
          <div className="dashboard-cta-content">
            <h2>Stay connected with the community</h2>
            <p>
              Share stories, read reviews, find supplies, and donate to shelters
              — all in the PawConnect community hub.
            </p>
            <Link to="/community/gallery">
              <button type="button" className="dashboard-cta-btn">
                Visit Community Hub →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </PawPatternBackground>
  );
}
