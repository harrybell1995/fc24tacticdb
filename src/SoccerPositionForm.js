<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import SoccerPitch from './SoccerPitch';
import './SoccerPositionForm.css';
import { roles, focuses, options, formations, roleValidFocusMapping } from './SoccerData'; // Make sure to import the roleValidFocusMapping
import supabase from './supabaseClient'; // Import Supabase client

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
    tacticname: '',
    notes: '', // Notes can be optional
    club: ''
  });
  const [activeTab, setActiveTab] = useState('tactic-info');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formation, setFormation] = useState('4-4-2'); // New state for formation
  const [validFocuses, setValidFocuses] = useState([]); // New state for valid focuses

  useEffect(() => {
    setSelectedPositions(formations[formation]); // Update selected positions based on formation
  }, [formation]); // Depend on formation state

  const handleFormationSelect = (formation) => {
    setFormation(formation); // Update the formation state
    setSelectedPosition(null);
    setActiveTab('tactic-info');
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  const handleOptionChange = (name, direction) => {
    const optionsList = options[name];
    const currentIndex = optionsList.indexOf(formData[name]);
    const newIndex = (currentIndex + direction + optionsList.length) % optionsList.length;
    setFormData(prev => ({ ...prev, [name]: optionsList[newIndex] }));
=======
  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setActiveTab('position-info');
    // Set valid focuses based on the initially selected position and role
    const initialRole = selectedPositions[position]?.role;
    if (initialRole) {
      const focusesForRole = getValidFocuses(initialRole, position);
      setValidFocuses(focusesForRole);
    }
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedPositions(prev => ({
      ...prev,
      [selectedPosition]: { ...prev[selectedPosition], role: newRole }
    }));

    // Set valid focuses based on selected role
    const validRoleFocuses = getValidFocuses(newRole, selectedPosition);
    setValidFocuses(validRoleFocuses);
    console.log("Valid Focuses:", validRoleFocuses); // Debug log
  };

  const handleFocusChange = (e) => {
    const newFocus = e.target.value;
    setSelectedPositions(prev => ({
      ...prev,
      [selectedPosition]: { ...prev[selectedPosition], focus: newFocus }
    }));
  };

  const getValidFocuses = (role, position) => {
    const focusesForRole = roleValidFocusMapping[position]?.[role] || [];
    return focusesForRole;
  };

<<<<<<< HEAD
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
=======
  // Convert selectedPositions to the required format
  const formatPositions = () => {
    const formatted = {};
    Object.keys(selectedPositions).forEach(position => {
      const { role, focus } = selectedPositions[position];
      if (role && focus) {
        formatted[position] = [role, focus];
      }
    });
    return formatted;
  };

  // Form validation function
  const validateForm = () => {
    // Check for empty fields in formData except 'notes' (optional)
    for (const key in formData) {
      if (key !== 'notes' && !formData[key].trim()) {
        alert(`Please fill in the ${key.replace(/([a-z])([A-Z])/g, '$1 $2')}.`); // Display human-readable field name
        return false;
      }
    }

    // Ensure every position has both a role and focus
    for (const position in selectedPositions) {
      const { role, focus } = selectedPositions[position];
      if (!role || !focus) {
        alert(`Please select both role and focus for ${position}.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // If validation fails, exit
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06

    try {
      // Format the selected positions
      const formattedPositions = formatPositions();

      const { data, error } = await supabase
        .from('testtable')
        .insert([{
<<<<<<< HEAD
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
=======
          ...formData,
          positions: formattedPositions,
          formation: formation // Use the current formation from the state
        }]);

      if (error) {
        throw error;
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06
      }

      console.log('Data submitted:', data);
      alert('Tactic has been successfully submitted!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="soccer-position-form-container">
      <div className="tactic-row-thingy">
        <div className="pitch-section">
          <SoccerPitch
            selectedPositions={selectedPositions}
            onPositionClick={handlePositionClick}
            selectedPosition={selectedPosition}
          />
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06
        </div>

        <div className="sidebar">
          <div className="view-toggle-width">
            <div className="view-toggle">
              <div
                className={`tab ${activeTab === 'tactic-info' ? 'active' : ''}`}
                onClick={() => setActiveTab('tactic-info')}
              >
                Tactic Info
              </div>
              <div
                className={`tab ${activeTab === 'position-info' ? 'active' : ''}`}
                onClick={() => setActiveTab('position-info')}
                disabled={!selectedPosition}
              >
                Position Info
              </div>
            </div>
          </div>

          {activeTab === 'tactic-info' && (
            <div className="tactic-info">
              <h3>Submit a new tactic</h3>
              {['manager', 'year', 'tacticsharecode', 'club', 'clubcountry', 'league', 'tacticname', 'notes'].map((field) => (
                <div key={field} className="form-group">
                  <input
                    type="text"
                    name={field}
                    id={field}
                    className="form-field"
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={
                      field === 'manager' ? 'Manager Name' :
                      field === 'year' ? 'Year' :
                      field === 'tacticsharecode' ? 'Tactic Share Code' :
                      field === 'club' ? 'Club Name' :
                      field === 'clubcountry' ? 'Club Country' :
                      field === 'league' ? 'League' :
                      field === 'tacticname' ? 'Tactic Name' :
                      'Description'
                    }
                    required={field !== 'notes'} // Notes is optional
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="buildupstyle">Buildup Style</label>
                <select
                  id="buildupstyle"
                  name="buildupstyle"
                  value={formData.buildupstyle}
                  onChange={handleInputChange}
                  required
                >
                  {options.buildupstyle.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="defensiveapproach">Defensive Approach</label>
                <select
                  id="defensiveapproach"
                  name="defensiveapproach"
                  value={formData.defensiveapproach}
                  onChange={handleInputChange}
                  required
                >
                  {options.defensiveapproach.map(approach => (
                    <option key={approach} value={approach}>{approach}</option>
                  ))}
                </select>
              </div>
              <div className="formation-list">
                <h3>Formations</h3>
                {Object.keys(formations).map((formation) => (
                  <button
                    key={formation}
                    onClick={() => handleFormationSelect(formation)}
                  >
                    {formation}
                  </button>
                ))}
              </div>
              <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
          )}

          {activeTab === 'position-info' && selectedPosition && (
            <div className="position-details">
              <h3>Position Info</h3>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={selectedPositions[selectedPosition]?.role || ''}
                  onChange={handleRoleChange}
                  required
                >
                  {(roles[selectedPosition] || []).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="focus">Focus</label>
                <select
                  id="focus"
                  value={selectedPositions[selectedPosition]?.focus || ''}
                  onChange={handleFocusChange}
                  required
                >
                  {validFocuses.map((focus, index) => (
                    <option key={index} value={focus}>{focus}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
<<<<<<< HEAD

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
=======
>>>>>>> 4f12d7360791493bb811dbed4dbbb73fe05e5b06
    </div>
  );
};

export default SoccerPositionForm;
