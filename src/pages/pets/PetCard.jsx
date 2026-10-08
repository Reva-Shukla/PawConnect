import { useState } from "react";

function getRehabilitation(pet) {
  return {
    physicalCondition: pet.rehabilitation?.physicalCondition || "Not assessed",
    progress: Number(pet.rehabilitation?.progress ?? pet.recoveryProgress ?? 0),
    adoptionReadiness:
      pet.rehabilitation?.adoptionReadiness || "Assessment in progress"
  };
}

function PetCard({ pet, onViewDetails, onDelete, isFavorite, onToggleFavorite }) {
  const [hovered, setHovered] = useState(false);
  const rehabilitation = getRehabilitation(pet);
  const progress = Math.max(0, Math.min(100, rehabilitation.progress));

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: hovered
      ? "var(--paw-shadow-hover, 0 10px 24px rgba(23,43,77,0.09))"
      : "var(--paw-shadow-subtle, 0 4px 16px rgba(23,43,77,0.05))",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--border-color, #E2E8F0)",
    position: "relative"
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    height: "220px",
    overflow: "hidden",
    backgroundColor: "var(--paw-blue-light, #EEF6FF)"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.35s ease",
    display: "block"
  };

  const genderBadgeStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor:
      pet.gender === "Male" ? "var(--paw-blue, #4F7DF3)" : "var(--paw-coral, #FF6B81)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 750,
    padding: "4px 10px",
    borderRadius: "9999px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    letterSpacing: "0.02em"
  };

  const actionButtonStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, background-color 0.2s ease"
  };

  const actionContainerStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    gap: "8px",
    zIndex: 2
  };

  const bodyStyle = {
    padding: "16px 18px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1
  };

  const nameStyle = {
    fontSize: "1.15rem",
    fontWeight: 750,
    color: "var(--text-primary, #172B4D)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const breedStyle = {
    fontSize: "0.88rem",
    color: "var(--text-secondary, #64748B)",
    margin: 0,
    fontWeight: 500
  };

  const metaRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.82rem",
    color: "var(--text-secondary, #64748B)",
    margin: "4px 0 8px"
  };

  const viewButtonStyle = {
    marginTop: "auto",
    backgroundColor: "var(--paw-blue-light, #EEF6FF)",
    color: "var(--paw-blue, #4F7DF3)",
    border: "1px solid var(--paw-blue-soft, #DCEEFF)",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(pet.id);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(pet.id);
  };

  return (
    <div
      className="paw-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imageWrapStyle}>
        <img
          src={pet.image}
          alt={pet.name}
          style={imageStyle}
          loading="lazy"
        />

        <span style={genderBadgeStyle}>
          {pet.gender}
        </span>

        <div style={actionContainerStyle}>
          <button
            style={{
              ...actionButtonStyle,
              color: isFavorite ? "var(--paw-coral, #FF6B81)" : "#94A3B8",
              fontSize: "18px"
            }}
            onClick={handleFavoriteClick}
            title={
              isFavorite
                ? `Remove ${pet.name} from favorites`
                : `Add ${pet.name} to favorites`
            }
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          {onDelete && (
            <button
              style={{
                ...actionButtonStyle,
                color: "var(--paw-red-text, #DC2626)",
                fontSize: "15px",
                fontWeight: 800
              }}
              onClick={handleDeleteClick}
              title={`Delete ${pet.name}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={bodyStyle}>
        <div style={nameStyle}>
          <span>{pet.name}</span>
          <span className="pet-type-badge">{pet.type}</span>
        </div>

        <p style={breedStyle}>{pet.breed}</p>

        <div style={metaRowStyle}>
          <span>🗓 {pet.age} {pet.age === 1 ? "year" : "years"}</span>
          <span>📍 {pet.location}</span>
        </div>

        <p className="pet-card-description" style={{ fontSize: "0.85rem", color: "var(--text-secondary, #64748B)", margin: "0 0 8px 0" }}>
          {pet.description || `${pet.name} is looking for a loving home.`}
        </p>

        <section className="recovery-summary" aria-label={`${pet.name} recovery progress`}>
          <div className="recovery-summary-heading">
            <strong>{pet.name}'s Recovery Journey</strong>
            <span>{progress}%</span>
          </div>

          <div
            className="recovery-progress-track"
            role="progressbar"
            aria-label={`${pet.name} recovery progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="recovery-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="recovery-status">
            {rehabilitation.adoptionReadiness}
          </p>
        </section>

        <button
          style={viewButtonStyle}
          onClick={() => onViewDetails(pet.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--paw-blue, #4F7DF3)";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--paw-blue-light, #EEF6FF)";
            e.currentTarget.style.color = "var(--paw-blue, #4F7DF3)";
          }}
        >
          View Profile ➔
        </button>
      </div>
    </div>
  );
}

export default PetCard;