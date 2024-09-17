import React, { useState, useEffect } from 'react';
import SoccerPitch from './SoccerPitch';
import './SoccerPositionForm.css';
import { roles, focuses, options, formations } from './SoccerData';

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
              <h3>Tactic Info</h3>
              {['manager', 'year', 'tacticsharecode', 'clubcountry', 'league'].map((field) => (
                <div key={field} className="form-group">
                  <input
                    type="text"
                    name={field}
                    id={field}
                    className="form-field"
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    required
                  />
                  <label htmlFor={field}>{field}</label>
                </div>
              ))}
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
