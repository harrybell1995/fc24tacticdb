import React from 'react';
import './SoccerPitch.css'; // Import CSS for styling the pitch

const SoccerPitch = ({ selectedPositions }) => {
    const positionStyles = {
        'Goalkeeper (GK)': { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
        'Center Back (CB)': { bottom: '30%', left: '50%', transform: 'translateX(-50%)' },
        'Left Center Back (LCB)': { bottom: '30%', left: '30%' },
        'Right Center Back (RCB)': { bottom: '30%', right: '30%' },
        'Left Back (LB)': { bottom: '33%', left: '15%' },
        'Right Back (RB)': { bottom: '33%', right: '15%' },
        'Defensive Midfielder (CDM)': { bottom: '40%', left: '50%', transform: 'translateX(-50%)' },
        'Left Defensive Midfielder (LDM)': { bottom: '40%', left: '35%' },
        'Right Defensive Midfielder (RDM)': { bottom: '40%', right: '35%' },
        'Central Midfielder (CM)': { bottom: '50%', left: '50%', transform: 'translateX(-50%)' },
        'Left Central Midfielder (LCM)': { bottom: '50%', left: '35%' },
        'Left Midfielder (LM)': { bottom: '53%', left: '15%' },
        'Right Midfielder (RM)': { bottom: '53%', right: '15%' },
        'Right Central Midfielder (RCM)': { bottom: '50%', right: '35%' },
        'Attacking Midfielder (CAM)': { bottom: '60%', left: '50%', transform: 'translateX(-50%)' },
        'Left Attacking Midfielder (LCAM)': { bottom: '60%', left: '30%' },
        'Right Attacking Midfielder (RCAM)': { bottom: '60%', right: '30%' },
        'Left Winger (LW)': { bottom: '70%', left: '20%' },
        'Right Winger (RW)': { bottom: '70%', right: '20%' },
        'Striker (ST)': { bottom: '80%', left: '50%', transform: 'translateX(-50%)' },
        'Left Striker (LST)': { bottom: '80%', left: '30%' },
        'Right Striker (RST)': { bottom: '80%', right: '30%' }
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
