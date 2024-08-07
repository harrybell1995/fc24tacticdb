import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';
import SearchTactics from './SearchTactics';
import RandomTacticsTable from './RandomTacticsTable';
import TacticsTable from './TacticsTable';
import DetailsPage from './DetailsPage';
import Navbar from './Navbar';
import './styles.css'; // Make sure to import your CSS file

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div>
        <Routes>
          <Route path="/" element={<SoccerPositionForm />} />
          <Route path="/random-position" element={<RandomPosition />} />
          <Route path="/search" element={<SearchTactics />} />
          <Route path="/random-tactics" element={<RandomTacticsTable />} />
          <Route path="/details/:tacticsharecode" element={<DetailsPage />} />
          <Route path="/" exact element={<TacticsTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
