import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch';
import './SoccerPositionForm.css';

const DetailsPage = () => {
  const { tacticsharecode } = useParams();
  const [tactic, setTactic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pitch'); // Default to 'pitch'

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

  let positions = typeof tactic.positions === 'string' ? JSON.parse(tactic.positions) : tactic.positions;

  if (typeof positions !== 'object' || Array.isArray(positions)) {
    console.error("Expected 'positions' to be an object but got:", positions);
    positions = {}; // Set default to empty object
  }

  const positionsObject = Object.keys(positions).reduce((acc, position) => {
    const roles = positions[position];
    acc[position] = { role: roles[0] || 'No Role', focus: roles[1] || 'No Focus' };
    return acc;
  }, {});

  const getPositionColor = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.2)';
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.2)';
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.2)';
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.2)';
    return 'rgba(0, 0, 0, 0.1)';
  };

  return (
  <div className="soccer-position-form-container">
    <div className="tactic-row-thingy">

      {activeTab === 'pitch' && (
        <div className="pitch-section">
          <SoccerPitch selectedPositions={positionsObject} />
        </div>
      )}

      {activeTab === 'positions' && (
        <div className="sidebar">
          {Object.keys(positionsObject).map((position) => {
            const { role, focus } = positionsObject[position];
            return (
              <div
                key={position}
                className="position-info"
                style={{
                  backgroundColor: getPositionColor(position),
                }}
              >
                <div className="position-abbreviation">
                  {position.match(/\((.*?)\)/)[1]}
                </div>
                <div className="position-role">
                  Role: {role}
                </div>
                <div className="position-focus">
                  Focus: {focus}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="sidebar">
      <div className="view-toggle-width">
        <div className="view-toggle">
          <div className={`tab ${activeTab === 'pitch' ? 'active' : ''}`} onClick={() => setActiveTab('pitch')}>
            Pitch
          </div>
          <div className={`tab ${activeTab === 'positions' ? 'active' : ''}`} onClick={() => setActiveTab('positions')}>
            Positions
          </div>
        </div>
      </div>

        <div className="tactic-details">
          <ul className="tactic-details-list">
            <li><strong>Manager Name:</strong> {tactic.manager}</li>
            <li><strong>Year:</strong> {tactic.year}</li>
            <li><strong>Formation:</strong> {tactic.formation}</li>
            <li><strong>Club:</strong> {tactic.club}</li>
            <li><strong>Club Country:</strong> {tactic.clubcountry}</li>
            <li><strong>League:</strong> {tactic.league}</li>
            <li><strong></strong> {tactic.notes}</li>
            <li><strong>Tactical Preset:</strong> {tactic.tacticalpreset}</li>
            <li><strong>Build-up Style:</strong> {tactic.buildupstyle}</li>
            <li><strong>Defensive Approach:</strong> {tactic.defensiveapproach}</li>
            <li><strong>Tactic Share Code:</strong> {tactic.tacticsharecode}</li>
          </ul>
        </div>
      </div>
      </div>
      </div>
    );
};

export default DetailsPage;
