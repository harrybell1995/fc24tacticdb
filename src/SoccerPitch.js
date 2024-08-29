import './SoccerPitch.css';
import React, { useEffect, useRef } from 'react';

const SoccerPitch = ({ selectedPositions }) => {
  useEffect(() => {
    console.log("Selected Positions:", selectedPositions);
  }, [selectedPositions]);

  const positionStyles = {
    'Goalkeeper (GK)': { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
    'Center Back (CB)': { bottom: '25%', left: '50%', transform: 'translateX(-50%)' },
    'Left Center Back (LCB)': { bottom: '25%', left: '25%' },
    'Right Center Back (RCB)': { bottom: '25%', right: '25%' },
    'Left Back (LB)': { bottom: '30%', left: '10%' },
    'Right Back (RB)': { bottom: '30%', right: '10%' },
    'Defensive Midfielder (CDM)': { bottom: '40%', left: '50%', transform: 'translateX(-50%)' },
    'Left Defensive Midfielder (LDM)': { bottom: '40%', left: '20%' },
    'Right Defensive Midfielder (RDM)': { bottom: '40%', right: '20%' },
    'Central Midfielder (CM)': { bottom: '50%', left: '50%', transform: 'translateX(-50%)' },
    'Left Central Midfielder (LCM)': { bottom: '50%', left: '25%' },
    'Left Midfielder (LM)': { bottom: '60%', left: '10%' },
    'Right Midfielder (RM)': { bottom: '60%', right: '10%' },
    'Right Central Midfielder (RCM)': { bottom: '50%', right: '25%' },
    'Attacking Midfielder (CAM)': { bottom: '65%', left: '50%', transform: 'translateX(-50%)' },
    'Left Attacking Midfielder (LCAM)': { bottom: '65%', left: '20%' },
    'Right Attacking Midfielder (RCAM)': { bottom: '65%', right: '20%' },
    'Left Winger (LW)': { bottom: '75%', left: '10%' },
    'Right Winger (RW)': { bottom: '75%', right: '10%' },
    'Striker (ST)': { bottom: '80%', left: '50%', transform: 'translateX(-50%)' },
    'Left Striker (LST)': { bottom: '80%', left: '30%' },
    'Right Striker (RST)': { bottom: '80%', right: '30%' }
  };

  const positionRefs = useRef({});

  return (
    <div className="soccer-pitch">
      <div className="pitch">
        {selectedPositions &&
          Object.keys(selectedPositions).map((position) => {
            const { role, focus } = selectedPositions[position] || {};

            return (
              <div
                key={position}
                className="position"
                style={positionStyles[position]}
              >
                <div className="position-info">
                  <div className="position-abbreviation">
                    {position.match(/\((.*?)\)/)[1]} {/* Display only the abbreviation */}
                  </div>
                  <div className="position-separator"></div>
                  <div
                    className="carousel-text"
                    ref={(el) => (positionRefs.current[position] = el)}
                  >
                    <span>Role: {role || 'No Role'}</span>
                    <span>Focus: {focus || 'No Focus'}</span>
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
