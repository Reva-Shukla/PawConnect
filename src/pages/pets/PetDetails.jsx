import { useState } from "react";
import { useNavigate } from "react-router-dom";


function PetDetails({ pet, onBack, isFavorite = false, onToggleFavorite }) {
  const original = pet.rehabilitation || {};
  const navigate = useNavigate();

  const [rehab, setRehab] = useState({
    physicalCondition: original.physicalCondition || "Not assessed",
    medicalHistory: original.medicalHistory || "Not recorded",
    behaviour: original.behaviour || "Needs Assessment",
    socialization: original.socialization || "Not assessed",
    training: original.training || "Not started",
    specialNeeds: original.specialNeeds || "None recorded",
    progress: Number(original.progress ?? pet.recoveryProgress ?? 0),
    notes: original.notes || "No updates recorded yet.",
    adoptionReadiness: original.adoptionReadiness || "Assessment in progress",
    milestones: original.milestones || []
  });

  const [milestoneText, setMilestoneText] = useState("");

  const updateRehab = (field, value) => {
    setRehab((previous) => ({ ...previous, [field]: value }));
  };

  const addMilestone = (event) => {
    event.preventDefault();
    const text = milestoneText.trim();
    if (!text) return;

    setRehab((previous) => ({
      ...previous,
      milestones: [
        ...previous.milestones,
        { id: `${Date.now()}`, title: text, date: new Date().toLocaleDateString() }
      ]
    }));

    setMilestoneText("");
  };

  const Info = ({ label, value }) => (
    <div className="profile-info-item">
      <span>{label}</span>
      <strong>{value || "Not recorded"}</strong>
    </div>
  );

  return (
    <main className="pet-profile-page">
      <button type="button" className="profile-back-button" onClick={onBack}>
        ← Back to Pets
      </button>

      <section className="profile-hero">
        <img src={pet.image} alt={pet.name} className="profile-pet-image" />

        <div className="profile-hero-content">
          <p className="pet-eyebrow">MEET YOUR POTENTIAL BEST FRIEND</p>
          <h1>{pet.name}</h1>
          <p>{pet.breed} · {pet.type} · {pet.gender}</p>
          <p>{pet.age} {pet.age === 1 ? "year" : "years"} old · {pet.location}</p>
          <p className="profile-shelter">{pet.shelter}</p>

          <span className="adoption-status-badge">
            {rehab.adoptionReadiness}
          </span>

          {onToggleFavorite && (
            <button
              type="button"
              className="pet-view-button"
              onClick={() => onToggleFavorite(pet.id)}
            >
              {isFavorite ? "♥ Saved to favourites" : "♡ Add to favourites"}
            </button>
          )}

          {/* Adoption CTA — leads to the adoption form with this pet pre-selected */}
          <button
            type="button"
            className="pet-view-button"
            style={{ marginTop: "8px", background: "var(--paw-coral, #FF6B81)", color: "#fff", border: "none" }}
            onClick={() => navigate(`/adoption?pet=${encodeURIComponent(pet.name)}`)}
          >
            Apply to Adopt {pet.name} →
          </button>
        </div>
      </section>

      <section className="profile-section">
        <h2>About {pet.name}</h2>
        <p>{pet.description || "No description available yet."}</p>
      </section>

      <section className="profile-section">
        <h2>Medical Information</h2>
        <div className="profile-info-grid">
          <Info label="Overall health" value={pet.health} />
          <Info label="Physical condition" value={rehab.physicalCondition} />
          <Info label="Vaccination status" value={pet.vaccination} />
          <Info label="Last check-up" value={pet.lastCheckup} />
          <Info label="Medical history" value={rehab.medicalHistory} />
          <Info label="Special needs" value={rehab.specialNeeds} />
        </div>
      </section>

      <section className="profile-section">
        <h2>Behaviour and Development</h2>
        <div className="profile-info-grid">
          <Info label="Behaviour assessment" value={rehab.behaviour} />
          <Info label="Socialization level" value={rehab.socialization} />
          <Info label="Training progress" value={rehab.training} />
        </div>
      </section>

      <section className="profile-section recovery-profile">
        <div className="recovery-summary-heading">
          <h2>{pet.name}'s Recovery Journey</h2>
          <strong>{rehab.progress}%</strong>
        </div>

        <div
          className="recovery-progress-track"
          role="progressbar"
          aria-label={`${pet.name} recovery progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rehab.progress}
        >
          <div
            className="recovery-progress-fill"
            style={{ width: `${Math.max(0, Math.min(100, rehab.progress))}%` }}
          />
        </div>

        <label className="profile-field">
          Recovery progress: {rehab.progress}%
          <input
            type="range"
            min="0"
            max="100"
            value={rehab.progress}
            onChange={(event) => updateRehab("progress", Number(event.target.value))}
          />
        </label>

        <label className="profile-field">
          Recovery notes
          <textarea
            rows="3"
            value={rehab.notes}
            onChange={(event) => updateRehab("notes", event.target.value)}
          />
        </label>

        <label className="profile-field">
          Adoption readiness
          <select
            value={rehab.adoptionReadiness}
            onChange={(event) => updateRehab("adoptionReadiness", event.target.value)}
          >
            <option>Assessment in progress</option>
            <option>Ready for adoption</option>
            <option>Needs further rehabilitation</option>
            <option>Medical clearance pending</option>
          </select>
        </label>

        <h3>Rehabilitation Milestones</h3>

        {rehab.milestones.length ? (
          <ul className="milestone-list">
            {rehab.milestones.map((milestone, index) => (
              <li key={milestone.id || `${milestone.title}-${index}`}>
                <strong>{milestone.title || milestone}</strong>
                {milestone.date && <span>{milestone.date}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rehabilitation milestones recorded yet.</p>
        )}

        <form className="milestone-form" onSubmit={addMilestone}>
          <label className="profile-field">
            Add a milestone
            <input
              value={milestoneText}
              onChange={(event) => setMilestoneText(event.target.value)}
              placeholder="e.g. Completed basic socialization"
            />
          </label>
          <button type="submit" className="pet-view-button">
            Add Milestone
          </button>
        </form>
      </section>

      <section className="profile-section">
        <h2>Adoption Information</h2>
        <div className="profile-info-grid">
          <Info label="Shelter" value={pet.shelter} />
          <Info label="Location" value={pet.location} />
          <Info label="Adoption status" value={rehab.adoptionReadiness} />
        </div>
      </section>
    </main>
  );
}

export default PetDetails;
