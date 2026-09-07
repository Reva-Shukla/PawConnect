import PetCard from "./PetCard";

function PetList({ pets, onViewDetails, onDelete }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    width: "100%",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6b7280",
    fontSize: "16px",
  };

  if (!pets || pets.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <p style={{ fontSize: "40px", margin: 0 }}>🐾</p>
        <p>No pets found. Try a different search or filter.</p>
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PetList;