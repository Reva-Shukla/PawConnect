import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/navbar'
import WelcomeAuthModal from './components/WelcomeAuthModal'

// Community Pages
import Gallery from './pages/community/Gallery'
import Reviews from './pages/community/Reviews'
import Supplies from './pages/community/Supplies'
import Donations from './pages/community/Donations'

// Pets Pages
import PetHome from './pages/pets/PetHome'
import petData from './pages/pets/petData'

// Adoption Pages
import Login from './pages/adoption/Login'
import Register from './pages/adoption/Register'

// Shelter Pages
import ShelterDashboard from './pages/shelter/ShelterDashboard'
import ShelterList from './pages/shelter/ShelterList'
import Foster from './pages/shelter/Foster'
import RescueRequest from './pages/shelter/RescueRequest'

import PawPrintDoodle from './components/PawPrintDoodle'

// Adoption Placeholder
const AdoptionPlaceholder = () => (
  <div style={{ padding: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '20px', right: '40px', pointerEvents: 'none' }}>
      <PawPrintDoodle size={32} color="#60A5FA" opacity={0.2} rotation={12} />
    </div>
    <div style={{ position: 'absolute', bottom: '20px', left: '40px', pointerEvents: 'none' }}>
      <PawPrintDoodle size={36} color="#8B5CF6" opacity={0.18} rotation={-15} />
    </div>
    <h1>Adoption</h1>
    <p>
      Find your perfect companion and give an animal a loving home.
    </p>
  </div>
)

function App() {
  const [pets, setPets] = useState(petData)

  return (
    <BrowserRouter>
      <div className="paw-app-container">

        {/* Global Navbar */}
        <Navbar />

        {/* Initial Entry Welcome Auth Modal */}
        <WelcomeAuthModal />

        <main className="paw-main-content">
          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={
                <PetHome
                  pets={pets}
                  setPets={setPets}
                />
              }
            />

            {/* PETS */}
            <Route
              path="/pets"
              element={
                <PetHome
                  pets={pets}
                  setPets={setPets}
                />
              }
            />

            {/* ADOPTION */}
            <Route
              path="/adoption"
              element={<AdoptionPlaceholder />}
            />

            {/* LOGIN */}
            <Route
              path="/adoption/login"
              element={<Login />}
            />

            {/* REGISTER */}
            <Route
              path="/adoption/register"
              element={<Register />}
            />

            {/* SHELTERS */}
            <Route
              path="/shelters"
              element={<ShelterDashboard />}
            />
            <Route
              path="/shelters/list"
              element={<ShelterList />}
            />
            
            <Route
              path="/shelters/foster"
              element={<Foster />}
            />
            <Route
              path="/shelters/rescue"
              element={<RescueRequest />}
            />

            {/* RESCUE REQUEST */}
            <Route
              path="/rescue"
              element={<RescueRequest />}
            />

            {/* COMMUNITY */}
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

            {/* FALLBACK */}
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