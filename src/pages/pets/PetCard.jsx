
function getRehabilitation(pet) {
  return {
    physicalCondition: pet.rehabilitation?.physicalCondition || "Not assessed",
    progress: Number(pet.rehabilitation?.progress ?? pet.recoveryProgress ?? 0),
    adoptionReadiness:
      pet.rehabilitation?.adoptionReadiness || "Assessment in progress"
  };
}

function PetCard({ pet, onViewDetails, onDelete, isFavorite, onToggleFavorite }) {
  const rehabilitation = getRehabilitation(pet);
  const progress = Math.max(0, Math.min(100, rehabilitation.progress));

  return (
    <article className="pet-card">
      <div className="pet-card-image-wrap">
        <img
          className="pet-card-image"
          src={pet.image}
          alt={pet.name}
          loading="lazy"
        />

        <button
          type="button"
          className={`pet-favorite-button ${isFavorite ? "is-favorite" : ""}`}
          onClick={() => onToggleFavorite(pet.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="pet-card-content">
        <div className="pet-card-title-row">
          <div>
            <h3>{pet.name}</h3>
            <p className="pet-card-breed">{pet.breed}</p>
          </div>
          <span className="pet-type-badge">{pet.type}</span>
        </div>

        <p className="pet-card-meta">
          {pet.age} {pet.age === 1 ? "year" : "years"} · {pet.gender}
        </p>
        <p className="pet-card-meta">{pet.location}</p>
        <p className="pet-card-description">
          {pet.description || `${pet.name} is looking for a loving home.`}
        </p>

        <section className="recovery-summary" aria-label={`${pet.name} recovery progress`}>
          <div className="recovery-summary-heading">
            <strong>{pet.name}'s Recovery Journey</strong>
            <span>{progress}%</span>
          </div>

          <div
            className="recovery-progress-track"
            role="progressbar"
            aria-label={`${pet.name} recovery progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="recovery-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="recovery-status">
            {rehabilitation.adoptionReadiness}
          </p>
        </section>

        <div className="pet-card-actions">
          <button
            type="button"
            className="pet-view-button"
            onClick={() => onViewDetails(pet.id)}
          >
            View Profile
          </button>

          {onDelete && (
            <button
              type="button"
              className="pet-delete-button"
              onClick={() => onDelete(pet.id)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PetCard;
