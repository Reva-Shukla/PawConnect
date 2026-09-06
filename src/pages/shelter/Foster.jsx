import React, { useState } from "react";
import "./Foster.css";

function Foster() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    animalType: "",
    experience: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Foster request submitted successfully!");

    console.log(formData);

    setFormData({
      name: "",
      phone: "",
      email: "",
      animalType: "",
      experience: "",
      message: ""
    });
  };

  return (
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
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
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
            Submit Foster Application
          </button>

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
  );
}

export default Foster;