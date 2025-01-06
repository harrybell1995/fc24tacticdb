import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient'; // Adjust the import if needed
import './RandomTacticsTable.css'; // Ensure you import the CSS for styling
import { useParams, Link } from 'react-router-dom';

// Define your options here
const DECADES = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

const FormationsByDecade = () => {
  const { decade } = useParams(); // Get the decade from the URL
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch formations
  const fetchFormations = async () => {
    try {
      setLoading(true);
      setError(null);

      const startYear = parseInt(decade.split('s')[0]);
      const endYear = startYear + 9;

      const { data, error } = await supabase
        .from('testtable') // Use the correct table name
        .select('manager, year, tacticsharecode, formation, club') // Adjust fields as needed
        .gte('year', startYear)
        .lte('year', endYear)
        .range((currentPage - 1) * 25, currentPage * 25 - 1); // Pagination logic

      if (error) throw error;

      const totalCountResult = await supabase
        .from('testtable') // Use the correct table name
        .select('*', { count: 'exact', head: true })
        .gte('year', startYear)
        .lte('year', endYear);

      setTotalPages(Math.ceil(totalCountResult.count / 25));
      setFormations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, [decade, currentPage]);

  // Pagination buttons
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div className="random-tactics-table">
      <h1>Formations from the {decade}</h1>
      <div className="decade-selector">
        {DECADES.map((dec) => (
          <Link
            key={dec}
            to={`/decades/${dec}`}
            className={`decade-button ${decade === dec ? 'active' : ''}`}
          >
            {dec}
          </Link>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error} </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Manager</th>
              <th>Formation</th>
              <th>Year</th>
              <th>Tactic Share Code</th>
              <th>Club</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((formation, index) => (
              <tr key={index}>
                <td>{formation.manager}</td>
                <td>{formation.formation}</td>
                <td className="year-cell">
                  <span className={`year-span ${getYearClass(formation.year)}`}>
                    {formation.year}
                  </span>
                </td>
                <td className="share-code">{formation.tacticsharecode}</td>
                <td>{formation.club}</td>
                <td>
                  <Link to={`/details/${formation.tacticsharecode}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormationsByDecade;
