import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

// Community Section Placeholder Pages
import Gallery from './pages/community/Gallery'
import Reviews from './pages/community/Reviews'
import Supplies from './pages/community/Supplies'
import Donations from './pages/community/Donations'

// Teammates' Page Placeholders (Fallback components if teammate exports are empty)
const HomePlaceholder = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>Welcome to PawConnect 🐾</h1>
    <p>Connecting pet adopters with loving homes and shelters.</p>
  </div>
)

const PetsPlaceholder = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Pets Page (Teammate Section)</h2>
  </div>
)

const AdoptionPlaceholder = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Adoption Page (Teammate Section)</h2>
  </div>
)

const SheltersPlaceholder = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Shelters Page (Teammate Section)</h2>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <div className="paw-app-container">
        <Navbar />
        <main className="paw-main-content">
          <Routes>
            {/* Main Application Routes */}
            <Route path="/" element={<HomePlaceholder />} />
            <Route path="/pets" element={<PetsPlaceholder />} />
            <Route path="/adoption" element={<AdoptionPlaceholder />} />
            <Route path="/shelters" element={<SheltersPlaceholder />} />

            {/* Community Section Routes */}
            <Route path="/community" element={<Navigate to="/community/gallery" replace />} />
            <Route path="/community/gallery" element={<Gallery />} />
            <Route path="/community/reviews" element={<Reviews />} />
            <Route path="/community/supplies" element={<Supplies />} />
            <Route path="/community/donations" element={<Donations />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
