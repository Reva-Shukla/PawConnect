import PetCard from "./PetCard";
import PawPrintDoodle from "../../components/PawPrintDoodle";

function PetList({ pets, onViewDetails }) {
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
        <div style={{ marginBottom: "12px" }}>
          <PawPrintDoodle size={44} color="#94A3B8" opacity={0.4} />
        </div>
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
        />
      ))}
    </div>
  );
}

export default PetList;