import React, { useState } from 'react';
import './Autocomplete.css'; // Make sure to add CSS for styling

const Autocomplete = ({ suggestions = [], onSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    setFilteredSuggestions(
      filterSuggestions(userInput, suggestions)
    );
    setShowSuggestions(true);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const filterSuggestions = (query, suggestions) => {
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="autocomplete-container" onBlur={handleBlur} tabIndex="0">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="autocomplete-suggestion"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
