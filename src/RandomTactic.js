import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const RandomPosition = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomPosition = async () => {
    try {
      setLoading(true);

      // Fetch all rows from the table
      const { data, error } = await supabase
        .from('testtable')
        .select('*');

      if (error) throw error;

      // Ensure there's at least one row
      if (data.length > 0) {
        // Get a random index
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
    fetchRandomPosition();
  }, []);

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
      <button onClick={fetchRandomPosition}>Get Another Random Position</button>
    </div>
  );
};

export default RandomPosition;
