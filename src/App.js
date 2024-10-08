import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';
import SearchTactics from './SearchTactics';
import HomePage from './HomePage';
import FormationsByDecade from './FormationsByDecade';
import DetailsPage from './DetailsPage';
import Navbar from './Navbar';
import RandomTacticsTable from './RandomTacticsTable';

// Import the policy pages
import PrivacyPolicy from './policies/PrivacyPolicy';
import TermsAndConditions from './policies/TermsAndConditions';
import About from './policies/About';
import Contact from './policies/Contact';
import Disclaimer from './policies/Disclaimer';

import './styles.css'; // Import your CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </div>
      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} FCTacticDB. All rights reserved.</p>
        <p>Powered by React</p>
      </div>
    </footer>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decades/:decade" element={<FormationsByDecade />} />
        <Route path="/random-position" element={<RandomPosition />} />
        <Route path="/search" element={<SearchTactics />} />
        <Route path="/search-tactics" element={<SearchTactics />} />
        <Route path="/random-tactics" element={<RandomTacticsTable />} />
        <Route path="/details/:tacticsharecode" element={<DetailsPage />} />
        <Route path="/create" element={<SoccerPositionForm />} />
        
        {/* Policy pages routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
      
      {/* Add Footer here */}
      <Footer />
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    // Track page views with GA4
    window.gtag('config', 'G-DW51TXN6RD', {
      page_path: location.pathname,
    });
  }, [location]);

  return <App />;
}

export default function Main() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
