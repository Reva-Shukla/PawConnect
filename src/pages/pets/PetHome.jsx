
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PetList from "./PetList";
import PetDetails from "./PetDetails";
import { useFavorites } from "../../context/FavoritesContext";
import { PETS, ANIMAL_TYPES, SHELTERS, buildPetImage } from "./petData";
import "./PetManagement.css";

const FILTERS = [
  { label: "All Pets", value: "All" },
  { label: "Dogs", value: "Dog" },
  { label: "Cats", value: "Cat" },
  { label: "Small Pets", value: "Rabbit" },
  { label: "Birds", value: "Bird" }
];

const createEmptyForm = () => ({
  name: "",
  type: "Dog",
  breed: "",
  age: "",
  gender: "Unknown",
  location: "",
  shelter: SHELTERS[0]?.name || "",
  health: "Healthy",
  vaccination: "Vaccination Unknown",
  lastCheckup: "",
  description: "",
  physicalCondition: "Not assessed",
  medicalHistory: "",
  behaviour: "Needs Assessment",
  socialization: "Not assessed",
  training: "Not started",
  specialNeeds: "",
  recoveryProgress: 0,
  recoveryNotes: "",
  adoptionReadiness: "Assessment in progress",
  milestones: []
});

function PetHome() {
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState(() => PETS);
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(createEmptyForm);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const filteredPets = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return pets.filter((pet) => {
      const matchesType = activeFilter === "All" || pet.type === activeFilter;
      const searchableText = [
        pet.name,
        pet.type,
        pet.breed,
        pet.location,
        pet.shelter
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesType && (!term || searchableText.includes(term));
    });
  }, [pets, activeFilter, searchTerm]);

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) || null,
    [pets, selectedPetId]
  );

  const handleFormChange = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remove this pet from the current list?")) return;

    setPets((previous) => previous.filter((pet) => pet.id !== id));

    if (selectedPetId === id) setSelectedPetId(null);
  };

  const handleAddPet = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.breed.trim() || !form.location.trim()) {
      window.alert("Please enter the pet's name, breed and location.");
      return;
    }

    const newId = `PET-${Date.now()}`;

    const newPet = {
      id: newId,
      name: form.name.trim(),
      type: form.type,
      breed: form.breed.trim(),
      age: Math.max(0, Number(form.age) || 0),
      gender: form.gender,
      location: form.location.trim(),
      shelter: form.shelter || "Not assigned",
      health: form.health,
      vaccination: form.vaccination,
      lastCheckup: form.lastCheckup.trim() || "Not recorded",
      description:
        form.description.trim() ||
        `${form.name.trim()} is looking for a caring forever home.`,
      image: buildPetImage(form.type, newId),
      rehabilitation: {
        physicalCondition: form.physicalCondition,
        medicalHistory: form.medicalHistory.trim() || "Not recorded",
        behaviour: form.behaviour,
        socialization: form.socialization,
        training: form.training,
        specialNeeds: form.specialNeeds.trim() || "None recorded",
        progress: Number(form.recoveryProgress) || 0,
        notes: form.recoveryNotes.trim() || "No updates recorded yet.",
        adoptionReadiness: form.adoptionReadiness,
        milestones: form.milestones
      }
    };

    setPets((previous) => [newPet, ...previous]);
    setForm(createEmptyForm());
    setShowAddForm(false);
    setActiveFilter("All");
    setSearchTerm("");
    setSelectedPetId(null);
  };

  if (selectedPet) {
    return (
      <div className="pet-home">
        <PetDetails
          pet={selectedPet}
          onBack={() => setSelectedPetId(null)}
          isFavorite={favorites.includes(selectedPet.id)}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    );
  }

  return (
    <main className="pet-home">
      <section className="pet-page-heading">
        <div>
          <p className="pet-eyebrow">FIND YOUR NEW BEST FRIEND</p>
          <h1>Pets looking for a home</h1>
          <p>
            Meet adoptable pets, understand their needs and follow their
            rehabilitation journey before adoption.
          </p>
        </div>

        <button
          type="button"
          className="pet-add-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add a Pet
        </button>
      </section>

      <section className="pet-search-section">
        <input
          type="search"
          className="pet-search-input"
          placeholder="Search by name, breed, shelter or location..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search pets"
        />
      </section>

      <section className="pet-catalogue">
        <div className="pet-filter-row">
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={`pet-filter-button ${
                activeFilter === filter.value ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="pet-results-heading">
          <h2>
            {filteredPets.length}{" "}
            {filteredPets.length === 1 ? "pet" : "pets"} looking for a home
          </h2>
          <p>Open a profile for medical, behaviour and recovery details.</p>
        </div>

        <PetList
          pets={filteredPets}
          onViewDetails={setSelectedPetId}
          onDelete={handleDelete}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </section>

      {showAddForm && (
        <div
          className="pet-modal-overlay"
          onClick={() => setShowAddForm(false)}
        >
          <section
            className="pet-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-pet-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pet-modal-heading">
              <div>
                <p className="pet-eyebrow">PET MANAGEMENT</p>
                <h2 id="add-pet-title">Add a Pet</h2>
              </div>
              <button
                type="button"
                className="pet-modal-close"
                onClick={() => setShowAddForm(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddPet}>
              <div className="pet-form-grid">
                <label>
                  Pet name *
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </label>

                <label>
                  Animal type *
                  <select
                    value={form.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                  >
                    {ANIMAL_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Breed *
                  <input
                    required
                    value={form.breed}
                    onChange={(e) => handleFormChange("breed", e.target.value)}
                  />
                </label>

                <label>
                  Age in years
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.age}
                    onChange={(e) => handleFormChange("age", e.target.value)}
                  />
                </label>

                <label>
                  Gender
                  <select
                    value={form.gender}
                    onChange={(e) => handleFormChange("gender", e.target.value)}
                  >
                    <option>Unknown</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>

                <label>
                  Location *
                  <input
                    required
                    value={form.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                  />
                </label>

                <label className="pet-form-full">
                  Shelter
                  <select
                    value={form.shelter}
                    onChange={(e) => handleFormChange("shelter", e.target.value)}
                  >
                    {SHELTERS.map((shelter) => (
                      <option key={shelter.code} value={shelter.name}>
                        {shelter.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Health status
                  <select
                    value={form.health}
                    onChange={(e) => handleFormChange("health", e.target.value)}
                  >
                    <option>Healthy</option>
                    <option>Recovering</option>
                    <option>Under Observation</option>
                    <option>Needs Attention</option>
                    <option>Not assessed</option>
                  </select>
                </label>

                <label>
                  Physical condition
                  <select
                    value={form.physicalCondition}
                    onChange={(e) => handleFormChange("physicalCondition", e.target.value)}
                  >
                    <option>Not assessed</option>
                    <option>Good</option>
                    <option>Needs Attention</option>
                    <option>Recovering</option>
                    <option>Under Observation</option>
                  </select>
                </label>

                <label>
                  Vaccination status
                  <select
                    value={form.vaccination}
                    onChange={(e) => handleFormChange("vaccination", e.target.value)}
                  >
                    <option>Vaccination Unknown</option>
                    <option>Fully Vaccinated</option>
                    <option>Partially Vaccinated</option>
                    <option>Not Vaccinated</option>
                    <option>Due for Booster</option>
                  </select>
                </label>

                <label>
                  Last check-up
                  <input
                    value={form.lastCheckup}
                    onChange={(e) => handleFormChange("lastCheckup", e.target.value)}
                    placeholder="e.g. 15 Sep 2026"
                  />
                </label>

                <label>
                  Behaviour assessment
                  <select
                    value={form.behaviour}
                    onChange={(e) => handleFormChange("behaviour", e.target.value)}
                  >
                    <option>Needs Assessment</option>
                    <option>Friendly</option>
                    <option>Shy</option>
                    <option>Anxious</option>
                    <option>Playful</option>
                  </select>
                </label>

                <label>
                  Socialization level
                  <select
                    value={form.socialization}
                    onChange={(e) => handleFormChange("socialization", e.target.value)}
                  >
                    <option>Not assessed</option>
                    <option>In progress</option>
                    <option>Needs Support</option>
                    <option>Completed</option>
                  </select>
                </label>

                <label>
                  Training progress
                  <select
                    value={form.training}
                    onChange={(e) => handleFormChange("training", e.target.value)}
                  >
                    <option>Not started</option>
                    <option>In progress</option>
                    <option>Basic training completed</option>
                    <option>Specialized training</option>
                    <option>Not applicable</option>
                  </select>
                </label>

                <label>
                  Adoption readiness
                  <select
                    value={form.adoptionReadiness}
                    onChange={(e) => handleFormChange("adoptionReadiness", e.target.value)}
                  >
                    <option>Assessment in progress</option>
                    <option>Ready for adoption</option>
                    <option>Needs further rehabilitation</option>
                    <option>Medical clearance pending</option>
                  </select>
                </label>

                <label>
                  Recovery progress: {form.recoveryProgress}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.recoveryProgress}
                    onChange={(e) => handleFormChange("recoveryProgress", Number(e.target.value))}
                  />
                </label>

                <label className="pet-form-full">
                  Medical history
                  <textarea
                    rows="3"
                    value={form.medicalHistory}
                    onChange={(e) => handleFormChange("medicalHistory", e.target.value)}
                    placeholder="Enter known medical history"
                  />
                </label>

                <label className="pet-form-full">
                  Special needs
                  <textarea
                    rows="2"
                    value={form.specialNeeds}
                    onChange={(e) => handleFormChange("specialNeeds", e.target.value)}
                    placeholder="Any special care requirements"
                  />
                </label>

                <label className="pet-form-full">
                  Recovery notes
                  <textarea
                    rows="3"
                    value={form.recoveryNotes}
                    onChange={(e) => handleFormChange("recoveryNotes", e.target.value)}
                    placeholder="Rehabilitation updates"
                  />
                </label>

                <label className="pet-form-full">
                  Description
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    placeholder="Write a short introduction"
                  />
                </label>
              </div>

              <div className="pet-form-actions">
                <button
                  type="button"
                  className="pet-cancel-button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="pet-add-button">
                  Add Pet
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default PetHome;
