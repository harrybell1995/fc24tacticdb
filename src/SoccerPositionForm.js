import React, { useState } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const positions = [
  'Goalkeeper (GK)',
  'Center Back (CB)',
  'Left Center Back (LCB)',
  'Right Center Back (RCB)',
  'Left Back (LB)',
  'Right Back (RB)',
  'Defensive Midfielder (CDM)',
  'Left Defensive Midfielder (LDM)',
  'Right Defensive Midfielder (RDM)',
  'Central Midfielder (CM)',
  'Left Central Midfielder (LCM)',
  'Right Central Midfielder (RCM)',
  'Attacking Midfielder (CAM)',
  'Left Attacking Midfielder (LCAM)',
  'Right Attacking Midfielder (RCAM)',
  'Left Midfielder (LM)',
  'Right Midfielder (RM)',
  'Left Winger (LW)',
  'Right Winger (RW)',
  'Striker (ST)',
  'Left Striker (LST)',
  'Right Striker (RST)',
];

const roles = {
  'Goalkeeper (GK)': ['Goalkeeper', 'Sweeper Keeper'],
  'Center Back (CB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
  'Left Center Back (LCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
  'Right Center Back (RCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
  'Left Back (LB)': ['Fullback', 'Wingback'],
  'Right Back (RB)': ['Fullback', 'Wingback'],
  'Defensive Midfielder (CDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
  'Left Defensive Midfielder (LDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
  'Right Defensive Midfielder (RDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
  'Central Midfielder (CM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
  'Left Central Midfielder (LCM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
  'Right Central Midfielder (RCM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
  'Attacking Midfielder (CAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
  'Left Attacking Midfielder (LCAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
  'Right Attacking Midfielder (RCAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
  'Left Midfielder (LM)': ['Winger', 'Wide Midfielder', 'Wide Playmaker', 'Inside Forward'],
  'Right Midfielder (RM)': ['Winger', 'Wide Midfielder', 'Wide Playmaker', 'Inside Forward'],
  'Left Winger (LW)': ['Winger', 'Inside Forward', 'Wide Playmaker'],
  'Right Winger (RW)': ['Winger', 'Inside Forward', 'Wide Playmaker'],
  'Striker (ST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward'],
  'Left Striker (LST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward'],
  'Right Striker (RST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward'],
};

const focuses = {
  'Goalkeeper (GK)': ['Defend', 'Balanced'],
  'Center Back (CB)': ['Defend', 'Balanced', 'Build-Up'],
  'Left Center Back (LCB)': ['Defend', 'Balanced', 'Build-Up'],
  'Right Center Back (RCB)': ['Defend', 'Balanced', 'Build-Up'],
  'Left Back (LB)': ['Defend', 'Balanced'],
  'Right Back (RB)': ['Defend', 'Balanced'],
  'Defensive Midfielder (CDM)': ['Defend', 'Roaming'],
  'Left Defensive Midfielder (LDM)': ['Defend', 'Roaming'],
  'Right Defensive Midfielder (RDM)': ['Defend', 'Roaming'],
  'Central Midfielder (CM)': ['Balanced', 'Attack', 'Roaming'],
  'Left Central Midfielder (LCM)': ['Balanced', 'Attack', 'Roaming'],
  'Right Central Midfielder (RCM)': ['Balanced', 'Attack', 'Roaming'],
  'Attacking Midfielder (CAM)': ['Balanced', 'Attack'],
  'Left Attacking Midfielder (LCAM)': ['Balanced', 'Attack'],
  'Right Attacking Midfielder (RCAM)': ['Balanced', 'Attack'],
  'Left Midfielder (LM)': ['Balanced', 'Attack'],
  'Right Midfielder (RM)': ['Balanced', 'Attack'],
  'Left Winger (LW)': ['Balanced', 'Attack'],
  'Right Winger (RW)': ['Balanced', 'Attack'],
  'Striker (ST)': ['Attack', 'Balanced', 'Wide'],
  'Left Striker (LST)': ['Attack', 'Balanced', 'Wide'],
  'Right Striker (RST)': ['Attack', 'Balanced', 'Wide'],
};

const SoccerPositionForm = () => {
  const [selectedPositions, setSelectedPositions] = useState({});
  const [rolesState, setRolesState] = useState({});
  const [focusesState, setFocusesState] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPositions((prevSelected) => ({
      ...prevSelected,
      [name]: checked ? { role: 'Default', focus: 'Balanced' } : undefined,
    }));
  };

  const handleRoleChange = (event, position) => {
    const { value } = event.target;
    setRolesState((prevRoles) => ({
      ...prevRoles,
      [position]: value,
    }));
  };

  const handleFocusChange = (event, position) => {
    const { value } = event.target;
    setFocusesState((prevFocuses) => ({
      ...prevFocuses,
      [position]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedPositionsList = Object.keys(selectedPositions)
      .filter((key) => selectedPositions[key])
      .map((position) => ({
        position,
        role: rolesState[position] || 'Default',
        focus: focusesState[position] || 'Balanced',
      }));

    const selectedPositionsJSON = JSON.stringify(selectedPositionsList);

    // Example values for manager and year, replace with actual form inputs if needed
    const manager = 'Manager Name'; // Replace with actual value
    const year = '2024'; // Replace with actual value

    try {
      const { data, error } = await supabase
        .from('testtable')
        .insert([{ positions: selectedPositionsJSON, manager, year }]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setSelectedPositions({});
        setRolesState({});
        setFocusesState({});
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%' }}>
        <h1>Select Soccer Positions</h1>
        <form onSubmit={handleSubmit}>
          {positions.map((position) => (
            <div key={position} style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  name={position}
                  checked={selectedPositions[position] || false}
                  onChange={handleCheckboxChange}
                />
                {position}
              </label>
              {selectedPositions[position] && (
                <>
                  <div>
                    <label>
                      Role:
                      <select
                        value={rolesState[position] || 'Default'}
                        onChange={(e) => handleRoleChange(e, position)}
                      >
                        {(roles[position] || []).map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div>
                    <label>
                      Focus:
                      <select
                        value={focusesState[position] || 'Balanced'}
                        onChange={(e) => handleFocusChange(e, position)}
                      >
                        {(focuses[position] || []).map((focus) => (
                          <option key={focus} value={focus}>{focus}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </>
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style={{ width: '50%' }}>
        <SoccerPitch 
          selectedPositions={Object.keys(selectedPositions)
            .filter((key) => selectedPositions[key])
            .reduce((acc, position) => {
              acc[position] = {
                role: rolesState[position] || 'Default',
                focus: focusesState[position] || 'Balanced',
              };
              return acc;
            }, {})} 
        />
      </div>
    </div>
  );
};

export default SoccerPositionForm;
