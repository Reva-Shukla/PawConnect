import React from "react";
import "./ShelterList.css";

function ShelterList() {
  const shelters = [
    {
      name: "Happy Paws Shelter",
      location: "Delhi",
      animals: "45+ Animals",
      contact: "98765439**"
    },
    {
      name: "Hope Animal Care",
      location: "Noida",
      animals: "30+ Animals",
      contact: "98765430**"
    },
    {
      name: "Safe Haven NGO",
      location: "Gurgaon",
      animals: "60+ Animals",
      contact: "98765431**"
    },
    {
      name: "Paws Rescue Center",
      location: "Yamunanagar",
      animals: "25+ Animals",
      contact: "98765432**"
    },
    {
      name: "Care For Paws",
      location: "Jhansi",
      animals: "25+ Animals",
      contact: "98765432**"
    },
    {
      name: "Animal Hope Foundation",
      location: "Chandigarh",
      animals: "40+ Animals",
      contact: "9876543***"
    }
  ];

  return (
    <div className="shelter-list-page">

      <div className="shelter-list-header">
        <p>PAWCONNECT</p>

        <h1>Find a Shelter</h1>

        <span>
          Find trusted animal shelters and NGOs near you.
        </span>
      </div>

      <div className="shelter-grid">

        {shelters.map((shelter, index) => (
          <div className="shelter-card" key={index}>

            <div className="shelter-icon">
              🏠
            </div>

            <h2>{shelter.name}</h2>

            <p>
              📍 {shelter.location}
            </p>

            <p>
              🐾 {shelter.animals}
            </p>

            <p>
              📞 {shelter.contact}
            </p>

            <button>
              View Shelter
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ShelterList;