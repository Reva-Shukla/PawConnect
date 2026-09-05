function PetDetails({ pet, onBack }) {
  if (!pet) {
    return null;
  }

  return (
    <div>
      <button onClick={onBack}>
        Back
      </button>

      <h1>{pet.name}</h1>

      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Location: {pet.location}</p>

      <h2>Medical Information</h2>

      <p>Health: {pet.health}</p>
      <p>Vaccination: {pet.vaccination}</p>
      <p>Last Checkup: {pet.lastCheckup}</p>

      <h2>Description</h2>

      <p>{pet.description}</p>
    </div>
  );
}

export default PetDetails;