import { useState } from "react";
import PetList from "./PetList";
import PetDetails from "./PetDetails";

function PetHome({ pets, setPets }) {
  const [selectedPet, setSelectedPet] = useState(null);

  const addPet = () => {
    const newPet = {
      id: Date.now(),
      name: "Rocky",
      breed: "Pug",
      age: 2,
      gender: "Male",
      location: "Delhi",
      health: "Healthy",
      vaccination: "Fully Vaccinated",
      lastCheckup: "01 Sep 2026",
      description: "Rocky is friendly and playful."
    };

    setPets([...pets, newPet]);
  };

  return (
    <div>
      <h1>PawConnect</h1>

      <p>Pet Management System</p>

      <button onClick={addPet}>
        Add Sample Pet
      </button>

      {selectedPet ? (
        <PetDetails
          pet={selectedPet}
          onBack={() => setSelectedPet(null)}
        />
      ) : (
        <PetList
          pets={pets}
          setPets={setPets}
          setSelectedPet={setSelectedPet}
        />
      )}
    </div>
  );
}

export default PetHome;