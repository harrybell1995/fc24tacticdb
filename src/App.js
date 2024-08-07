import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SoccerPositionForm />} />
        <Route path="/random-position" element={<RandomPosition />} />
      </Routes>
    </Router>
  );
}

export default App;
