
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PawPrintDoodle from "../../components/PawPrintDoodle";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./ShelterList.css";

function ShelterList() {
  const navigate = useNavigate();
  const [selectedShelter, setSelectedShelter] = useState(null);

  const shelters = [
    {
      name: "Happy Paws Shelter",
      location: "Delhi",
      animals: "45+ Animals",
      contact: "9876543901",
    },
    {
      name: "Hope Animal Care",
      location: "Noida",
      animals: "30+ Animals",
      contact: "9876543002",
    },
    {
      name: "Safe Haven NGO",
      location: "Gurgaon",
      animals: "60+ Animals",
      contact: "9876543103",
    },
    {
      name: "Paws Rescue Center",
      location: "Yamunanagar",
      animals: "25+ Animals",
      contact: "9876543204",
    },
    {
      name: "Care For Paws",
      location: "Jhansi",
      animals: "25+ Animals",
      contact: "9876543205",
    },
    {
      name: "Animal Hope Foundation",
      location: "Chandigarh",
      animals: "40+ Animals",
      contact: "9876543006",
    },
  ];

  // Selected shelter details view
  if (selectedShelter) {
    return (
      <PawPatternBackground intensity="shelter">
        <div className="shelter-list-page">
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedShelter(null)}
          >
            ← Back to Shelters
          </button>

          <div className="shelter-list-header">
            <p>PAWCONNECT</p>
            <h1>{selectedShelter.name}</h1>
            <span>
              Learn more about this animal shelter.
            </span>
          </div>

          <div className="shelter-card shelter-detail-card">
            <div className="shelter-icon">🏠</div>

            <h2>Shelter Information</h2>

            <p>
              <strong>Shelter Name:</strong>{" "}
              {selectedShelter.name}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              📍 {selectedShelter.location}
            </p>

            <p>
              <strong>Animals at Shelter:</strong>{" "}
              <PawPrintDoodle
                size={15}
                color="#2563EB"
                opacity={0.65}
              />{" "}
              {selectedShelter.animals}
            </p>

            <p>
              <strong>Contact:</strong>{" "}
              📞 {selectedShelter.contact}
            </p>

            <button
              type="button"
              onClick={() => setSelectedShelter(null)}
            >
              Browse Other Shelters
            </button>
          </div>
        </div>
      </PawPatternBackground>
    );
  }

  return (
    <PawPatternBackground intensity="shelter">
      <div className="shelter-list-page">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="shelter-list-header">
          <p>PAWCONNECT</p>
          <h1>Find a Shelter</h1>
          <span>
            Find trusted animal shelters and NGOs near you.
          </span>
        </div>

        <div className="shelter-grid">
          {shelters.map((shelter) => (
            <div className="shelter-card" key={shelter.name}>
              <div className="shelter-icon">🏠</div>

              <h2>{shelter.name}</h2>

              <p>📍 {shelter.location}</p>

              <p className="shelter-animal-count">
                <PawPrintDoodle
                  size={15}
                  color="#2563EB"
                  opacity={0.65}
                />
                {shelter.animals}
              </p>

              <p>📞 {shelter.contact}</p>

              <button
                type="button"
                onClick={() => setSelectedShelter(shelter)}
              >
                View Shelter →
              </button>
            </div>
          ))}
        </div>
      </div>
    </PawPatternBackground>
  );
}

export default ShelterList;
