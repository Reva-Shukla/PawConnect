import { useState } from "react";

function PetDetails({ pet, onBack }) {
  const [favorited, setFavorited] = useState(false);

  if (!pet) return null;

  const pageStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px 16px 60px 16px",
  };

  const backButtonStyle = {
    background: "none",
    border: "none",
    color: "#0f766e",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "20px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const imageWrapStyle = {
    position: "relative",
    marginBottom: "24px",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "420px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
  };

  const favoriteButtonStyle = {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.92)",
    color: "#F8A5C2",
    fontSize: "21px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "18px",
  };

  const nameStyle = {
    fontSize: "30px",
    fontWeight: 800,
    color: "#1f2937",
    margin: 0,
  };

  const genderBadgeStyle = {
    backgroundColor: pet.gender === "Male" ? "#2563eb" : "#db2777",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    padding: "5px 12px",
    borderRadius: "999px",
    height: "fit-content",
  };

  const infoGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  };

  const infoItemLabel = {
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: "4px",
  };

  const infoItemValue = {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1f2937",
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1f2937",
    margin: "0 0 14px 0",
  };

  const medicalCardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  };

  const medicalGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  };

  const medicalItemStyle = {
    backgroundColor: "#f0fdfa",
    borderRadius: "12px",
    padding: "14px",
  };

  const aboutCardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "20px",
  };

  const aboutTextStyle = {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#374151",
    margin: 0,
  };

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={onBack}>
        ← Back to Pets
      </button>

      <div style={imageWrapStyle}>
        <img src={pet.image} alt={pet.name} style={imageStyle} />
        <button
          style={favoriteButtonStyle}
          onClick={() => setFavorited((prev) => !prev)}
          title={favorited ? `Unfavorite ${pet.name}` : `Favorite ${pet.name}`}
        >
          {favorited ? "♥" : "♡"}
        </button>
      </div>

      <div style={headerRowStyle}>
        <div>
          <h1 style={nameStyle}>{pet.name}</h1>
          <p style={{ color: "#6b7280", fontSize: "15px", margin: "4px 0 0 0" }}>
            {pet.breed} • {pet.type}
          </p>
        </div>
        <span style={genderBadgeStyle}>{pet.gender}</span>
      </div>

      <div style={infoGridStyle}>
        <div>
          <p style={infoItemLabel}>Age</p>
          <p style={infoItemValue}>{pet.age} years</p>
        </div>
        <div>
          <p style={infoItemLabel}>Gender</p>
          <p style={infoItemValue}>{pet.gender}</p>
        </div>
        <div>
          <p style={infoItemLabel}>Location</p>
          <p style={infoItemValue}>{pet.location}</p>
        </div>
        <div>
          <p style={infoItemLabel}>Shelter</p>
          <p style={infoItemValue}>{pet.shelter}</p>
        </div>
      </div>

      <div style={medicalCardStyle}>
        <h2 style={sectionTitleStyle}>Medical Information</h2>
        <div style={medicalGridStyle}>
          <div style={medicalItemStyle}>
            <p style={infoItemLabel}>Health</p>
            <p style={infoItemValue}>{pet.health}</p>
          </div>
          <div style={medicalItemStyle}>
            <p style={infoItemLabel}>Vaccination</p>
            <p style={infoItemValue}>{pet.vaccination}</p>
          </div>
          <div style={medicalItemStyle}>
            <p style={infoItemLabel}>Last Checkup</p>
            <p style={infoItemValue}>{pet.lastCheckup}</p>
          </div>
        </div>
      </div>

      <div style={aboutCardStyle}>
        <h2 style={sectionTitleStyle}>About {pet.name}</h2>
        <p style={aboutTextStyle}>{pet.description}</p>
      </div>
    </div>
  );
}

export default PetDetails;