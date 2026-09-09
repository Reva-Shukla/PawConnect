import { useState } from "react";

function PetCard({
  pet,
  onViewDetails,
  onDelete,
  isFavorite,
  onToggleFavorite
}) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: hovered
      ? "0 12px 28px rgba(15,118,110,0.14)"
      : "0 3px 12px rgba(31,41,55,0.07)",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #E5EEEC"
  };

  const imageWrapStyle = {
    position: "relative",
    width: "100%",
    height: "230px",
    overflow: "hidden",
    backgroundColor: "#EAF5F3"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.3s ease",
    display: "block"
  };

  const genderBadgeStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor:
      pet.gender === "Male" ? "#4F7DF3" : "#E85D9A",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: "999px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.12)"
  };

  const actionButtonStyle = {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.96)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
  };

  const actionContainerStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    gap: "8px"
  };

  const bodyStyle = {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    flexGrow: 1
  };

  const nameStyle = {
    fontSize: "19px",
    fontWeight: 750,
    color: "#243746",
    margin: 0
  };

  const breedStyle = {
    fontSize: "14px",
    color: "#718096",
    margin: 0
  };

  const metaRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#52616B",
    margin: "8px 0 12px"
  };

  const viewButtonStyle = {
    marginTop: "auto",
    backgroundColor: "#0F766E",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.2s ease"
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
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imageWrapStyle}>
        <img
          src={pet.image}
          alt={pet.name}
          style={imageStyle}
        />

        <span style={genderBadgeStyle}>
          {pet.gender}
        </span>

        <div style={actionContainerStyle}>
          <button
            style={{
              ...actionButtonStyle,
              color: isFavorite ? "#E85D75" : "#7A8790",
              fontSize: "22px"
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

          <button
            style={{
              ...actionButtonStyle,
              color: "#DC5A5A",
              fontSize: "17px",
              fontWeight: 800
            }}
            onClick={handleDeleteClick}
            title={`Delete ${pet.name}`}
          >
            ✕
          </button>
        </div>
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
            e.currentTarget.style.backgroundColor = "#0B625C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0F766E";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PetCard;