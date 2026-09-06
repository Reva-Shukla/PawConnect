import React, { useState } from "react";
import "./RescueRequest.css";

function RescueRequest() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    animalType: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Rescue request submitted successfully!");

    console.log(formData);

    setFormData({
      name: "",
      phone: "",
      location: "",
      animalType: "",
      description: ""
    });
  };

  return (
    <div className="rescue-page">

      <div className="rescue-header">
        <p>PAWCONNECT</p>

        <h1>Request Animal Rescue</h1>

        <span>
          Help us reach an animal that needs immediate care.
        </span>
      </div>

      <div className="rescue-container">

        <form
          className="rescue-form"
          onSubmit={handleSubmit}
        >

          <h2>Rescue Request Form</h2>

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

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="Where is the animal?"
            value={formData.location}
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

          <label>Describe the Situation</label>

          <textarea
            name="description"
            placeholder="Tell us what happened..."
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Rescue Request
          </button>

        </form>

        <div className="rescue-info">

          <div className="rescue-icon">
            🚑
          </div>

          <h2>Need Immediate Help?</h2>

          <p>
            If you find an injured, abandoned or endangered
            animal, submit the form and our rescue network
            can help connect you with nearby shelters.
          </p>

          <div className="info-box">

            <strong>What happens next?</strong>

            <p>1. Your request is received.</p>
            <p>2. Nearby shelters are contacted.</p>
            <p>3. A rescue team assesses the situation.</p>
            <p>4. The animal receives appropriate care.</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RescueRequest;