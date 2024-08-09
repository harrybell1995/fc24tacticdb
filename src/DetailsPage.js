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
  const positionsObject = positions.reduce((acc, { position, role, focus }) => {
    acc[position] = { role, focus };
    return acc;
  }, {});

  // Define colors for each position
  const getPositionColor = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.2)'; // Red
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.2)'; // Orange
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.2)'; // Green
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.2)'; // Blue
    return 'rgba(0, 0, 0, 0.1)'; // Default light gray
  };

  return (
    <div className="details-page-container">
      <div className="tactic-content">
        <div className="tactic-details">
          <div className="detail-box">
            <span className="primary-text">{tactic.manager}</span>
            <span className="secondary-text">Manager</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.year}</span>
            <span className="secondary-text">Year</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.formation}</span>
            <span className="secondary-text">Formation</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.club}</span>
            <span className="secondary-text">Club</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.clubcountry}</span>
            <span className="secondary-text">Club Country</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.league}</span>
            <span className="secondary-text">League</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.tacticalpreset}</span>
            <span className="secondary-text">Tactical Preset</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.buildupstyle}</span>
            <span className="secondary-text">Build-up Style</span>
          </div>
          <div className="detail-box">
            <span className="primary-text">{tactic.defensiveapproach}</span>
            <span className="secondary-text">Defensive Approach</span>
          </div>
          <div className="detail-box">
            <div className="tactic-share-code">
              <span className="primary-text">{tactic.tacticsharecode}</span>
              <span className="secondary-text">Tactic Share Code</span>
            </div>
          </div>
        </div>
      {/* Positions Display */}
      <div className="positions-display">
        {Object.keys(positionsObject).map((position) => {
          const { role, focus } = positionsObject[position];
          return (
            <div
              key={position}
              className="position-info"
              style={{
                backgroundColor: getPositionColor(position),
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              <div className="position-abbreviation">
                {position.match(/\((.*?)\)/)[1]} {/* Display only the abbreviation */}
              </div>
              <div className="position-role">
                Role: {role + "  " || 'No Role'}
                Focus: {focus || 'No Focus'}
              </div>
              <div className="position-focus">
                
              </div>
              
            </div>
            
          );
        })}
      </div>      <div className="tactic-pitch">
          <SoccerPitch selectedPositions={positionsObject} />
        </div>

      </div>

    </div>
  );
};

export default DetailsPage;
