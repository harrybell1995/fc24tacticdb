import React, { useState } from 'react';
import supabase from './supabaseClient';

const SoccerPositionForm = () => {
  const positions = [
    'Goalkeeper', 'Right Back', 'Left Back', 'Center Back',
    'Defensive Midfielder', 'Right Midfielder', 'Left Midfielder',
    'Center Midfielder', 'Attacking Midfielder', 'Right Winger',
    'Left Winger', 'Striker'
  ];

  const [selectedPositions, setSelectedPositions] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedPositions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPositionsList = Object.keys(selectedPositions).filter((key) => selectedPositions[key]);
    const selectedPositionsJSON = JSON.stringify(selectedPositionsList);

    try {
      const { data, error } = await supabase
        .from('testtable') // Ensure the table name is correct
        .insert([{ text: selectedPositionsJSON }]); // Insert the JSON list into the 'text' column

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        // Reset checkboxes after successful insertion
        setSelectedPositions({});
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Select Soccer Positions:</legend>
        {positions.map((position) => (
          <div key={position}>
            <label>
              <input
                type="checkbox"
                name={position}
                checked={selectedPositions[position] || false}
                onChange={handleCheckboxChange}
              />
              {position}
            </label>
          </div>
        ))}
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SoccerPositionForm;
