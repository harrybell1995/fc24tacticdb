import React, { useState, useEffect } from 'react';
import SoccerPitch from './SoccerPitch';
import './SoccerPositionForm.css';
import { roles, focuses, options, formations } from './SoccerData';
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
    tacticalpreset: options.tacticalpreset[0],
    tacticname: '',
    notes: '',
    club: ''
  });
  const [activeTab, setActiveTab] = useState('tactic-info');
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    setSelectedPositions(formations['4-4-2']);
  }, []);

  const handleFormationSelect = (formation) => {
    setSelectedPositions(formations[formation]);
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
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedPositions(prev => ({
      ...prev,
      [selectedPosition]: { ...prev[selectedPosition], role: newRole }
    }));
  };

  const handleFocusChange = (e) => {
    const newFocus = e.target.value;
    setSelectedPositions(prev => ({
      ...prev,
      [selectedPosition]: { ...prev[selectedPosition], focus: newFocus }
    }));
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

  const handleSubmit = async () => {
    try {
      // Format the selected positions
      const formattedPositions = formatPositions();
      
      const { data, error } = await supabase
        .from('testtable')
        .insert([{
          ...formData,
          positions: formattedPositions,
          formation: '4-4-2' // Use the current formation or adjust as needed
        }]);
      
      if (error) {
        throw error;
      }

      console.log('Data submitted:', data);
      
      // Show success notification
      alert('Tactic has been successfully submitted!');
      
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
      // Optionally, you can show an error message here
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
                    'Notes'
                  }
                  required
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
                >
                  {options.defensiveapproach.map(approach => (
                    <option key={approach} value={approach}>{approach}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tacticalpreset">Tactical Preset</label>
                <select
                  id="tacticalpreset"
                  name="tacticalpreset"
                  value={formData.tacticalpreset}
                  onChange={handleInputChange}
                >
                  {options.tacticalpreset.map(preset => (
                    <option key={preset} value={preset}>{preset}</option>
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
              <button onClick={handleSubmit}>Submit</button>
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
                >
                  {focuses.map(focus => (
                    <option key={focus} value={focus}>{focus}</option>
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
