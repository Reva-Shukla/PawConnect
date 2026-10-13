import PetCard from "./PetCard";

function PetList({
  pets,
  onViewDetails,
  onDelete,
  favorites = [],
  onToggleFavorite = () => {}
}) {
  if (!pets.length) {
    return (
      <div className="pet-empty-state">
        <h3>No pets found</h3>
        <p>Try another search or select a different animal category.</p>
      </div>
    );
  }

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
          isFavorite={favorites.includes(pet.id)}
          onToggleFavorite={onToggleFavorite}
          isUserAdded={pet.isUserAdded}
        />
      ))}
    </div>
  );
}

export default PetList;