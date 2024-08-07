import React, { useState } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component

const positions = [
  'Goalkeeper (GK)',

  // Defenders
  'Center Back (CB)',
  'Left Center Back (LCB)',
  'Right Center Back (RCB)',
  'Left Back (LB)',
  'Right Back (RB)',

  // Midfielders
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

  // Forwards
  'Left Winger (LW)',
  'Right Winger (RW)',
  'Striker (ST)',
  'Left Striker (LST)',
  'Right Striker (RST)',
];

const roles = {
  'Goalkeeper (GK)': ['Goalkeeper', 'Sweeper Keeper'],
  'Right Back (RB)': ['Fullback', 'Wingback', 'Falseback', 'Attacking Wingback'],
  'Left Back (LB)': ['Fullback', 'Wingback', 'Falseback', 'Attacking Wingback'],
  'Center Back (CB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
  'Left Center Back (LCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
  'Right Center Back (RCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
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
  'Right Striker (RST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward']
};


const focuses = ['Balanced', 'Defend', 'Attack', 'Build-Up', 'Roaming', 'Complete', 'Wide'];

const SoccerPositionForm = () => {
  const [selectedPositions, setSelectedPositions] = useState({});
  const [manager, setManager] = useState('');
  const [year, setYear] = useState('');
  const [tacticsharecode, setTacticShareCode] = useState('');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPositions((prevSelected) => ({
      ...prevSelected,
      [name]: checked ? { role: roles[name][0], focus: focuses[0] } : undefined,
    }));
  };

  const handleRoleChange = (position, role) => {
    setSelectedPositions((prevSelected) => ({
      ...prevSelected,
      [position]: { ...prevSelected[position], role },
    }));
  };

  const handleFocusChange = (position, focus) => {
    setSelectedPositions((prevSelected) => ({
      ...prevSelected,
      [position]: { ...prevSelected[position], focus },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedPositionsList = Object.keys(selectedPositions).filter(
      (key) => selectedPositions[key]
    );
    const selectedPositionsJSON = JSON.stringify(selectedPositionsList.map(key => ({
      position: key,
      role: selectedPositions[key].role,
      focus: selectedPositions[key].focus
    })));

    try {
      const { data, error } = await supabase
        .from('testtable')
        .insert([{ positions: selectedPositionsJSON, manager, year, tacticsharecode }]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setSelectedPositions({});
        setManager('');
        setYear('');
        setTacticShareCode('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="form-container">
      <h1>Select Soccer Positions</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Manager:
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            Tactic Share Code:
            <input
              type="text"
              value={tacticsharecode}
              onChange={(e) => setTacticShareCode(e.target.value)}
            />
          </label>
        </div>
        {positions.map((position) => (
          <div key={position} className="position-container">
            <label>
              <input
                type="checkbox"
                name={position}
                checked={selectedPositions[position] ? true : false}
                onChange={handleCheckboxChange}
              />
              {position}
            </label>
            {selectedPositions[position] && (
              <div className="dropdown-container">
                <select
                  value={selectedPositions[position].role}
                  onChange={(e) => handleRoleChange(position, e.target.value)}
                >
                  {roles[position].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPositions[position].focus}
                  onChange={(e) => handleFocusChange(position, e.target.value)}
                >
                  {focuses.map((focus) => (
                    <option key={focus} value={focus}>
                      {focus}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <SoccerPitch selectedPositions={selectedPositions} />
    </div>
  );
};

export default SoccerPositionForm;
