import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const RandomPosition = () => {
  const [tactic, setTactic] = useState({ positions: [], year: '', manager: '', tacticShareCode: '' });
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

        // Update state with positions, year, manager, and tacticShareCode
        const positions = JSON.parse(data[randomIndex].positions || '[]');

        setTactic({
          positions: positions,
          year: data[randomIndex].year || '',
          manager: data[randomIndex].manager || '',
          tacticShareCode: data[randomIndex].tacticShareCode || ''
        });
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
      <h1>Random Soccer Tactic</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <SoccerPitch selectedPositions={tactic.positions.reduce((acc, pos) => {
            acc[pos.position] = {
              role: pos.role,
              focus: pos.focus
            };
            return acc;
          }, {})} />
          <div>
            <h2>Details</h2>
            <p><strong>Year:</strong> {tactic.year}</p>
            <p><strong>Manager:</strong> {tactic.manager}</p>
            <p><strong>Tactic Share Code:</strong> {tactic.tacticShareCode}</p>
          </div>
        </>
      )}
      <button onClick={fetchRandomPosition}>Get Another Random Tactic</button>
    </div>
  );
};

export default RandomPosition;
