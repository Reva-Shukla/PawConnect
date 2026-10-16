
import React from "react";
import { useNavigate } from "react-router-dom";
import PawPrintDoodle from "../../components/PawPrintDoodle";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./ShelterList.css";

function ShelterList() {
  const navigate = useNavigate();

  const shelters = [
    {
      name: "Happy Paws Shelter",
      location: "Delhi",
      animals: "45+ Animals",
      contact: "98765439**",
    },
    {
      name: "Hope Animal Care",
      location: "Noida",
      animals: "30+ Animals",
      contact: "98765430**",
    },
    {
      name: "Safe Haven NGO",
      location: "Gurgaon",
      animals: "60+ Animals",
      contact: "98765431**",
    },
    {
      name: "Paws Rescue Center",
      location: "Yamunanagar",
      animals: "25+ Animals",
      contact: "98765432**",
    },
    {
      name: "Care For Paws",
      location: "Jhansi",
      animals: "25+ Animals",
      contact: "98765432**",
    },
    {
      name: "Animal Hope Foundation",
      location: "Chandigarh",
      animals: "40+ Animals",
      contact: "9876543***",
    },
  ];

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
                onClick={() =>
                  window.alert(
                    `Shelter: ${shelter.name}\nLocation: ${shelter.location}\nContact: ${shelter.contact}`
                  )
                }
              >
                View Shelter
              </button>
            </div>
          ))}
        </div>
      </div>
    </PawPatternBackground>
  );
}

export default ShelterList;
