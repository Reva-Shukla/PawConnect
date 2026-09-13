import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdoptionForm.css";

function AdoptionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    petName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Adoption Application:", formData);

    alert("Adoption application submitted successfully!");

    navigate("/adoption");
  };

  return (
    <div className="adoption-form-page">
      <div className="adoption-form-card">

        <h1>Adoption Application</h1>
        <p>Fill in the details to apply for pet adoption.</p>

        <form onSubmit={handleSubmit}>

          <label>Pet Name</label>
          <input
            type="text"
            name="petName"
            placeholder="Enter pet name"
            value={formData.petName}
            onChange={handleChange}
            required
          />

          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
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

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label>Why do you want to adopt?</label>
          <textarea
            name="reason"
            placeholder="Tell us why you want to adopt this pet"
            value={formData.reason}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Application
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdoptionForm;