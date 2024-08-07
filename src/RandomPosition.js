import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const RandomPosition = () => {
  const [randomPosition, setRandomPosition] = useState(null);

  const fetchRandomPosition = async () => {
    try {
      const { data, error } = await supabase
        .from('testtable')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomPosition(data[randomIndex].text);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchRandomPosition();
  }, []);

  return (
    <div>
      <h1>Random Soccer Position List</h1>
      {randomPosition ? (
        <p>{randomPosition}</p>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchRandomPosition}>Get Another Random Position</button>
    </div>
  );
};

export default RandomPosition;
