import React, { useState } from 'react';
import './SoccerPitch.css';

const SoccerPitch = ({ selectedPositions, onPositionClick, selectedPosition, formationName }) => {
  const [expandedPosition, setExpandedPosition] = useState(null);

  const handlePositionClick = (position) => {
    if (expandedPosition === position) {
      setExpandedPosition(null); // Collapse if already selected
    } else {
      setExpandedPosition(position); // Expand the clicked position
    }
    onPositionClick(position);
  };

  // Handle clicks outside the positions to reset expanded state
  const handleClickOutside = () => {
    setExpandedPosition(null);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const positionStyles = {
    'Goalkeeper (GK)': { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
    'Center Back (CB)': { bottom: '25%', left: '50%', transform: 'translateX(-50%)' },
    'Left Center Back (LCB)': { bottom: '25%', left: '25%' },
    'Right Center Back (RCB)': { bottom: '25%', right: '25%' },
    'Left Back (LB)': { bottom: '30%', left: '5%' },
    'Right Back (RB)': { bottom: '30%', right: '5%' },
    'Defensive Midfielder (CDM)': { bottom: '45%', left: '50%', transform: 'translateX(-50%)' },
    'Left Defensive Midfielder (LDM)': { bottom: '45%', left: '25%' },
    'Right Defensive Midfielder (RDM)': { bottom: '45%', right: '25%' },
    'Central Midfielder (CM)': { bottom: '50%', left: '50%', transform: 'translateX(-50%)' },
    'Left Central Midfielder (LCM)': { bottom: '50%', left: '25%' },
    'Left Midfielder (LM)': { bottom: '55%', left: '5%' },
    'Right Midfielder (RM)': { bottom: '55%', right: '5%' },
    'Right Central Midfielder (RCM)': { bottom: '50%', right: '25%' },
    'Attacking Midfielder (CAM)': { bottom: '60%', left: '50%', transform: 'translateX(-50%)' },
    'Left Attacking Midfielder (LCAM)': { bottom: '65%', left: '20%' },
    'Right Attacking Midfielder (RCAM)': { bottom: '65%', right: '20%' },
    'Left Winger (LW)': { bottom: '75%', left: '5%' },
    'Right Winger (RW)': { bottom: '75%', right: '5%' },
    'Striker (ST)': { bottom: '80%', left: '50%', transform: 'translateX(-50%)' },
    'Left Striker (LST)': { bottom: '80%', left: '30%' },
    'Right Striker (RST)': { bottom: '80%', right: '30%' }
  };

  return (
    <div className="soccer-pitch">
      <div className="pitch">
        {/* This is the pitch background with gradient and pattern */}
      </div>
      <div className="positions-container" onClick={(e) => e.stopPropagation()}>
        <div className="formation-name">{formationName}</div>
        {Object.keys(selectedPositions).map((position) => {
          const { role, focus } = selectedPositions[position] || {};
          const isSelected = position === expandedPosition;

          return (
            <div
              key={position}
              className={`position ${isSelected ? 'selected' : ''}`}
              style={positionStyles[position]}
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the outside click
                handlePositionClick(position);
              }}
            >
              <div className="position-info">
                <div className="position-abbreviation">
                  {position.match(/\((.*?)\)/)[1]} {/* Display only the abbreviation */}
                </div>
                <div className="position-details">
                  <span className="role">{role || 'No Role'}</span>
                  <span className="focus">{focus || 'No Focus'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoccerPitch;
