// src/SingleFieldForm.js
import React, { useState } from 'react';
import supabase from './supabaseClient';

const SingleFieldForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('testtable') // Ensure the table name is correct
        .insert([{ text: inputValue }]); // Insert into the 'text' column

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setInputValue(''); // Clear the input field after successful insertion
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputField">Text:</label>
      <input
        type="text"
        id="inputField"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SingleFieldForm;
