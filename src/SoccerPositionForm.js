import React, { useState } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch';
import './SoccerPositionForm.css'; // Ensure you import the CSS for styling

const positions = [
  'Goalkeeper (GK)', 'Center Back (CB)', 'Left Center Back (LCB)', 'Right Center Back (RCB)',
  'Left Back (LB)', 'Right Back (RB)', 'Defensive Midfielder (CDM)', 'Left Defensive Midfielder (LDM)',
  'Right Defensive Midfielder (RDM)', 'Central Midfielder (CM)', 'Left Central Midfielder (LCM)',
  'Right Central Midfielder (RCM)', 'Left Midfielder (LM)', 'Right Midfielder (RM)', 'Attacking Midfielder (CAM)',
  'Left Attacking Midfielder (LCAM)', 'Right Attacking Midfielder (RCAM)', 'Left Winger (LW)',
  'Right Winger (RW)', 'Striker (ST)', 'Left Striker (LST)', 'Right Striker (RST)'
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

const options = {
  tacticalpreset: ['Balanced', 'Long Ball', 'Wing Play', 'Tiki Taka', 'Pressing', 'Park the Bus', 'Counter Attack'],
  buildupstyle: ['Balanced', 'Counter', 'Short Passing'],
  defensiveapproach: ['Deep', 'Normal', 'High', 'Aggressive']
};

const SoccerPositionForm = () => {
  const [selectedPositions, setSelectedPositions] = useState({});
  const [formData, setFormData] = useState({
    manager: '',
    year: '',
    tacticsharecode: '',
    buildupstyle: options.buildupstyle[0],
    defensiveapproach: options.defensiveapproach[0],
    clubcountry: '',
    league: '',
    tacticalpreset: options.tacticalpreset[0]
  });

  const getPositionColor = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.2)';
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.2)';
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.2)';
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.2)';
    return 'rgba(0, 0, 0, 0.1)';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (name, direction) => {
    const currentIndex = options[name].indexOf(formData[name]);
    const newIndex = (currentIndex + direction + options[name].length) % options[name].length;
    setFormData(prev => ({ ...prev, [name]: options[name][newIndex] }));
  };

  const handleCheckboxChange = (position) => {
    setSelectedPositions(prev => ({
      ...prev,
      [position]: prev[position] ? undefined : { role: roles[position][0], focus: focuses[0] }
    }));
  };

  const handleSelectChange = (position, type, value) => {
    setSelectedPositions(prev => ({
      ...prev,
      [position]: { ...prev[position], [type]: value }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedPositionsList = Object.keys(selectedPositions).filter(key => selectedPositions[key]);

    const submissionData = new FormData();
    submissionData.append('positions', JSON.stringify(selectedPositionsList.map(key => ({
      position: key,
      role: selectedPositions[key].role,
      focus: selectedPositions[key].focus
    }))));
    
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    try {
      const { data, error } = await supabase
        .from('testtable')
        .insert([Object.fromEntries(submissionData)]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setSelectedPositions({});
        setFormData({
          manager: '',
          year: '',
          tacticsharecode: '',
          buildupstyle: options.buildupstyle[0],
          defensiveapproach: options.defensiveapproach[0],
          clubcountry: '',
          league: '',
          tacticalpreset: options.tacticalpreset[0]
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="details-page-container">
      <div className="tactic-content">
        <div className="tactic-details">
          {['Manager', 'Season', 'Tactic Share Code', 'Club Nationality', 'League'].map(field => (
            <div key={field} className="form__group field">
              <input
                type="text"
                name={field}
                id={field}
                className="form__field"
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                required
              />
              <label htmlFor={field} className="form__label">{`Enter ${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}</label>
            </div>
          ))}
          {['tacticalpreset', 'buildupstyle', 'defensiveapproach'].map(option => (
            <div key={option} className="form__group field">
              <span className="form__label">{option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              <div className="option-selector">
                <button type="button" onClick={() => handleOptionChange(option, -1)}>&lt;</button>
                <span>{formData[option]}</span>
                <button type="button" onClick={() => handleOptionChange(option, 1)}>&gt;</button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="positions-grid">
            {positions.map(position => (
              <div
                key={position}
                className="position-container"
                onClick={() => handleCheckboxChange(position)}
                style={{ background: selectedPositions[position] ? `linear-gradient(${getPositionColor(position)}, transparent)` : 'none' }}
              >
                <label>
                  <input
                    type="checkbox"
                    name={position}
                    checked={!!selectedPositions[position]}
                    onChange={() => handleCheckboxChange(position)}
                    style={{ display: 'none' }}
                  />
                  {position}
                </label>
                {selectedPositions[position] && (
                  <div className="dropdown-container expanded">
                    <select
                      value={selectedPositions[position].role}
                      onChange={(e) => handleSelectChange(position, 'role', e.target.value)}
                    >
                      {roles[position].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <select
                      value={selectedPositions[position].focus}
                      onChange={(e) => handleSelectChange(position, 'focus', e.target.value)}
                    >
                      {focuses.map(focus => (
                        <option key={focus} value={focus}>{focus}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
        
        <div className="tactic-pitch">
          <SoccerPitch positions={selectedPositions} />
        </div>
      </div>
    </div>
  );
};

export default SoccerPositionForm;
