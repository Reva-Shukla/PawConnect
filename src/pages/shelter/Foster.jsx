import React, { useState } from "react";
import { Link } from "react-router-dom";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./Foster.css";

function Foster() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    animalType: "",
    activity: "",
    experience: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Foster/Volunteer application (frontend demo):", formData);
  };

  if (submitted) {
    return (
      <PawPatternBackground
        intensity="adoption"
        className="paw-pattern--butter"
      >
        <div className="foster-page">
          <div className="foster-header">
            <p>PAWCONNECT</p>
            <h1>Application Received</h1>
            <span>Thank you for your interest in helping shelter animals!</span>
          </div>
          <div className="foster-container">
            <div className="foster-info foster-success-state">
              <div className="foster-icon">🐾</div>
              <h2>We've noted your interest, {formData.name || "friend"}!</h2>
              <p className="foster-success-message">A shelter volunteer coordinator will reach out to <strong>{formData.email || "you"}</strong> within 2–3 working days.</p>
              <p className="foster-demo-note">This is a frontend demonstration. No real application or email has been sent.</p>
              <Link to="/shelters">
                <button className="foster-back-btn" type="button">Back to Shelters</button>
              </Link>
            </div>
          </div>
        </div>
      </PawPatternBackground>
    );
  }

  return (
    <PawPatternBackground
      intensity="adoption"
      className="paw-pattern--butter"
    >
      <div className="foster-page">

      <div className="foster-header">

        <p>PAWCONNECT</p>

        <h1>Become a Foster</h1>

        <span>
          Give an animal a safe and loving temporary home.
        </span>

      </div>

      <div className="foster-container">

        <form
          className="foster-form"
          onSubmit={handleSubmit}
        >

          <h2>Foster Application</h2>

          <label>Your Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Animal Type</label>

          <select
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            required
          >
            <option value="">Select animal</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Small pet / Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Any">Any animal</option>
          </select>

          <label>Preferred Activity</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
          >
            <option value="">Select an activity</option>
            <option value="fostering">Foster care (temporary home)</option>
            <option value="dog-walking">Dog walking</option>
            <option value="socialisation">Socialisation sessions</option>
            <option value="grooming">Grooming support</option>
            <option value="transport">Animal transportation</option>
            <option value="supplies">Food & supply support</option>
          </select>

          <label>Previous Experience</label>

          <textarea
            name="experience"
            placeholder="Tell us about your experience with animals..."
            rows="4"
            value={formData.experience}
            onChange={handleChange}
          />

          <label>Why do you want to foster?</label>

          <textarea
            name="message"
            placeholder="Tell us why you want to foster..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Application
          </button>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "8px", textAlign: "center" }}>
            This is a frontend demonstration. No real application is submitted.
          </p>

        </form>

        <div className="foster-info">

          <div className="foster-icon">
            🐕
          </div>

          <h2>Why Foster?</h2>

          <p>
            Fostering gives animals a safe temporary home
            while they wait for their forever family.
          </p>

          <div className="foster-box">

            <strong>How it works</strong>

            <p>1. Submit your foster application.</p>
            <p>2. Our team reviews your application.</p>
            <p>3. We match you with an animal.</p>
            <p>4. Give the animal love and care.</p>

          </div>

        </div>

      </div>

      </div>
    </PawPatternBackground>
  );
}

export default Foster;