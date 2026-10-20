
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PawPrintDoodle from "../../components/PawPrintDoodle";
import PawPatternBackground from "../../components/PawPatternBackground";

import {
  selectShelters,
  selectShelterLoading,
  selectShelterError,
  fetchShelters,
  removeShelter,
} from "../../redux/slices/shelterSlice";

import "./ShelterList.css";

function ShelterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectShelterLoading);
  const error = useSelector(selectShelterError);

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);
  // Read shelter data from Redux
  const shelters = useSelector(selectShelters);

  // Local state for selected shelter details
  const [selectedShelter, setSelectedShelter] = useState(null);

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
        {loading && <p>Loading shelters...</p>}
        {error && <p role="alert">Error: {error}</p>}

        <div className="shelter-grid">
          {shelters.map((shelter) => (
            <div
              className="shelter-card"
              key={shelter.id}
            >
              <div className="shelter-icon">🏠</div>

              <h2>{shelter.name}</h2>

              <p>📍 {shelter.location}</p>

              <p className="shelter-animal-count">
                <PawPrintDoodle
                  size={15}
                  color="#2563EB"
                  opacity={0.65}
                />{" "}
                {shelter.animals}
              </p>

              <p>📞 {shelter.contact}</p>

              <button
                type="button"
                onClick={() => setSelectedShelter(shelter)}
              >
                View Shelter →
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatch(removeShelter(shelter.id));
                }}
              >
                Remove Shelter
              </button>
            </div>
          ))}
        </div>

        {shelters.length === 0 && (
          <p>No shelters available.</p>
        )}
      </div>
    </PawPatternBackground>
  );
}

export default ShelterList;
