import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="Nav_bar">
      <div className="nav-links">
        <Link to="/">Create Tactic</Link>
        <Link to="/random-tactics">View Random Tactics</Link>
        <Link to="/search">Search Tactics</Link>
      </div>
      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </nav>
  );
};

export default Nav_bar;