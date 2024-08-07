import React from 'react';
import { Link } from 'react-router-dom';

const TacticsTable = ({ tactics }) => {
  return (
    <table id="randomTacticsTable">
      <thead>
        <tr>
          <th>Manager</th>
          <th>Formation</th>
          <th>Year</th>
          <th>Tactic Share Code</th>
          <th>Club</th>
          <th>Details</th> {/* New column */}
        </tr>
      </thead>
      <tbody>
        {tactics.map((tactic, index) => (
          <tr key={index}>
            <td>{tactic.manager}</td>
            <td>{tactic.formation}</td>
            <td>{tactic.year}</td>
            <td>{tactic.tacticsharecode}</td>
            <td>{tactic.club}</td>
            <td>
              <Link to={`/details/${tactic.tacticsharecode}`} className="details-link">
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TacticsTable;
