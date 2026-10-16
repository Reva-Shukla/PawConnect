
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import WelcomeAuthModal from './components/WelcomeAuthModal';

import { FavoritesProvider } from './context/FavoritesContext';

// Home and Pets
import Home from './pages/Home';
import PetHome from './pages/pets/PetHome';
import petData from './pages/pets/petData';

// Adoption
import AdoptionForm from './pages/adoption/AdoptionForm';
import Login from './pages/adoption/Login';
import Register from './pages/adoption/Register';

// Community
import Gallery from './pages/community/Gallery';
import Reviews from './pages/community/Reviews';
import Supplies from './pages/community/Supplies';
import Donations from './pages/community/Donations';

// Shelters
import ShelterDashboard from './pages/shelter/ShelterDashboard';
import ShelterList from './pages/shelter/ShelterList';
import Foster from './pages/shelter/Foster';
import RescueRequest from './pages/shelter/RescueRequest';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="paw-app-container">
          <Navbar />
          <WelcomeAuthModal />

          <main className="paw-main-content">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Pets */}
              <Route
                path="/pets"
                element={<PetHome pets={petData} />}
              />

              {/* Adoption */}
              <Route
                path="/adoption"
                element={<AdoptionForm />}
              />
              <Route
                path="/adoption/login"
                element={<Login />}
              />
              <Route
                path="/adoption/register"
                element={<Register />}
              />

              {/* Shelters */}
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

              {/* Rescue */}
              <Route
                path="/rescue"
                element={<RescueRequest />}
              />

              {/* Community */}
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

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
