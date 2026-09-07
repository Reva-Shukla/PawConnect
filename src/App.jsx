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

// Adoption Pages
import Login from './pages/adoption/Login'
import Register from './pages/adoption/Register'

<<<<<<< HEAD
// Shelter Pages
import ShelterDashboard from './pages/shelter/ShelterDashboard'
import ShelterList from './pages/shelter/ShelterList'
import Foster from './pages/shelter/Foster'
import RescueRequest from './pages/shelter/RescueRequest'
<<<<<<< HEAD
import Login from './pages/adoption/Login'
import Register from './pages/adoption/Register'
=======
//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>
>>>>>>> fde7fdd (Update Pet Management and App)
=======
>>>>>>> a89c4da (Update App.jsx)

// Adoption Placeholder
const AdoptionPlaceholder = () => (
  <div style={{ padding: '60px', textAlign: 'center' }}>
    <h1>Adoption</h1>
    <p>
      Find your perfect companion and give an animal a loving home.
    </p>
  </div>
)

function App() {
  const [pets, setPets] = useState(petData)

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div className="paw-app-container">

        {/* Global Navbar */}
        <Navbar />

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
=======
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <PetHome />
    </div>
  );
>>>>>>> fde7fdd (Update Pet Management and App)
}

export default App