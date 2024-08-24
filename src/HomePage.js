import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Adjust the import if needed
import './HomePage.css'; // Ensure you import the CSS for styling
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to shuffle array elements
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchRandomTactics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch a larger set of rows from the table
      const { data, error } = await supabase
        .from('testtable')
        .select('manager, year, tacticsharecode, formation, club') // Use lowercase 'tacticsharecode'
        .limit(10); // Fetch more than 3 to shuffle

      if (error) throw error;

      // Shuffle and select 3 random entries
      const shuffledData = shuffleArray(data).slice(0, 3);
      setTactics(shuffledData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomTactics();
  }, []);

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to FIFA Tactics Hub</h2>
        <p>Your ultimate resource for mastering FIFA tactics.</p>
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
            {tactics.map((tactic, index) => (
              <div key={index} className="tactic-card">
                <h3>{tactic.manager}'s {tactic.formation}</h3>
                <p><strong>Year:</strong> {tactic.year}</p>
                <p><strong>Club:</strong> {tactic.club}</p>
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
      <footer className="footer">
        <p>&copy; 2024 FIFA Tactics Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
