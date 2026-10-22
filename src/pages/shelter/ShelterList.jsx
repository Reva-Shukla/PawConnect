import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PawPatternBackground from "../../components/PawPatternBackground";
import brunoImage from "../../assets/bruno.jpg";
import felixImage from "../../assets/felix.jpg";
import gauriImage from "../../assets/gauri.jpg";
import miloImage from "../../assets/milo.jpeg";
import oliverImage from "../../assets/oliver.jpg";
import willowImage from "../../assets/willow.jpeg";

import {
  selectShelters,
  selectShelterLoading,
  selectShelterError,
  fetchShelters,
} from "../../redux/slices/shelterSlice";

import "./ShelterList.css";

const shelterImages = [
  brunoImage,
  willowImage,
  felixImage,
  miloImage,
  oliverImage,
  gauriImage,
];

function getShelterImage(shelter, index) {
  return shelter.image || shelterImages[index % shelterImages.length];
}

function ShelterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectShelterLoading);
  const error = useSelector(selectShelterError);
  const shelters = useSelector(selectShelters);
  const [selectedShelter, setSelectedShelter] = useState(null);

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  if (selectedShelter) {
    return (
      <PawPatternBackground intensity="shelter">
        <div className="shelter-list-page">
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedShelter(null)}
          >
            Back to shelters
          </button>

          <article className="shelter-detail">
            <div className="shelter-detail-image-wrap">
              <img
                className="shelter-detail-image"
                src={selectedShelter.image}
                alt=""
              />
            </div>

            <div className="shelter-detail-content">
              <p className="shelter-eyebrow">PAWCONNECT SHELTER NETWORK</p>
              <h1>{selectedShelter.name}</h1>
              <p className="shelter-detail-location">
                {selectedShelter.location}
              </p>

              {selectedShelter.description && (
                <p className="shelter-detail-description">
                  {selectedShelter.description}
                </p>
              )}

              <dl className="shelter-detail-facts">
                <div>
                  <dt>Animals</dt>
                  <dd>{selectedShelter.animals}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    <a href={`tel:${selectedShelter.contact}`}>
                      {selectedShelter.contact}
                    </a>
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                className="shelter-browse-button"
                onClick={() => setSelectedShelter(null)}
              >
                Browse other shelters
              </button>
            </div>
          </article>
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
          Back
        </button>

        <header className="shelter-list-header">
          <p className="shelter-eyebrow">PAWCONNECT SHELTER NETWORK</p>
          <h1>Find a shelter</h1>
          <span>Explore animal shelters and support teams in your area.</span>
        </header>

        {loading && <p className="shelter-list-status">Loading shelters...</p>}
        {error && (
          <p className="shelter-list-status" role="alert">
            Error: {error}
          </p>
        )}

        <div className="shelter-grid">
          {shelters.map((shelter, index) => {
            const image = getShelterImage(shelter, index);

            return (
              <article className="shelter-card" key={shelter.id}>
                <div className="shelter-card-image-wrap">
                  {image ? (
                    <img
                      className="shelter-card-image"
                      src={image}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="shelter-card-image-placeholder"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="shelter-card-content">
                  <h2>{shelter.name}</h2>
                  <p className="shelter-card-location">
                    <span>Location</span>
                    {shelter.location}
                  </p>
                  <p className="shelter-card-animals">
                    <span>Animals</span>
                    {shelter.animals}
                  </p>
                  <p className="shelter-card-contact">
                    <span>Contact</span>
                    <a href={`tel:${shelter.contact}`}>{shelter.contact}</a>
                  </p>
                  <button
                    type="button"
                    className="shelter-view-button"
                    onClick={() =>
                      setSelectedShelter({ ...shelter, image })
                    }
                  >
                    View shelter
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {!loading && shelters.length === 0 && !error && (
          <p className="shelter-list-status">No shelters available.</p>
        )}
      </div>
    </PawPatternBackground>
  );
}

export default ShelterList;
