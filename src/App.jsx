import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/navbar'

// Community Pages
import Gallery from './pages/community/Gallery'
import Reviews from './pages/community/Reviews'
import Supplies from './pages/community/Supplies'
import Donations from './pages/community/Donations'

// Pets Pages
import PetHome from './pages/pets/PetHome'
import petData from './pages/pets/petData'

// Shelter Pages
import ShelterDashboard from './pages/shelter/ShelterDashboard'
import RescueRequest from './pages/shelter/RescueRequest'

// Temporary Adoption Placeholder
const AdoptionPlaceholder = () => (
  <div style={{ padding: '60px', textAlign: 'center' }}>
    <h1>Adoption</h1>
    <p>Find your perfect companion and give an animal a loving home.</p>
  </div>
)

function App() {
  const [pets, setPets] = useState(petData)

  return (
    <BrowserRouter>
      <div className="paw-app-container">

        {/* Global Navbar */}
        <Navbar />

        <main className="paw-main-content">
          <Routes>

            {/* =========================
                HOME
            ========================= */}

            <Route
              path="/"
              element={
                <PetHome
                  pets={pets}
                  setPets={setPets}
                />
              }
            />

            {/* =========================
                PETS
            ========================= */}

            <Route
              path="/pets"
              element={
                <PetHome
                  pets={pets}
                  setPets={setPets}
                />
              }
            />

            {/* =========================
                ADOPTION
            ========================= */}

            <Route
              path="/adoption"
              element={<AdoptionPlaceholder />}
            />

            {/* =========================
                SHELTERS
            ========================= */}

            <Route
              path="/shelters"
              element={<ShelterDashboard />}
            />

            {/* =========================
                RESCUE REQUEST
            ========================= */}

            <Route
              path="/rescue"
              element={<RescueRequest />}
            />

            {/* =========================
                COMMUNITY
            ========================= */}

            <Route
              path="/community"
              element={
                <Navigate
                  to="/community/gallery"
                  replace
                />
              }
            />

            <Route
              path="/community/gallery"
              element={<Gallery />}
            />

            <Route
              path="/community/reviews"
              element={<Reviews />}
            />

            <Route
              path="/community/supplies"
              element={<Supplies />}
            />

            <Route
              path="/community/donations"
              element={<Donations />}
            />

            {/* =========================
                FALLBACK
            ========================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App