import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SoccerPositionForm from './SoccerPositionForm';
import RandomPosition from './RandomPosition';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/random">Random Position</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SoccerPositionForm />} />
        <Route path="/random" element={<RandomPosition />} />
      </Routes>
    </Router>
  );
};

export default App;
