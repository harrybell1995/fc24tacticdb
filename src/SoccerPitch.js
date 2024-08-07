import React from 'react';
import './SoccerPitch.css'; // Import CSS for styling the pitch

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
                data-role={role || 'No Role'}
                data-focus={focus || 'No Focus'}
              >
                {position.match(/\((.*?)\)/)[1]} {/* Display only the abbreviation */}
              </div>
            )
          );
        })}
      </div>
    </div>
  ); 
};

export default SoccerPitch;
