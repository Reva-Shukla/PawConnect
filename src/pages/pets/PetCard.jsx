import { useState } from "react";

function PetCard({ pet, onViewDetails, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: hovered
      ? "0 12px 24px rgba(0,0,0,0.12)"
      : "0 2px 8px rgba(0,0,0,0.06)",
    transform: hovered ? "translateY(-4px)" : "translateY(0px)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eeeeee",
    cursor: "default",
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
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
    right: "48px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#F8A5C2",
    fontSize: "17px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const deleteButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#dc2626",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const bodyStyle = {
    padding: "14px 16px 16px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flexGrow: 1,
  };

  const nameStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1f2937",
    margin: 0,
  };

  const breedStyle = {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  };

  const metaRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#4b5563",
    margin: "6px 0 12px 0",
  };

  const viewButtonStyle = {
    marginTop: "auto",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(pet.id);
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
        <button
          style={deleteButtonStyle}
          onClick={handleDeleteClick}
          title={`Delete ${pet.name}`}
        >
          ✕
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#115e59")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PetCard;