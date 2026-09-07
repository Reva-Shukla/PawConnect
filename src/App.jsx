// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

// Shelter Pages
import ShelterDashboard from './pages/shelter/ShelterDashboard'
import RescueRequest from './pages/shelter/RescueRequest'
import Login from './pages/adoption/Login'
import Register from './pages/adoption/Register'

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App















import React from "react";
import PetHome from "./pages/pets/PetHome";
function App() {
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
            <Route
              path="/adoption/login"
              element={<Login />}
            />
            <Route
              path="/adoption/register"
              element={<Register />}
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

export default App;