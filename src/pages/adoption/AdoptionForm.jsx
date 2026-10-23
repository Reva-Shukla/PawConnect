
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PETS } from "../pets/petData";
import PawPatternBackground from "../../components/PawPatternBackground";
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

// Reusable field wrapper: consistent label, control and error message.
function FormField({ label, name, error, children }) {
  return (
    <div className="adoption-field">
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <p className="adoption-field-error" id={`${name}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

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

// Existing behaviour-based matching logic retained.
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
    playful: ["playful", "playing", "toys", "fetch", "energetic", "exploring"],
    calm: ["calm", "quiet", "gentle", "relaxed", "laid-back", "naps"],
    independent: ["independent", "hardy", "adaptable", "resilient", "self"],
    affectionate: ["affectionate", "loving", "cuddly", "loyal", "friendly", "gentle"],
  };

  const hasKeyword = (keywords) =>
    keywords.some((keyword) => text.includes(keyword));

  const { lifestyle, personality } = preferences;

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

  if (personality && hasKeyword(personalityKeywords[personality] || [])) {
    score += 25;
    reasons.push(`shows traits associated with a ${personality} personality`);
  } else if (personality) {
    score += 5;
  }

  return {
    score: Math.min(score, 100),
    explanation:
      reasons.length > 0
        ? `This pet ${reasons.join(
            " and "
          )}. Meet the pet to confirm compatibility.`
        : "There is limited information to confirm a match. Ask the shelter about this pet's personality and needs.",
  };
}

function validateForm(data) {
  const errors = {};

  if (!data.lifestyle) {
    errors.lifestyle = "Please choose the lifestyle that best describes you.";
  }

  if (!data.personality) {
    errors.personality = "Please choose a preferred pet personality.";
  }

  if (!data.petName.trim()) {
    errors.petName = "Please select a pet from your matches.";
  }

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Your name must contain at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else {
    const digits = data.phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Enter a valid phone number (10–15 digits).";
    }
  }

  if (!data.address.trim()) {
    errors.address = "Please enter your address.";
  } else if (data.address.trim().length < 5) {
    errors.address = "Please enter a more complete address.";
  }

  if (!data.reason.trim()) {
    errors.reason = "Please tell us why you want to adopt.";
  } else if (data.reason.trim().length < 10) {
    errors.reason = "Please provide a little more detail (at least 10 characters).";
  }

  return errors;
}

function AdoptionForm() {
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

  const [errors, setErrors] = useState({});
  const [showMatches, setShowMatches] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Keep refs to controls so we can focus the first invalid one.
  const fieldRefs = useRef({});

  useEffect(() => {
    const petParam = searchParams.get("pet");

    if (petParam) {
      setFormData((previous) => ({ ...previous, petName: petParam }));
    }
  }, [searchParams]);

  const matches = useMemo(() => {
    if (!formData.lifestyle || !formData.personality) {
      return [];
    }

    return PETS.map((pet) => ({
      pet,
      ...calculateMatch(pet, formData),
    })).sort((a, b) => b.score - a.score);
  }, [formData.lifestyle, formData.personality]);

  const setFieldRef = (fieldName) => (element) => {
    fieldRefs.current[fieldName] = element;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear that field's message as the user edits it.
    setErrors((previous) => {
      if (!previous[name]) return previous;

      const next = { ...previous };
      delete next[name];
      return next;
    });

    setSubmitted(false);

    if (name === "lifestyle" || name === "personality") {
      setShowMatches(false);
      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));
    }
  };

  const focusFirstError = (nextErrors) => {
    const firstInvalidField = Object.keys(nextErrors)[0];
    fieldRefs.current[firstInvalidField]?.focus();
  };

  const handleFindMatches = () => {
    const preferenceErrors = {};

    if (!formData.lifestyle) {
      preferenceErrors.lifestyle =
        "Choose your lifestyle before finding matches.";
    }

    if (!formData.personality) {
      preferenceErrors.personality =
        "Choose a preferred personality before finding matches.";
    }

    if (Object.keys(preferenceErrors).length > 0) {
      setErrors((previous) => ({ ...previous, ...preferenceErrors }));
      focusFirstError(preferenceErrors);
      return;
    }

    setErrors((previous) => {
      const next = { ...previous };
      delete next.lifestyle;
      delete next.personality;
      return next;
    });

    setShowMatches(true);
  };

  const handleSelectPet = (pet) => {
    setFormData((previous) => ({
      ...previous,
      petName: pet.name,
    }));

    setErrors((previous) => {
      const next = { ...previous };
      delete next.petName;
      return next;
    });

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    setSubmitted(false);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
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

    // Current project behaviour: log the application locally.
    // This does not persist it to a backend/database.
    console.log("Adoption Application:", application);

    setSubmitted(true);
  };

  return (
    <PawPatternBackground
      intensity="adoption"
      className="paw-pattern--butter"
    >
      <div className="adoption-form-page">
        <div className="adoption-form-card">
        <h1>Find Your Perfect Pet</h1>
        <p>
          Tell us about your lifestyle and preferences to discover
          pets that may suit your home.
        </p>

        {submitted && (
          <div className="adoption-success" role="status" tabIndex="-1">
            <strong>Application completed successfully!</strong>
            <p>
              Your form passed validation. The application is currently
              logged locally; it has not been sent to a shelter or saved
              to a database.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <h2>1. Your lifestyle</h2>

          <FormField
            label="Which best describes your lifestyle?"
            name="lifestyle"
            error={errors.lifestyle}
          >
            <select
              id="lifestyle"
              name="lifestyle"
              ref={setFieldRef("lifestyle")}
              value={formData.lifestyle}
              onChange={handleChange}
              aria-invalid={Boolean(errors.lifestyle)}
              aria-describedby={errors.lifestyle ? "lifestyle-error" : undefined}
            >
              <option value="">Choose your lifestyle</option>
              {LIFESTYLES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="What personality would you prefer?"
            name="personality"
            error={errors.personality}
          >
            <select
              id="personality"
              name="personality"
              ref={setFieldRef("personality")}
              value={formData.personality}
              onChange={handleChange}
              aria-invalid={Boolean(errors.personality)}
              aria-describedby={
                errors.personality ? "personality-error" : undefined
              }
            >
              <option value="">Choose a personality</option>
              {PERSONALITIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <button type="button" onClick={handleFindMatches}>
            Find My Pet Matches
          </button>

          {showMatches && (
            <section className="pet-match-results">
              <h2>2. Your Pet Matches</h2>
              <p>
                These estimates are based on available pet descriptions
                and your preferences.
              </p>

              {matches.length === 0 ? (
                <p>No pets are available to match right now.</p>
              ) : (
                matches.slice(0, 6).map(({ pet, score, explanation }) => {
                  const isSelected = formData.petName === pet.name;

                  return (
                    <article
                      key={pet.id}
                      className={`pet-match-card${
                        isSelected ? " pet-match-card--selected" : ""
                      }`}
                    >
                      {pet.image && <img src={pet.image} alt={pet.name} />}

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
                        className={`pet-match-select-btn${
                          isSelected ? " pet-match-select-btn--selected" : ""
                        }`}
                        onClick={() => handleSelectPet(pet)}
                      >
                        {isSelected ? "Selected ✓" : "Choose this pet"}
                      </button>
                    </article>
                  );
                })
              )}
            </section>
          )}

          <h2>
            {showMatches ? "3." : "2."} Your adoption application
          </h2>

          <FormField
            label="Selected Pet"
            name="petName"
            error={errors.petName}
          >
            <input
              id="petName"
              type="text"
              name="petName"
              placeholder="Choose a pet from your matches"
              value={formData.petName}
              onChange={handleChange}
              ref={setFieldRef("petName")}
              aria-invalid={Boolean(errors.petName)}
              aria-describedby={errors.petName ? "petName-error" : undefined}
            />
          </FormField>

          <FormField label="Your Name" name="name" error={errors.name}>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              ref={setFieldRef("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </FormField>

          <FormField label="Email" name="email" error={errors.email}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              ref={setFieldRef("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </FormField>

          <FormField label="Phone" name="phone" error={errors.phone}>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              ref={setFieldRef("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </FormField>

          <FormField label="Address" name="address" error={errors.address}>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              ref={setFieldRef("address")}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
          </FormField>

          <FormField
            label="Why do you want to adopt?"
            name="reason"
            error={errors.reason}
          >
            <textarea
              id="reason"
              name="reason"
              placeholder="Tell us why you want to adopt this pet"
              value={formData.reason}
              onChange={handleChange}
              ref={setFieldRef("reason")}
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? "reason-error" : undefined}
            />
          </FormField>

          <button type="submit">Submit Application</button>
        </form>
        </div>
      </div>
    </PawPatternBackground>
  );
}

export default AdoptionForm;
