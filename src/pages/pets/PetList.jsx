import { useState } from "react";
import PetCard from "./PetCard";

function PetList({ pets, setPets, setSelectedPet }) {
  const [search, setSearch] = useState("");

  const filteredPets = pets.filter((pet) => {
    const text = search.toLowerCase();

    return (
      pet.name.toLowerCase().includes(text) ||
      pet.breed.toLowerCase().includes(text) ||
      pet.location.toLowerCase().includes(text)
    );
  });

  const deletePet = (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
  };

  return (
    <div>
      <h2>Pet List</h2>

      <input
        type="text"
        placeholder="Search pet"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filteredPets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onView={setSelectedPet}
            onDelete={deletePet}
          />
        ))}
      </div>

      {filteredPets.length === 0 && (
        <p>No pet found.</p>
      )}
    </div>
  );
}

export default PetList;