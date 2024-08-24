import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';
import SearchTactics from './SearchTactics';
import HomePage from './HomePage'; // Import the new HomePage component
import FormationsByDecade from './FormationsByDecade';
import DetailsPage from './DetailsPage';
import Navbar from './Navbar'; // Import the Navbar component
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
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Include Navbar here */}
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

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
