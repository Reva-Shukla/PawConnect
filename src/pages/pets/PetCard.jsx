import { useState } from "react";

function PetCard({ pet, onViewDetails }) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const cardStyle = {
    backgroundColor: "var(--bg-surface, #ffffff)",
    borderRadius: "var(--radius-lg, 16px)",
    overflow: "hidden",
    boxShadow: hovered
      ? "var(--shadow-lg, 0 10px 30px rgba(15, 23, 42, 0.08))"
      : "var(--shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.04))",
    transform: hovered ? "translateY(-4px)" : "translateY(0px)",
    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--border-color, #dceeff)",
    cursor: "default",
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "var(--bg-soft-blue, #eef6ff)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
    display: "block",
  };

  const genderBadgeStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: pet.gender === "Male" ? "#2563eb" : "#db2777",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "999px",
  };

  const favoriteButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "var(--bg-surface, rgba(255,255,255,0.9))",
    color: "var(--accent-pink, #ff6b81)",
    fontSize: "17px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-md, 0 4px 16px rgba(15, 23, 42, 0.06))",
  };

  const bodyStyle = {
    padding: "22px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flexGrow: 1,
  };

  const nameStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary, #172b4d)",
    margin: 0,
  };

  const breedStyle = {
    fontSize: "14px",
    color: "var(--text-secondary, #64748b)",
    margin: 0,
  };

  const metaRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "var(--text-secondary, #64748b)",
    margin: "6px 0 12px 0",
  };

  const viewButtonStyle = {
    marginTop: "auto",
    backgroundColor: "var(--accent-pink, #ff6b81)",
    color: "#ffffff",
    border: "none",
    borderRadius: "var(--radius-sm, 8px)",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setFavorited((prev) => !prev);
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imageWrapStyle}>
        <img src={pet.image} alt={pet.name} style={imageStyle} />
        <span style={genderBadgeStyle}>{pet.gender}</span>
        <button
          style={favoriteButtonStyle}
          onClick={handleFavoriteClick}
          title={favorited ? `Unfavorite ${pet.name}` : `Favorite ${pet.name}`}
        >
          {favorited ? "♥" : "♡"}
        </button>
      </div>
      <div style={bodyStyle}>
        <p style={nameStyle}>{pet.name}</p>
        <p style={breedStyle}>
          {pet.breed} • {pet.type}
        </p>
        <div style={metaRowStyle}>
          <span>{pet.age} yr</span>
          <span>{pet.location}</span>
        </div>
        <button
          style={viewButtonStyle}
          onClick={() => onViewDetails(pet.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-pink-hover, #f4526c)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-pink, #ff6b81)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PetCard;