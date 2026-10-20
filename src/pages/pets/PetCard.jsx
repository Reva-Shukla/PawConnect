
import { useState } from "react";

function getHealthStyle(health) {
  const h = (health || "").toLowerCase();
  if (h === "healthy") return { background: "#ECFDF5", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" };
  if (h === "recovering") return { background: "#FFFBEB", color: "#D97706", border: "1px solid rgba(217,119,6,0.2)" };
  if (h === "under observation") return { background: "#EEF6FF", color: "#4F7DF3", border: "1px solid #DCEEFF" };
  if (h === "critical" || h === "medical care") return { background: "#FEF2F2", color: "#DC2626", border: "1px solid rgba(220,38,38,0.2)" };
  return { background: "#F5F1FF", color: "#9B86EC", border: "1px solid #E9E1FF" };
}

function getAdoptionStyle(readiness) {
  const r = (readiness || "").toLowerCase();
  if (r === "ready for adoption") return { background: "#ECFDF5", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" };
  if (r === "medical clearance pending") return { background: "#FFFBEB", color: "#D97706", border: "1px solid rgba(217,119,6,0.2)" };
  if (r === "needs further rehabilitation") return { background: "#EEF6FF", color: "#4F7DF3", border: "1px solid #DCEEFF" };
  if (r === "not ready yet") return { background: "#FEF2F2", color: "#DC2626", border: "1px solid rgba(220,38,38,0.2)" };
  return { background: "#F5F1FF", color: "#9B86EC", border: "1px solid #E9E1FF" };
}

function getVacIcon(v) {
  const s = (v || "").toLowerCase();
  if (s === "fully vaccinated") return "✓";
  if (s === "partially vaccinated") return "◑";
  if (s === "due for booster") return "⚠";
  if (s === "not vaccinated") return "✗";
  return "?";
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
    position: "relative",
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    height: "230px",
    overflow: "hidden",
    backgroundColor: "var(--paw-blue-light, #EEF6FF)",
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
        ? "var(--paw-blue, #4F7DF3)"
        : "var(--paw-coral, #FF6B81)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 750,
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
          onError={(e) => { e.currentTarget.src = `https://loremflickr.com/400/300/${(pet.type||"dog").toLowerCase()}?lock=${pet.id}`; }}
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
            🗓 {pet.age ?? 0}{" "}
            {Number(pet.age) === 1 ? "year" : "years"}
          </span>
          <span>📍 {pet.location || "Location unavailable"}</span>
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
            <span style={{ fontSize: "11px", fontWeight: 600, color: pet.vaccination === "Fully Vaccinated" ? "#059669" : pet.vaccination === "Due for Booster" ? "#D97706" : "#4F7DF3" }}>
              {getVacIcon(pet.vaccination)} {pet.vaccination}
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
              title={pet.rehabilitation?.specialNeeds}>★ Special needs</span>
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
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "var(--paw-blue, #4F7DF3)";
            event.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "var(--paw-blue-light, #EEF6FF)";
            event.currentTarget.style.color = "var(--paw-blue, #4F7DF3)";
          }}
        >
          View Profile ➔
        </button>
      </div>
    </div>
  );
}

export default PetCard;
