import React, { useState } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch'; // Import the SoccerPitch component
import formationTemplates from './formationtemplates'; // Import formation templates

const positions = [
  'Goalkeeper (GK)', 'Center Back (CB)', 'Left Center Back (LCB)', 'Right Center Back (RCB)',
  'Left Back (LB)', 'Right Back (RB)', 'Defensive Midfielder (CDM)', 'Left Defensive Midfielder (LDM)', 'Right Defensive Midfielder (RDM)',
  'Central Midfielder (CM)', 'Left Central Midfielder (LCM)', 'Right Central Midfielder (RCM)',
  'Left Midfielder (LM)', 'Right Midfielder (RM)', 'Attacking Midfielder (CAM)', 'Left Attacking Midfielder (LCAM)', 'Right Attacking Midfielder (RCAM)',
  'Left Winger (LW)', 'Right Winger (RW)', 'Striker (ST)', 'Left Striker (LST)', 'Right Striker (RST)',
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
  'Striker (ST)': ['Advanced Forward', 'Poacher', 'False 9', 'Target Forward'],
  'Left Striker (LST)': ['Advanced Forward', 'Poacher', 'False 9', 'Target Forward'],
  'Right Striker (RST)': ['Advanced Forward', 'Poacher', 'False 9', 'Target Forward']
};

const focuses = ['Balanced', 'Defend', 'Attack', 'Build-Up', 'Roaming', 'Complete', 'Wide'];

const options = {
  tacticalpreset: ['Balanced', 'Long Ball', 'Wing Play', 'Tiki Taka', 'Pressing', 'Park the Bus', 'Counter Attack'],
  buildupstyle: ['Balanced', 'Counter', 'Short Passing'],
  defensiveapproach: ['Deep', 'Normal', 'High', 'Aggressive']
};

const initialFormData = {
  manager: '',
  year: '',
  tacticsharecode: '',
  buildupstyle: options.buildupstyle[0],
  defensiveapproach: options.defensiveapproach[0],
  clubcountry: '',
  league: '',
  tacticalpreset: options.tacticalpreset[0],
  tacticname: '',
  notes: '',
  formation: ''
};

const SoccerPositionForm = () => {
  const [selectedPositions, setSelectedPositions] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const getPositionColor = (position) => {
    if (position.includes('Goalkeeper')) return 'rgba(255, 0, 0, 0.2)';
    if (position.includes('Back') || position.includes('Center Back')) return 'rgba(255, 165, 0, 0.2)';
    if (position.includes('Midfielder')) return 'rgba(0, 128, 0, 0.2)';
    if (position.includes('Winger') || position.includes('Striker')) return 'rgba(0, 0, 255, 0.2)';
    return 'rgba(0, 0, 0, 0.1)';
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (name, direction) => {
    const optionsList = options[name];
    const currentIndex = optionsList.indexOf(formData[name]);
    const newIndex = (currentIndex + direction + optionsList.length) % optionsList.length;
    setFormData(prev => ({ ...prev, [name]: optionsList[newIndex] }));
  };

  const handleCheckboxChange = (position) => {
    setSelectedPositions(prev => ({
      ...prev,
      [position]: prev[position] ? undefined : { role: roles[position][0], focus: focuses[0] },
    }));
  };

  const handleSelectChange = (position, type, value) => {
    setSelectedPositions(prev => ({
      ...prev,
      [position]: { ...prev[position], [type]: value },
    }));
  };

  const handleFormationChange = (formation) => {
    setFormData(prev => ({ ...prev, formation }));
    setSelectedPositions(formationTemplates[formation] || {});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['manager', 'year', 'tacticsharecode', 'clubcountry', 'league', 'tacticname', 'formation'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} field.`);
        return;
      }
    }

    // Check if at least one position is selected
    const selectedPositionsList = Object.keys(selectedPositions).filter(key => selectedPositions[key]);
    if (selectedPositionsList.length === 0) {
      alert('Please select at least one position.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('testtable')
        .insert([{
          positions: JSON.stringify(selectedPositionsList.map(key => ({
            position: key,
            role: selectedPositions[key].role,
            focus: selectedPositions[key].focus
          }))),
          ...formData
        }]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setSelectedPositions({});
        setFormData(initialFormData);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="details-page-container">
      <div className="tactic-content">
        <div className="tactic-details">
          {['manager', 'year', 'tacticsharecode', 'clubcountry', 'league', 'tacticname'].map(field => (
            <div key={field} className="detail-box">
              <label className="detail-label">
                <span className="secondary-text">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
              />
            </div>
          ))}
          <div className="detail-box">
            <label className="detail-label">
              <span className="secondary-text">Notes</span>
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter Notes"
            />
          </div>
          <div className="detail-box">
            <label className="detail-label">
              <span className="secondary-text">Formation</span>
            </label>
            <select
              name="formation"
              value={formData.formation}
              onChange={({ target: { value } }) => handleFormationChange(value)}
            >
              <option value="">Select Formation</option>
              {Object.keys(formationTemplates).map(formation => (
                <option key={formation} value={formation}>{formation}</option>
              ))}
            </select>
          </div>
          {['tacticalpreset', 'buildupstyle', 'defensiveapproach'].map(option => (
            <div className="detail-box" key={option}>
              <label className="detail-label">
                <span className="secondary-text">{option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </label>
              <div className="option-selector">
                <button onClick={() => handleOptionChange(option, -1)}>&lt;</button>
                <span>{formData[option]}</span>
                <button onClick={() => handleOptionChange(option, 1)}>&gt;</button>
              </div>
            </div>
          ))}
        </div>
        <div className="tactic-pitch">
          <SoccerPitch selectedPositions={selectedPositions} />
        </div>
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
                <div
                  className="dropdown-container expanded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={selectedPositions[position].role}
                    onChange={({ target: { value } }) => handleSelectChange(position, 'role', value)}
                  >
                    {roles[position].map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <select
                    value={selectedPositions[position].focus}
                    onChange={({ target: { value } }) => handleSelectChange(position, 'focus', value)}
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
    </div>
  );
};

export default SoccerPositionForm;
