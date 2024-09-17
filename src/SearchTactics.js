// src/SearchTactics.js

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import supabase from './supabaseClient'; // Adjust the import if needed

const SearchTactics = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  const getYearClass = (year) => {
    const decade = Math.floor(year / 10) * 10;
    if (year >= 1880 && year < 1900) return 'year-1880s';
    if (year >= 1900 && year < 1910) return 'year-1900s';
    if (year >= 1910 && year < 1920) return 'year-1910s';
    if (year >= 1920 && year < 1930) return 'year-1920s';
    if (year >= 1930 && year < 1940) return 'year-1930s';
    if (year >= 1940 && year < 1950) return 'year-1940s';
    if (year >= 1950 && year < 1960) return 'year-1950s';
    if (year >= 1960 && year < 1970) return 'year-1960s';
    if (year >= 1970 && year < 1980) return 'year-1970s';
    if (year >= 1980 && year < 1990) return 'year-1980s';
    if (year >= 1990 && year < 2000) return 'year-1990s';
    if (year >= 2000 && year < 2010) return 'year-2000s';
    if (year >= 2010 && year < 2020) return 'year-2010s';
    if (year >= 2020 && year < 2030) return 'year-2020s';
    if (year >= 2030) return 'year-2030s';
    return '';
  };

  useEffect(() => {
    const searchTactics = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('testtable')
          .select('*')
          .or(
            `manager.ilike.%${query}%,tacticsharecode.ilike.%${query}%,tacticname.ilike.%${query}%,formation.ilike.%${query}%,club.ilike.%${query}%,clubcountry.ilike.%${query}%,league.ilike.%${query}%`
          );

        if (error) throw error;

        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchTactics();
  }, [query]);

  return (
    <div className="search-tactics">
      <h1>Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {results.length === 0 && !loading && <p>No results found.</p>}
      
      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Manager</th>
              <th>Year</th>
              <th>Formation</th>
              <th>Club</th>
              <th>League</th>
              <th>Tactic Share Code</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((tactic) => (
              <tr key={tactic.id}>
                <td>{tactic.manager}</td>
                <td className={`year-span ${getYearClass(tactic.year)}`}>
                  {tactic.year}
                </td>
                <td>{tactic.formation}</td>
                <td>{tactic.club}</td>
                <td>{tactic.league}</td>
                <td>{tactic.tacticsharecode}</td>
                <td>
                  <Link to={`/details/${tactic.tacticsharecode}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchTactics;
