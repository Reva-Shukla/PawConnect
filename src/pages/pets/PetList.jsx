import PetCard from "./PetCard";

function PetList({
  pets,
  onViewDetails,
  onDelete,
  favorites,
  onToggleFavorite
}) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "22px",
    width: "100%"
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "70px 20px",
    color: "#718096",
    fontSize: "16px"
  };

  if (!pets || pets.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <p style={{ fontSize: "42px", margin: 0 }}>🐾</p>
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
          isFavorite={favorites.includes(pet.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default PetList;