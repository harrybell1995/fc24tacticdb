import React, { useState } from 'react';
import supabase from './supabaseClient'; // Adjust the import if needed
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const SearchTactics = () => {
  const [manager, setManager] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('testtable')
        .select('*')
        .ilike('manager', `%${manager}%`)
        .or(`year.eq.${year}`);

      if (error) throw error;

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-tactics">
      <h1>Search Tactics</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="manager">Manager Name:</label>
          <input
            type="text"
            id="manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="results">
        {results.map((tactic, index) => (
          <div key={index} className="tactic-result">
            <h2>Tactic from {tactic.manager} ({tactic.year})</h2>
            <SoccerPitch selectedPositions={JSON.parse(tactic.positions)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTactics;
