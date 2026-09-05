function PetCard({ pet, onView, onDelete }) {
  return (
    <div>
      <h3>{pet.name}</h3>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Location: {pet.location}</p>

      <button onClick={() => onView(pet)}>
        View Details
      </button>

      <button onClick={() => onDelete(pet.id)}>
        Delete
      </button>

      <hr />
    </div>
  );
}

export default PetCard;