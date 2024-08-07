import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch';

const DetailsPage = () => {
  const { tacticsharecode } = useParams();
  const [tactic, setTactic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTactic = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('testtable')
          .select('*')
          .eq('tacticsharecode', tacticsharecode);

        if (error) throw error;

        if (data.length === 0) {
          setError('No tactic found with the given share code.');
        } else if (data.length > 1) {
          setError('Multiple tactics found with the given share code.');
        } else {
          setTactic(data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTactic();
  }, [tacticsharecode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!tactic) return <p>No tactic found</p>;

  // Ensure that tactic.positions is parsed correctly
  const positions = typeof tactic.positions === 'string' ? JSON.parse(tactic.positions) : tactic.positions;

  // Convert positions array to an object for SoccerPitch component
  const positionsObject = positions.reduce((acc, { position }) => {
    acc[position] = true;
    return acc;
  }, {});

  return (
    <div>
      <h1>Tactic Details</h1>
      <p><strong>Manager:</strong> {tactic.manager}</p>
      <p><strong>Year:</strong> {tactic.year}</p>
      <p><strong>Formation:</strong> {tactic.formation}</p>
      <p><strong>Tactic Share Code:</strong> {tactic.tacticsharecode}</p>
      <p><strong>Club:</strong> {tactic.club}</p>

      <h2>Player Roles and Positions:</h2>
      {/* Render the SoccerPitch component */}
      <SoccerPitch selectedPositions={positionsObject} />

      <h2>Formation:</h2>
      <pre>{tactic.formation}</pre>
    </div>
  );
};

export default DetailsPage;
