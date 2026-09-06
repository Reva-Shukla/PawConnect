import React from "react";
import { Link } from "react-router-dom";
import "./ShelterDashboard.css";

function ShelterDashboard() {
  return (
    <div className="shelter-page">

      <section className="hero">
        <div className="hero-content">

          <p className="tag">PAWCONNECT SHELTERS</p>

          <h1>
            Give Every Animal
            <br />
            A Safe Place
          </h1>

          <p className="hero-text">
            Connect with trusted animal shelters, help animals
            in need, and make a difference in their lives.
          </p>

          <div className="buttons">

            <Link to="/shelters/list">
              <button className="primary-btn">
                Find a Shelter
              </button>
            </Link>

            <Link to="/shelters/rescue">
              <button className="secondary-btn">
                Request Rescue
              </button>
            </Link>

          </div>

        </div>
      </section>

      <section className="stats">

        <div className="stat-card">
          <h2>120+</h2>
          <p>Registered Shelters</p>
        </div>

        <div className="stat-card">
          <h2>850+</h2>
          <p>Animals Rescued</p>
        </div>

        <div className="stat-card">
          <h2>430+</h2>
          <p>Animals Adopted</p>
        </div>

        <div className="stat-card">
          <h2>200+</h2>
          <p>Active Volunteers</p>
        </div>

      </section>

      <section className="services">

        <div className="section-heading">

          <p className="tag">HOW WE HELP</p>

          <h2>Making Animal Rescue Easier</h2>

          <p>
            Our shelter network connects people with animals
            that need care, rescue and a loving home.
          </p>

        </div>

        <div className="service-container">

          <div className="service-card">

            <div className="icon">🏠</div>

            <h3>Find Shelters</h3>

            <p>
              Find verified animal shelters near you and
              learn more about the animals they care for.
            </p>

            <Link to="/shelters/list">
              <button>
                Explore Shelters →
              </button>
            </Link>

          </div>

          <div className="service-card">

            <div className="icon">🐕</div>

            <h3>Foster Animals</h3>

            <p>
              Give an animal a temporary home and help them
              feel safe while they wait for adoption.
            </p>

            <Link to="/shelters/foster">
              <button>
                Become a Foster →
              </button>
            </Link>

          </div>

          <div className="service-card">

            <div className="icon">🚑</div>

            <h3>Request Rescue</h3>

            <p>
              Found an animal that needs urgent help?
              Send us a rescue request.
            </p>

            <Link to="/shelters/rescue">
              <button>
                Request Rescue →
              </button>
            </Link>

          </div>

        </div>

      </section>

      <section className="cta">

        <h2>
          Every Animal Deserves
          <br />
          A Safe Home
        </h2>

        <p>
          Your small action can make a huge difference.
        </p>

        <Link to="/shelters/list">
          <button className="primary-btn">
            Help an Animal Today
          </button>
        </Link>

      </section>

    </div>
  );
}

export default ShelterDashboard;