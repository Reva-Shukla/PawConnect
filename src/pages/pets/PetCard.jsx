
import { useState } from "react";
import dogImage from "../../assets/dog.png";
import catImage from "../../assets/cat.png";

function getHealthStyle(health) {
  const h = (health || "").toLowerCase();
  if (h === "healthy") return { background: "var(--paw-green-light)", color: "var(--paw-green-text)", border: "1px solid rgba(4,120,87,0.16)" };
  if (h === "recovering") return { background: "var(--paw-yellow-light)", color: "var(--paw-yellow-text)", border: "1px solid rgba(168,91,8,0.16)" };
  if (h === "under observation") return { background: "var(--paw-lavender-light)", color: "var(--paw-lavender)", border: "1px solid var(--paw-lavender-soft)" };
  if (h === "critical" || h === "medical care") return { background: "var(--paw-red-light)", color: "var(--paw-red-text)", border: "1px solid rgba(185,28,28,0.16)" };
  return { background: "var(--paw-lavender-light)", color: "var(--paw-lavender)", border: "1px solid var(--paw-lavender-soft)" };
}

function getAdoptionStyle(readiness) {
  const r = (readiness || "").toLowerCase();
  if (r === "ready for adoption") return { background: "var(--paw-green-light)", color: "var(--paw-green-text)", border: "1px solid rgba(4,120,87,0.16)" };
  if (r === "medical clearance pending") return { background: "var(--paw-yellow-light)", color: "var(--paw-yellow-text)", border: "1px solid rgba(168,91,8,0.16)" };
  if (r === "needs further rehabilitation") return { background: "var(--paw-lavender-light)", color: "var(--paw-lavender)", border: "1px solid var(--paw-lavender-soft)" };
  if (r === "not ready yet") return { background: "var(--paw-red-light)", color: "var(--paw-red-text)", border: "1px solid rgba(185,28,28,0.16)" };
  return { background: "var(--paw-lavender-light)", color: "var(--paw-lavender)", border: "1px solid var(--paw-lavender-soft)" };
}

function getRehabilitation(pet) {
  if (pet.rehabilitation) {
    return {
      progress: Math.max(0, Math.min(100, Number(pet.rehabilitation.progress) || 0)),
      adoptionReadiness: pet.rehabilitation.adoptionReadiness || "Assessment in progress",
      hasData: true,
    };
  }
  return {
    progress: null,
    adoptionReadiness: "Assessment in progress",
    hasData: false,
  };
}

function PetCard({
  pet,
  onViewDetails,
  onDelete,
  isFavorite = false,
  onToggleFavorite,
  isUserAdded = false,
}) {
  const [hovered, setHovered] = useState(false);

  const rehab = getRehabilitation(pet);
  const hasSpecialNeeds =
    rehab.hasData &&
    pet.rehabilitation?.specialNeeds &&
    !pet.rehabilitation.specialNeeds.toLowerCase().startsWith("none");

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "var(--paw-radius, 18px)",
    overflow: "hidden",
    padding: 0,
    minWidth: 0,
    boxShadow: hovered
      ? "var(--paw-shadow-hover, 0 10px 24px rgba(23,43,77,0.09))"
      : "var(--paw-shadow-subtle, 0 4px 16px rgba(23,43,77,0.05))",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--border-color, #e9e3d8)",
    position: "relative",
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: "var(--paw-lavender-light, #f3e8ff)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.35s ease",
    display: "block",
  };

  const genderBadgeStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor:
      pet.gender === "Male"
        ? "var(--paw-blue, #3267a8)"
        : "var(--paw-coral, #ff7188)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "9999px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    letterSpacing: "0.02em",
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
    transition: "transform 0.2s ease, background-color 0.2s ease",
  };

  const actionContainerStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    gap: "8px",
    zIndex: 2,
  };

  const bodyStyle = {
    padding: "16px 18px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  };

  const nameStyle = {
    fontSize: "1.15rem",
    fontWeight: 750,
    color: "var(--text-primary, #172B4D)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  };

  const breedStyle = {
    fontSize: "0.88rem",
    color: "var(--text-secondary, #64748B)",
    margin: 0,
    fontWeight: 500,
  };

  const metaRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "0.82rem",
    color: "var(--text-secondary, #64748B)",
    margin: "4px 0 8px",
    flexWrap: "wrap",
  };

  const viewButtonStyle = {
    marginTop: "auto",
    backgroundColor: "var(--paw-coral, #ff7188)",
    color: "#ffffff",
    border: "1px solid var(--paw-coral, #ff7188)",
    borderRadius: "var(--radius-full, 9999px)",
    padding: "10px 14px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete?.(pet.id);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite?.(pet.id);
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
          alt={pet.name || "Pet"}
          style={imageStyle}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              (pet.type || "").toLowerCase() === "cat" ? catImage : dogImage;
          }}
        />

        <span style={genderBadgeStyle}>
          {pet.gender || "Unknown"}
        </span>

        {/* Health status badge on image */}
        {pet.health && (
          <span style={{
            position: "absolute", bottom: "10px", right: "10px",
            ...getHealthStyle(pet.health),
            fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "9999px",
          }}>{pet.health}</span>
        )}

        <div style={actionContainerStyle}>
          <button
            type="button"
            style={{
              ...actionButtonStyle,
              color: isFavorite
                ? "var(--paw-coral, #FF6B81)"
                : "#94A3B8",
              fontSize: "20px",
            }}
            onClick={handleFavoriteClick}
            title={
              isFavorite
                ? `Remove ${pet.name} from favorites`
                : `Add ${pet.name} to favorites`
            }
            aria-label={
              isFavorite
                ? `Remove ${pet.name} from favorites`
                : `Add ${pet.name} to favorites`
            }
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          {isUserAdded && onDelete && (
            <button
              type="button"
              style={{
                ...actionButtonStyle,
                color: "var(--paw-red-text, #DC2626)",
                fontSize: "15px",
                fontWeight: 800,
              }}
              onClick={handleDeleteClick}
              title={`Delete ${pet.name}`}
              aria-label={`Delete ${pet.name}`}
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

        <p style={breedStyle}>{pet.breed || "Breed unknown"}</p>

        <div style={metaRowStyle}>
          <span>
            Age: {pet.age ?? 0}{" "}
            {Number(pet.age) === 1 ? "year" : "years"}
          </span>
          <span>{pet.location || "Location unavailable"}</span>
        </div>

        <p
          className="pet-card-description"
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary, #64748B)",
            margin: "0 0 8px",
          }}
        >
          {pet.description ||
            `${pet.name || "This pet"} is looking for a loving home.`}
        </p>

        {/* Vaccination status */}
        {pet.vaccination && (
          <div style={{ margin: "1px 0" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: pet.vaccination === "Fully Vaccinated" ? "var(--paw-green-text)" : pet.vaccination === "Due for Booster" ? "var(--paw-yellow-text)" : "var(--paw-lavender)" }}>
              Vaccination: {pet.vaccination}
            </span>
          </div>
        )}

        {/* Adoption readiness + special needs badges */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", margin: "2px 0" }}>
          <span style={{ ...getAdoptionStyle(rehab.adoptionReadiness), fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "9999px" }}>
            {rehab.adoptionReadiness}
          </span>
          {hasSpecialNeeds && (
            <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "9999px", background: "#FFF0F2", color: "#FF6B81", border: "1px solid #FFE4E8" }}
              title={pet.rehabilitation?.specialNeeds}>Special needs</span>
          )}
        </div>

        {/* Recovery progress — only shown when rehabilitation data is populated */}
        {rehab.hasData && (
          <section
            className="recovery-summary"
            aria-label={`${pet.name || "Pet"} recovery progress`}
          >
            <div className="recovery-summary-heading">
              <strong style={{ fontSize: "12px" }}>Recovery Progress</strong>
              <span style={{ fontSize: "12px", fontWeight: 700 }}>{rehab.progress}%</span>
            </div>
            <div
              className="recovery-progress-track"
              role="progressbar"
              aria-label={`${pet.name} recovery: ${rehab.progress}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={rehab.progress}
            >
              <div className="recovery-progress-fill" style={{ width: `${rehab.progress}%` }} />
            </div>
          </section>
        )}

        <button
          type="button"
          style={viewButtonStyle}
          onClick={() => onViewDetails?.(pet.id)}
        >
          View profile
        </button>
      </div>
    </div>
  );
}

export default PetCard;
