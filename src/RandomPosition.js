import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import SoccerPitch from './SoccerPitch';

const RandomPosition = () => {
  const [tactic, setTactic] = useState({ positions: [], year: '', manager: '', tacticShareCode: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [managerList, setManagerList] = useState([]);

  const fetchAllManagers = async () => {
    try {
      const { data, error } = await supabase
        .from('testtable')
        .select('manager')
        .distinct();

      if (error) throw error;

      // Extract the manager names
      const managers = data.map(item => item.manager);
      setManagerList(managers);
    } catch (err) {
      console.error('Error fetching managers:', err.message);
    }
  };

  const fetchTactic = async (managerName = '') => {
    try {
      setLoading(true);

      let query = supabase.from('testtable').select('*');

      if (managerName) {
        query = query.eq('manager', managerName);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const positions = JSON.parse(data[randomIndex].positions || '[]');

        setTactic({
          positions: positions,
          year: data[randomIndex].year || '',
          manager: data[randomIndex].manager || '',
          tacticShareCode: data[randomIndex].tacticShareCode || ''
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllManagers();
    fetchTactic();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchTactic(searchQuery);
  };

  return (
    <div>
      <h1>Random Soccer Tactic</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          list="managers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Manager"
        />
        <datalist id="managers">
          {managerList.map((manager, index) => (
            <option key={index} value={manager} />
          ))}
        </datalist>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <SoccerPitch selectedPositions={tactic.positions.reduce((acc, pos) => {
            acc[pos.position] = {
              role: pos.role,
              focus: pos.focus
            };
            return acc;
          }, {})} />
          <div>
            <h2>Details</h2>
            <p><strong>Year:</strong> {tactic.year}</p>
            <p><strong>Manager:</strong> {tactic.manager}</p>
            <p><strong>Tactic Share Code:</strong> {tactic.tacticShareCode}</p>
          </div>
        </>
      )}
      <button onClick={() => fetchTactic()}>Get Another Random Tactic</button>
    </div>
  );
};

export default RandomPosition;
