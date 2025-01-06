import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const RandomPosition = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const fetchPaginatedData = async (page = 1) => {
    try {
      setLoading(true);

      // Fetch paginated rows from the table
      const { data, error, count } = await supabase
        .from('testtable')
        .select('*', { count: 'exact' })
        .range((page - 1) * rowsPerPage, page * rowsPerPage - 1);

      if (error) throw error;

      // Update state with paginated data
      setTotalRows(count);
      if (data.length > 0) {
        // Get a random index within the current page's data
        const randomIndex = Math.floor(Math.random() * data.length);
        // Parse the 'positions' JSON and update state
        setPositions(data[randomIndex].positions || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage * rowsPerPage < totalRows) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Random Soccer Position List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <SoccerPitch selectedPositions={positions.reduce((acc, position) => {
          acc[position] = true;
          return acc;
        }, {})} />
      )}
      <button onClick={fetchPaginatedData}>Get Random Position</button>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage} disabled={currentPage * rowsPerPage >= totalRows}>Next</button>
      </div>
    </div>
  );
};

export default RandomPosition;
