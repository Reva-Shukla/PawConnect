import { useMemo, useState } from "react";
import PetList from "./PetList";
import PetDetails from "./PetDetails";
import {
  PETS,
  ANIMAL_TYPES,
  SHELTERS,
  buildPetImage
} from "./petData";

const FILTERS = [
  { label: "All Pets", value: "All" },
  { label: "Dogs", value: "Dog" },
  { label: "Cats", value: "Cat" },
  { label: "Small Pets", value: "Rabbit" },
  { label: "Birds", value: "Bird" }
];

const EMPTY_FORM = {
  name: "",
  type: "Dog",
  breed: "",
  age: "",
  gender: "Male",
  location: "",
  shelter: SHELTERS[0].name,
  health: "Healthy",
  vaccination: "Fully Vaccinated",
  lastCheckup: "",
  description: ""
};

function PetHome() {
  const [pets, setPets] = useState(PETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [favorites, setFavorites] = useState([]);

  const filteredPets = useMemo(() => {
    let result = pets;

    if (activeFilter !== "All") {
      result = result.filter(
        (pet) => pet.type === activeFilter
      );
    }

    const term = searchTerm.trim().toLowerCase();

    if (term) {
      result = result.filter((pet) => {
        return (
          pet.name.toLowerCase().includes(term) ||
          pet.breed.toLowerCase().includes(term) ||
          pet.location.toLowerCase().includes(term) ||
          pet.shelter.toLowerCase().includes(term) ||
          pet.type.toLowerCase().includes(term)
        );
      });
    }

    return result;
  }, [pets, activeFilter, searchTerm]);

  const selectedPet = useMemo(
    () =>
      pets.find((pet) => pet.id === selectedPetId) ||
      null,
    [pets, selectedPetId]
  );

  const toggleFavorite = (petId) => {
    setFavorites((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  };

  const handleDelete = (id) => {
    setPets((prev) =>
      prev.filter((pet) => pet.id !== id)
    );

    setFavorites((prev) =>
      prev.filter((favoriteId) => favoriteId !== id)
    );

    if (selectedPetId === id) {
      setSelectedPetId(null);
    }
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddPet = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.breed.trim() ||
      !form.location.trim()
    ) {
      alert(
        "Please fill in at least Name, Breed and Location."
      );
      return;
    }

    const newId =
      pets.length > 0
        ? Math.max(...pets.map((p) => p.id)) + 1
        : 1;

    const newPet = {
      id: newId,
      name: form.name.trim(),
      type: form.type,
      breed: form.breed.trim(),
      age: Number(form.age) || 1,
      gender: form.gender,
      location: form.location.trim(),
      shelter: form.shelter,
      health: form.health,
      vaccination: form.vaccination,
      lastCheckup:
        form.lastCheckup.trim() ||
        "Not yet recorded",
      description:
        form.description.trim() ||
        `${form.name.trim()} is a lovely ${form.breed.trim()} ${form.type.toLowerCase()} looking for a caring forever home.`,
      image: buildPetImage(form.type, newId)
    };

    setPets((prev) => [newPet, ...prev]);
    setForm(EMPTY_FORM);
    setShowAddForm(false);
  };

  const pageStyle = {
    fontFamily:
      "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#F8FAFA",
    minHeight: "100vh",
    color: "#243746"
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #E5EEEC",
    position: "sticky",
    top: 0,
    zIndex: 10,
    flexWrap: "wrap",
    gap: "15px"
  };

  const logoStyle = {
    fontSize: "23px",
    fontWeight: 800,
    color: "#0F766E",
    whiteSpace: "nowrap"
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "26px",
    fontSize: "15px",
    color: "#52616B",
    flexWrap: "wrap"
  };

  const activeNavLinkStyle = {
    color: "#0F766E",
    fontWeight: 800,
    borderBottom: "2px solid #0F766E",
    paddingBottom: "6px"
  };

  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  };

  const favoriteNavStyle = {
    position: "relative",
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#E85D75",
    fontSize: "27px"
  };

  const favoriteCountStyle = {
    position: "absolute",
    top: "-3px",
    right: "-5px",
    minWidth: "19px",
    height: "19px",
    padding: "0 5px",
    borderRadius: "999px",
    backgroundColor: "#E85D75",
    color: "#FFFFFF",
    fontSize: "10px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box"
  };

  const loginButtonStyle = {
    backgroundColor: "#0F766E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px 60px"
  };

  const searchRowStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap"
  };

  const searchInputStyle = {
    flexGrow: 1,
    minWidth: "220px",
    padding: "15px 18px",
    borderRadius: "14px",
    border: "1px solid #D7E3E0",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    color: "#243746",
    outline: "none",
    boxSizing: "border-box"
  };

  const searchButtonStyle = {
    backgroundColor: "#0F766E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    padding: "14px 25px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer"
  };

  const filterRowStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "24px"
  };

  const filterButtonStyle = (isActive) => ({
    padding: "10px 20px",
    borderRadius: "999px",
    border: isActive
      ? "1px solid #0F766E"
      : "1px solid #D7E3E0",
    backgroundColor: isActive
      ? "#0F766E"
      : "#FFFFFF",
    color: isActive
      ? "#FFFFFF"
      : "#354B55",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease"
  });

  const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px"
  };

  const countStyle = {
    fontSize: "20px",
    color: "#354B55",
    fontWeight: 750
  };

  const addButtonStyle = {
    backgroundColor: "#0F766E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "11px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(15,118,110,0.15)"
  };

  const modalOverlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(24,39,45,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 50
  };

  const modalBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 20px 50px rgba(0,0,0,0.18)"
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "13px",
    marginTop: "18px"
  };

  const inputStyle = {
    padding: "11px 12px",
    borderRadius: "9px",
    border: "1px solid #D7E3E0",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#FFFFFF"
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#61737B",
    marginBottom: "5px",
    display: "block"
  };

  const formActionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "22px"
  };

  const cancelButtonStyle = {
    backgroundColor: "#EEF3F2",
    color: "#40545C",
    border: "none",
    borderRadius: "10px",
    padding: "11px 18px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer"
  };

  const submitButtonStyle = {
    backgroundColor: "#0F766E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    padding: "11px 18px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer"
  };

  if (selectedPet) {
    return (
      <div style={pageStyle}>
        <header style={navStyle}>
          <div style={logoStyle}>
            🐾 PawConnect
          </div>

          <nav style={navLinksStyle}>
            <span>Home</span>

            <span style={activeNavLinkStyle}>
              Pets
            </span>

            <span>Adoption</span>
            <span>Shelters</span>
            <span>Community ▾</span>
          </nav>

          <div style={navRightStyle}>
            <div style={favoriteNavStyle}>
              {favorites.length > 0 ? "♥" : "♡"}

              {favorites.length > 0 && (
                <span style={favoriteCountStyle}>
                  {favorites.length}
                </span>
              )}
            </div>

            <button style={loginButtonStyle}>
              Log in
            </button>
          </div>
        </header>

        <PetDetails
          pet={selectedPet}
          onBack={() => setSelectedPetId(null)}
          isFavorite={favorites.includes(
            selectedPet.id
          )}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <header style={navStyle}>
        <div style={logoStyle}>
          🐾 PawConnect
        </div>

        <nav style={navLinksStyle}>
          <span>Home</span>

          <span style={activeNavLinkStyle}>
            Pets
          </span>

          <span>Adoption</span>
          <span>Shelters</span>
          <span>Community ▾</span>
        </nav>

        <div style={navRightStyle}>
          <div style={favoriteNavStyle}>
            {favorites.length > 0 ? "♥" : "♡"}

            {favorites.length > 0 && (
              <span style={favoriteCountStyle}>
                {favorites.length}
              </span>
            )}
          </div>

          <button style={loginButtonStyle}>
            Log in
          </button>
        </div>
      </header>

      <div style={containerStyle}>
        <div style={searchRowStyle}>
          <input
            style={searchInputStyle}
            type="text"
            placeholder="Search by name, breed, location or shelter..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <button
            style={searchButtonStyle}
            onClick={() => {}}
          >
            Search
          </button>
        </div>

        <div style={filterRowStyle}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              style={filterButtonStyle(
                activeFilter === f.value
              )}
              onClick={() =>
                setActiveFilter(f.value)
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={topBarStyle}>
          <span style={countStyle}>
            {filteredPets.length}{" "}
            {filteredPets.length === 1
              ? "pet"
              : "pets"}{" "}
            looking for a home
          </span>

          <button
            style={addButtonStyle}
            onClick={() => setShowAddForm(true)}
          >
            + Add a Pet
          </button>
        </div>

        <PetList
          pets={filteredPets}
          onViewDetails={(id) =>
            setSelectedPetId(id)
          }
          onDelete={handleDelete}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {showAddForm && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowAddForm(false)}
        >
          <div
            style={modalBoxStyle}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2
              style={{
                margin: 0,
                fontSize: "23px",
                fontWeight: 800,
                color: "#243746"
              }}
            >
              Add a Pet
            </h2>

            <form onSubmit={handleAddPet}>
              <div style={formGridStyle}>
                <div>
                  <label style={labelStyle}>
                    Name
                  </label>

                  <input
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) =>
                      handleFormChange(
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Type
                  </label>

                  <select
                    style={inputStyle}
                    value={form.type}
                    onChange={(e) =>
                      handleFormChange(
                        "type",
                        e.target.value
                      )
                    }
                  >
                    {ANIMAL_TYPES.map((type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    Breed
                  </label>

                  <input
                    style={inputStyle}
                    value={form.breed}
                    onChange={(e) =>
                      handleFormChange(
                        "breed",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Age (years)
                  </label>

                  <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    value={form.age}
                    onChange={(e) =>
                      handleFormChange(
                        "age",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Gender
                  </label>

                  <select
                    style={inputStyle}
                    value={form.gender}
                    onChange={(e) =>
                      handleFormChange(
                        "gender",
                        e.target.value
                      )
                    }
                  >
                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    Location
                  </label>

                  <input
                    style={inputStyle}
                    value={form.location}
                    onChange={(e) =>
                      handleFormChange(
                        "location",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Shelter
                  </label>

                  <select
                    style={inputStyle}
                    value={form.shelter}
                    onChange={(e) =>
                      handleFormChange(
                        "shelter",
                        e.target.value
                      )
                    }
                  >
                    {SHELTERS.map((s) => (
                      <option
                        key={s.code}
                        value={s.name}
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    Health
                  </label>

                  <input
                    style={inputStyle}
                    value={form.health}
                    onChange={(e) =>
                      handleFormChange(
                        "health",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Vaccination
                  </label>

                  <input
                    style={inputStyle}
                    value={form.vaccination}
                    onChange={(e) =>
                      handleFormChange(
                        "vaccination",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Last Checkup
                  </label>

                  <input
                    style={inputStyle}
                    placeholder="e.g. 15 Sep 2026"
                    value={form.lastCheckup}
                    onChange={(e) =>
                      handleFormChange(
                        "lastCheckup",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div
                  style={{
                    gridColumn: "1 / -1"
                  }}
                >
                  <label style={labelStyle}>
                    Description
                  </label>

                  <textarea
                    style={{
                      ...inputStyle,
                      minHeight: "75px",
                      resize: "vertical"
                    }}
                    value={form.description}
                    onChange={(e) =>
                      handleFormChange(
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div style={formActionsStyle}>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={() =>
                    setShowAddForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={submitButtonStyle}
                >
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetHome;