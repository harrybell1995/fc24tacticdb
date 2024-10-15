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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setActiveTab('position-info');
    // Set valid focuses based on the initially selected position and role
    const initialRole = selectedPositions[position]?.role;
    if (initialRole) {
      const focusesForRole = getValidFocuses(initialRole, position);
      setValidFocuses(focusesForRole);
    }
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

    try {
      // Format the selected positions
      const formattedPositions = formatPositions();

      const { data, error } = await supabase
        .from('testtable')
        .insert([{
          ...formData,
          positions: formattedPositions,
          formation: formation // Use the current formation from the state
        }]);

      if (error) {
        throw error;
      }

      console.log('Data submitted:', data);
      alert('Tactic has been successfully submitted!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="soccer-position-form-container">
      <div className="tactic-row-thingy">
        <div className="pitch-section">
          <SoccerPitch
            selectedPositions={selectedPositions}
            onPositionClick={handlePositionClick}
            selectedPosition={selectedPosition}
          />
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
    </div>
  );
};

export default SoccerPositionForm;
