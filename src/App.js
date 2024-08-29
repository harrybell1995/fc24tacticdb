import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';
import SearchTactics from './SearchTactics';
import HomePage from './HomePage';
import FormationsByDecade from './FormationsByDecade';
import DetailsPage from './DetailsPage';
import Navbar from './Navbar';
import RandomTacticsTable from './RandomTacticsTable';

import './styles.css'; // Import your CSS file

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
        <Route path="/random-tactics" element={<RandomTacticsTable />} />
        <Route path="/details/:tacticsharecode" element={<DetailsPage />} />
        <Route path="/create" element={<SoccerPositionForm />} />
      </Routes>
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
