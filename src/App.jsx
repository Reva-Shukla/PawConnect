import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import WelcomeAuthModal from './components/WelcomeAuthModal';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner'; // Cookie Consent Banner
import { FavoritesProvider } from './context/FavoritesContext';

import Home from './pages/Home';

import ContactUs from './pages/adoption/ContactUs';
import HelpCenter from './pages/adoption/HelpCenter';

import Gallery from './pages/community/Gallery';
import Reviews from './pages/community/Reviews';
import Supplies from './pages/community/Supplies';
import Donations from './pages/community/Donations';

import PetHome from './pages/pets/PetHome';
import PetList from './pages/pets/PetList';
import PetDetails from './pages/pets/PetDetails';

import AdoptionForm from './pages/adoption/AdoptionForm';
import Login from './pages/adoption/Login';
import Register from './pages/adoption/Register';
import Dashboard from './pages/adoption/Dashboard';

import ShelterDashboard from './pages/shelter/ShelterDashboard';
import ShelterList from './pages/shelter/ShelterList';
import Foster from './pages/shelter/Foster';
import RescueRequest from './pages/shelter/RescueRequest';

import PrivacyPolicy from './pages/PrivacyPolicy'; // Privacy Policy Page
import TermsOfService from './pages/TermsOfService'; // Terms of Service Page
import NotFound from './pages/NotFound'; // 404 Page

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="paw-app-container">
          <Navbar />
          <WelcomeAuthModal />

          <main className="paw-main-content">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Pets */}
              <Route path="/pets" element={<PetHome />} />
              <Route path="/pet-list" element={<PetList />} />
              <Route path="/pets/:id" element={<PetDetails />} />

              {/* Adoption */}
              <Route path="/adoption" element={<AdoptionForm />} />
              <Route path="/adoption/login" element={<Login />} />
              <Route path="/adoption/register" element={<Register />} />
              <Route path="/adoption/dashboard" element={<Dashboard />} />

              {/* Shelters */}
              <Route
                path="/shelters"
                element={<ShelterDashboard />}
              />
              <Route path="/shelters/list" element={<ShelterList />} />
              <Route path="/shelters/foster" element={<Foster />} />
              <Route path="/shelters/rescue" element={<RescueRequest />} />

              {/* Rescue */}
              <Route path="/rescue" element={<RescueRequest />} />

              {/* Community */}
              <Route
                path="/community"
                element={
                  <Navigate to="/community/gallery" replace />
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

              {/* Also support shorter community URLs */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/supplies" element={<Supplies />} />
              <Route path="/donations" element={<Donations />} />

              {/* Support Routes */}
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/help" element={<HelpCenter />} />

              {/* Legal / Policy Routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Cookie Banner */}
          <CookieBanner />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;