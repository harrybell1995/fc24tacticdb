import './SoccerPitch.css'; // Import CSS for styling the pitch
import React, { useEffect, useState, useRef } from 'react';

const SoccerPitch = ({ selectedPositions }) => {
  const positionStyles = {
    'Goalkeeper (GK)': { bottom: '20%', left: '50%', transform: 'translateX(-50%)' },
    'Center Back (CB)': { bottom: '33%', left: '50%', transform: 'translateX(-50%)' },
    'Left Center Back (LCB)': { bottom: '33%', left: '30%' },
    'Right Center Back (RCB)': { bottom: '33%', right: '30%' },
    'Left Back (LB)': { bottom: '35%', left: '15%' },
    'Right Back (RB)': { bottom: '35%', right: '15%' },
    'Defensive Midfielder (CDM)': { bottom: '43%', left: '50%', transform: 'translateX(-50%)' },
    'Left Defensive Midfielder (LDM)': { bottom: '43%', left: '35%' },
    'Right Defensive Midfielder (RDM)': { bottom: '43%', right: '35%' },
    'Central Midfielder (CM)': { bottom: '53%', left: '50%', transform: 'translateX(-50%)' },
    'Left Central Midfielder (LCM)': { bottom: '53%', left: '35%' },
    'Left Midfielder (LM)': { bottom: '55%', left: '15%' },
    'Right Midfielder (RM)': { bottom: '55%', right: '15%' },
    'Right Central Midfielder (RCM)': { bottom: '53%', right: '35%' },
    'Attacking Midfielder (CAM)': { bottom: '63%', left: '50%', transform: 'translateX(-50%)' },
    'Left Attacking Midfielder (LCAM)': { bottom: '63%', left: '30%' },
    'Right Attacking Midfielder (RCAM)': { bottom: '63%', right: '30%' },
    'Left Winger (LW)': { bottom: '70%', left: '15%' },
    'Right Winger (RW)': { bottom: '70%', right: '15%' },
    'Striker (ST)': { bottom: '73%', left: '50%', transform: 'translateX(-50%)' },
    'Left Striker (LST)': { bottom: '73%', left: '30%' },
    'Right Striker (RST)': { bottom: '73%', right: '30%' }
  };

  const getPositionColor = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.4)';
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.4)';
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.4)';
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.4)';
    return 'rgba(0, 0, 0, 0.2)';
  };
  const getPositionShadow = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.3)';
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.3)';
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.3)';
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.3)';
    return 'rgba(0, 0, 0, 0.2)';
  };
  // Refs for each position card
  const positionRefs = useRef({});

  // Function to check if text is overflowing
  const isTextOverflowing = (element) => {
    return element.scrollWidth > element.clientWidth;
  };

  useEffect(() => {
    // Update refs
    const updateOverflowStatus = () => {
      Object.keys(positionRefs.current).forEach((position) => {
        const element = positionRefs.current[position];
        if (element) {
          element.classList.toggle('long-text', isTextOverflowing(element));
        }
      });
    };

    // Update overflow status on mount and when positions change
    updateOverflowStatus();
    window.addEventListener('resize', updateOverflowStatus);
    return () => window.removeEventListener('resize', updateOverflowStatus);
  }, [selectedPositions]);

  return (
    <div className="soccer-pitch">
      <div className="pitch">
        {Object.keys(positionStyles).map((position) => {
          const { role, focus } = selectedPositions[position] || {};

          return (
            selectedPositions[position] && (
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
                    ref={(el) => positionRefs.current[position] = el}
                  >
                    <span>Role: {role || 'No Role'}</span>
                    <span>Focus: {focus || 'No Focus'}</span>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default SoccerPitch;
