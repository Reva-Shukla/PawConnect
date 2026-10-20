import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PETS } from "../pets/petData";
import "./AdoptionForm.css";

const LIFESTYLES = [
  { value: "quiet", label: "Quiet and relaxed" },
  { value: "active", label: "Active and outdoorsy" },
  { value: "family", label: "Family-oriented" },
  { value: "otherPets", label: "I already have pets" },
];

const PERSONALITIES = [
  { value: "playful", label: "Playful" },
  { value: "calm", label: "Calm" },
  { value: "independent", label: "Independent" },
  { value: "affectionate", label: "Affectionate" },
];

function getPetText(pet) {
  return [
    pet.name,
    pet.type,
    pet.breed,
    pet.description,
    pet.health,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function calculateMatch(pet, preferences) {
  const text = getPetText(pet);
  let score = 50;
  const reasons = [];

  const lifestyleKeywords = {
    quiet: ["calm", "quiet", "gentle", "relaxed", "laid-back", "naps"],
    active: [
      "energetic",
      "active",
      "playful",
      "runs",
      "exploring",
      "fetch",
      "trails",
    ],
    family: [
      "affectionate",
      "loyal",
      "friendly",
      "loving",
      "family",
      "people",
      "cuddly",
    ],
    otherPets: [
      "other dogs",
      "gets along",
      "social",
      "friendly",
      "bonded",
    ],
  };

  const personalityKeywords = {
    playful: [
      "playful",
      "playing",
      "toys",
      "fetch",
      "energetic",
      "exploring",
    ],
    calm: [
      "calm",
      "quiet",
      "gentle",
      "relaxed",
      "laid-back",
      "naps",
    ],
    independent: [
      "independent",
      "hardy",
      "adaptable",
      "resilient",
      "self",
    ],
    affectionate: [
      "affectionate",
      "loving",
      "cuddly",
      "loyal",
      "friendly",
      "gentle",
    ],
  };

  const hasKeyword = (keywords) =>
    keywords.some((keyword) => text.includes(keyword));

  const lifestyle = preferences.lifestyle;
  const personality = preferences.personality;

  if (lifestyle && hasKeyword(lifestyleKeywords[lifestyle] || [])) {
    score += 25;

    const lifestyleLabels = {
      quiet: "may suit a quieter lifestyle",
      active: "has traits that may suit an active lifestyle",
      family: "shows family-friendly traits in its description",
      otherPets: "has traits that may help with a multi-pet household",
    };

    reasons.push(lifestyleLabels[lifestyle]);
  } else if (lifestyle) {
    score += 5;
  }

  if (
    personality &&
    hasKeyword(personalityKeywords[personality] || [])
  ) {
    score += 25;

    reasons.push(
      `shows traits associated with a ${personality} personality`
    );
  } else if (personality) {
    score += 5;
  }

  return {
    score: Math.min(score, 100),
    explanation:
      reasons.length > 0
        ? `This pet ${reasons.join(" and ")}. Meet the pet to confirm compatibility.`
        : "There is limited information to confirm a match. Ask the shelter about this pet's personality and needs.",
  };
}

function AdoptionForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    petName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    lifestyle: "",
    personality: "",
  });

  // Pre-fill pet name from URL param (e.g. navigated from PetDetails)
  useEffect(() => {
    const petParam = searchParams.get("pet");
    if (petParam) {
      setFormData((prev) => ({ ...prev, petName: petParam }));
    }
  }, [searchParams]);

  const [showMatches, setShowMatches] = useState(false);

  const matches = useMemo(() => {
    if (!formData.lifestyle || !formData.personality) {
      return [];
    }

    return PETS.map((pet) => ({
      pet,
      ...calculateMatch(pet, formData),
    })).sort((a, b) => b.score - a.score);
  }, [formData.lifestyle, formData.personality]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "lifestyle" || name === "personality") {
      setShowMatches(false);
    }
  };

  const handleFindMatches = () => {
    if (!formData.lifestyle || !formData.personality) {
      alert("Please select your lifestyle and preferred personality.");
      return;
    }

    setShowMatches(true);
  };

  const handleSelectPet = (pet) => {
    setFormData((previous) => ({
      ...previous,
      petName: pet.name,
    }));

    setShowMatches(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.lifestyle || !formData.personality) {
      alert("Please complete the adoption matching questions.");
      return;
    }

    if (!formData.petName.trim()) {
      alert("Please select a pet before submitting your application.");
      return;
    }

    const selectedMatch = matches.find(
      (match) => match.pet.name === formData.petName
    );

    const application = {
      ...formData,
      matchPercentage: selectedMatch?.score ?? null,
      matchExplanation: selectedMatch?.explanation ?? "",
    };

    console.log("Adoption Application:", application);

    alert("Adoption application submitted successfully!");
    navigate("/adoption");
  };

  return (
    <div className="adoption-form-page">
      <div className="adoption-form-card">
        <h1>Find Your Perfect Pet</h1>
        <p>
          Tell us about your lifestyle and preferences to discover
          pets that may suit your home.
        </p>

        <form onSubmit={handleSubmit}>
          <h2>1. Your lifestyle</h2>

          <label htmlFor="lifestyle">
            Which best describes your lifestyle?
          </label>
          <select
            id="lifestyle"
            name="lifestyle"
            value={formData.lifestyle}
            onChange={handleChange}
            required
          >
            <option value="">Choose your lifestyle</option>
            {LIFESTYLES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="personality">
            What personality would you prefer?
          </label>
          <select
            id="personality"
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            required
          >
            <option value="">Choose a personality</option>
            {PERSONALITIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleFindMatches}>
            Find My Pet Matches
          </button>

          {showMatches && (
            <section className="pet-match-results">
              <h2>2. Your Pet Matches</h2>
              <p>
                These estimates are based on the available pet
                descriptions and your preferences.
              </p>

              {matches.length === 0 ? (
                <p>No pets are available to match right now.</p>
              ) : (
                matches.slice(0, 6).map(({ pet, score, explanation }) => (
                  <article
                    key={pet.id}
                    className={`pet-match-card${formData.petName === pet.name ? " pet-match-card--selected" : ""}`}
                  >
                    {pet.image && (
                      <img
                        src={pet.image}
                        alt={pet.name}
                      />
                    )}

                    <h3>{pet.name}</h3>
                    <p>
                      {pet.type} · {pet.breed} · {pet.location}
                    </p>

                    <p className="pet-match-score">
                      <strong>Estimated match: {score}%</strong>
                    </p>

                    <div
                      className="pet-match-bar-track"
                      role="progressbar"
                      aria-label={`${pet.name} match percentage`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={score}
                    >
                      <div
                        className="pet-match-bar-fill"
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <p>{explanation}</p>

                    <button
                      type="button"
                      className={`pet-match-select-btn${formData.petName === pet.name ? " pet-match-select-btn--selected" : ""}`}
                      onClick={() => handleSelectPet(pet)}
                    >
                      {formData.petName === pet.name
                        ? "Selected ✓"
                        : "Choose this pet"}
                    </button>
                  </article>
                ))
              )}
            </section>
          )}

          <h2>3. Your adoption application</h2>

          <label htmlFor="petName">Selected Pet</label>
          <input
            id="petName"
            type="text"
            name="petName"
            placeholder="Choose a pet from your matches"
            value={formData.petName}
            onChange={handleChange}
            required
          />

          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="reason">
            Why do you want to adopt?
          </label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Tell us why you want to adopt this pet"
            value={formData.reason}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default AdoptionForm;