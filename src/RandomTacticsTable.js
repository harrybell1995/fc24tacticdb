import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Adjust the import if needed
import './RandomTacticsTable.css'; // Ensure you import the CSS for styling

const RandomTacticsTable = () => {
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 20;

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
        .select('manager, year, tacticsharecode, formation, club, tacticname, votes') // Use lowercase 'tacticsharecode'
        .limit(100); // Fetch more than needed for pagination

      if (error) throw error;

      // Shuffle and paginate data
      const shuffledData = shuffleArray(data);
      const totalItems = shuffledData.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      const paginatedData = shuffledData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      setTactics(paginatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomTactics();
  }, [currentPage]);

  // Function to determine the decade class
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

  // Handlers for pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="random-tactics-table">
      <h1>Random Tactics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Tactic Name</th>
                <th>Manager</th>
                <th>Formation</th>
                <th>Year</th>
                <th>Tactic Share Code</th>
                <th>Club</th>
                <th>Link</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {tactics.map((tactic, index) => (
                <tr key={index}>
                  <td>{tactic.tacticname}</td>
                  <td>{tactic.manager}</td>
                  <td>{tactic.formation}</td>
                  <td className="year-cell">
                    <span className={`year-span ${getYearClass(tactic.year)}`}>
                      {tactic.year}
                    </span>
                  </td>
                  <td className="share-code">{tactic.tacticsharecode}</td>
                  <td>{tactic.club}</td>
                  <td><a href={`/details/${tactic.tacticsharecode}`}>Details</a></td>
                  <td>{tactic.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomTacticsTable;
