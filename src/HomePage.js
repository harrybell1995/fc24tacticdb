// src/HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from './supabaseClient';
import './HomePage.css';
import logo from './assets/logo.png'; // Relative to the `src` folder

const HomePage = () => {
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedTactics, setDisplayedTactics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Function to shuffle array elements
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchTactics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch a larger set of rows from the table
      const { data, error } = await supabase
        .from('testtable')
        .select('*')
        .limit(5); // Fetch 5 tactics to rotate through

      if (error) throw error;

      setTactics(data);
      if (data.length > 0) {
        setDisplayedTactics(data.slice(0, 3)); // Initial display of first 3 tactics
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTactics();
  }, []);

  useEffect(() => {
    // Rotate tactics every 5 seconds
    const interval = setInterval(() => {
      if (tactics.length > 0) {
        const nextIndex = (currentIndex + 1) % tactics.length;
        const newTactics = [
          tactics[nextIndex % tactics.length],
          tactics[(nextIndex + 1) % tactics.length],
          tactics[(nextIndex + 2) % tactics.length]
        ];
        setDisplayedTactics(newTactics);
        setCurrentIndex(nextIndex);
      }
    }, 5000); // Change tactics every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [tactics, currentIndex]);

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
    <div className="home-page">

      <section className="hero-section">
        <img src={logo} alt="FCTACTICDB Hero" className="hero-image" />
      </section>

      {/* Search Box */}
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

      {/* Featured Tactics Section */}
      <section className="featured-tactics">
        <h2>Featured Tactics</h2>
        {loading ? (
          <p>Loading tactics...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="tactics-grid">
            {displayedTactics.map((tactic, index) => (
              <div key={index} className="tactic-card">
                <h3>{tactic.manager ? tactic.manager : 'Unknown'}'s {tactic.formation ? tactic.formation : 'Unknown'}</h3>
                <p><strong>Year:</strong> {tactic.year ? tactic.year : 'Unknown'}</p>
                <p><strong>Club:</strong> {tactic.club ? tactic.club : 'Unknown'}</p>
                <p><strong>Description:</strong> {tactic.notes ? tactic.notes : 'Unknown'}</p>
                <Link to={`/details/${tactic.tacticsharecode}`} className="details-link">View Details</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2>Explore More Tactics</h2>
        <Link to="/random-tactics" className="cta-button">View All Tactics</Link>
      </section>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
