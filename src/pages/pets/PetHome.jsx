import { useState, useMemo } from "react";
import PetList from "./PetList";
import PetDetails from "./PetDetails";
import { PETS, ANIMAL_TYPES, SHELTERS, buildPetImage } from "./petData";
const FILTERS = [
  { label: "All Pets", value: "All" },
  { label: "Dogs", value: "Dog" },
  { label: "Cats", value: "Cat" },
  { label: "Small Pets", value: "Rabbit" },
  { label: "Birds", value: "Bird" },
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
  description: "",
};
function PetHome() {
  const [pets, setPets] = useState(PETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const filteredPets = useMemo(() => {
    let result = pets;
    if (activeFilter !== "All") {
      result = result.filter((pet) => pet.type === activeFilter);
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
    () => pets.find((pet) => pet.id === selectedPetId) || null,
    [pets, selectedPetId]
  );
  const handleDelete = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    if (selectedPetId === id) setSelectedPetId(null);
  };
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddPet = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.breed.trim() || !form.location.trim()) {
      alert("Please fill in at least Name, Breed and Location.");
      return;
    }
    const newId = pets.length > 0 ? Math.max(...pets.map((p) => p.id)) + 1 : 1;
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
      lastCheckup: form.lastCheckup.trim() || "Not yet recorded",
      description:
        form.description.trim() ||
        `${form.name.trim()} is a lovely ${form.breed.trim()} ${form.type.toLowerCase()} looking for a caring forever home.`,
      image: buildPetImage(form.type, form.breed, newId),
    };
    setPets((prev) => [newPet, ...prev]);
    setForm(EMPTY_FORM);
    setShowAddForm(false);
  };
  const pageStyle = {
    fontFamily:
      "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  };
  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
    flexWrap: "wrap",
    gap: "10px",
  };
  const logoStyle = {
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f766e",
  };
  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    fontSize: "15px",
    color: "#374151",
    flexWrap: "wrap",
  };
  const activeNavLinkStyle = {
    color: "#0f766e",
    fontWeight: 700,
    borderBottom: "2px solid #0f766e",
    paddingBottom: "4px",
  };
  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  };
  const favoriteIconStyle = {
    color: "#F8A5C2",
    fontSize: "20px",
    cursor: "pointer",
  };
  const loginButtonStyle = {
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "28px 20px 60px 20px",
  };
  const searchRowStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "18px",
    flexWrap: "wrap",
  };
  const searchInputStyle = {
    flexGrow: 1,
    minWidth: "220px",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
  };
  const searchButtonStyle = {
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 22px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const filterRowStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "18px",
  };
  const filterButtonStyle = (isActive) => ({
    padding: "8px 18px",
    borderRadius: "999px",
    border: isActive ? "1px solid #0f766e" : "1px solid #d1d5db",
    backgroundColor: isActive ? "#0f766e" : "#ffffff",
    color: isActive ? "#ffffff" : "#374151",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  });
  const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  };
  const countStyle = {
    fontSize: "15px",
    color: "#4b5563",
    fontWeight: 600,
  };
  const addButtonStyle = {
    backgroundColor: "#ea580c",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  };
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 50,
  };
  const modalBoxStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "85vh",
    overflowY: "auto",
  };
  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "16px",
  };
  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
    marginBottom: "4px",
    display: "block",
  };
  const formActionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  };
  const cancelButtonStyle = {
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "none",
    borderRadius: "10px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const submitButtonStyle = {
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  };
  if (selectedPet) {
    return (
      <div style={pageStyle}>
        <header style={navStyle}>
          <div style={logoStyle}>🐾 PawConnect</div>
          <nav style={navLinksStyle}>
            <span>Home</span>
            <span style={activeNavLinkStyle}>Pets</span>
            <span>Adoption</span>
            <span>Shelters</span>
            <span>Community ▾</span>
          </nav>
          <div style={navRightStyle}>
            <span style={favoriteIconStyle}>♥</span>
            <button style={loginButtonStyle}>Log in</button>
          </div>
        </header>
        <PetDetails pet={selectedPet} onBack={() => setSelectedPetId(null)} />
      </div>
    );
  }
  return (
    <div style={pageStyle}>
      <header style={navStyle}>
        <div style={logoStyle}>🐾 PawConnect</div>
        <nav style={navLinksStyle}>
          <span>Home</span>
          <span style={activeNavLinkStyle}>Pets</span>
          <span>Adoption</span>
          <span>Shelters</span>
          <span>Community ▾</span>
        </nav>
        <div style={navRightStyle}>
          <span style={favoriteIconStyle}>♥</span>
          <button style={loginButtonStyle}>Log in</button>
        </div>
      </header>
      <div style={containerStyle}>
        <div style={searchRowStyle}>
          <input
            style={searchInputStyle}
            type="text"
            placeholder="Search by name, breed, location or shelter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={searchButtonStyle} onClick={() => {}}>
            Search
          </button>
        </div>
        <div style={filterRowStyle}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              style={filterButtonStyle(activeFilter === f.value)}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={topBarStyle}>
          <span style={countStyle}>
            {filteredPets.length} {filteredPets.length === 1 ? "pet" : "pets"} looking for a
            home
          </span>
          <button style={addButtonStyle} onClick={() => setShowAddForm(true)}>
            + Add a Pet
          </button>
        </div>
        <PetList
          pets={filteredPets}
          onViewDetails={(id) => setSelectedPetId(id)}
          onDelete={handleDelete}
        />
      </div>
      {showAddForm && (
        <div style={modalOverlayStyle} onClick={() => setShowAddForm(false)}>
          <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#1f2937" }}>
              Add a Pet
            </h2>
            <form onSubmit={handleAddPet}>
              <div style={formGridStyle}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select
                    style={inputStyle}
                    value={form.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                  >
                    {ANIMAL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Breed</label>
                  <input
                    style={inputStyle}
                    value={form.breed}
                    onChange={(e) => handleFormChange("breed", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Age (years)</label>
                  <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    value={form.age}
                    onChange={(e) => handleFormChange("age", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select
                    style={inputStyle}
                    value={form.gender}
                    onChange={(e) => handleFormChange("gender", e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input
                    style={inputStyle}
                    value={form.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Shelter</label>
                  <select
                    style={inputStyle}
                    value={form.shelter}
                    onChange={(e) => handleFormChange("shelter", e.target.value)}
                  >
                    {SHELTERS.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Health</label>
                  <input
                    style={inputStyle}
                    value={form.health}
                    onChange={(e) => handleFormChange("health", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Vaccination</label>
                  <input
                    style={inputStyle}
                    value={form.vaccination}
                    onChange={(e) => handleFormChange("vaccination", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Checkup</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 15 Sep 2026"
                    value={form.lastCheckup}
                    onChange={(e) => handleFormChange("lastCheckup", e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
                    value={form.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                  />
                </div>
              </div>
              <div style={formActionsStyle}>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={submitButtonStyle}>
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