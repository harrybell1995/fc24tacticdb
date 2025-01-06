import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search-tactics?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <button className="hamburger-menu" onClick={handleMenuToggle}>
        &#9776;
      </button>

      <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create Tactic</Link>
        <Link to="/random-tactics" className="nav-link">Tactics List</Link>
        <Link to="/decades/2020s" className="nav-link">Decades</Link>
        <section className="search-box">
          <input
            type="text"
            placeholder="Search team, tactic, manager, or league..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </section>
      </div>

      <button className="night-mode-icon" onClick={toggleDarkMode}>
        {darkMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar;
