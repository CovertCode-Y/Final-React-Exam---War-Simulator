import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { launchMissile } from '../../features/attack/attackSlice';
import './AttackDashboard.css';

export const AttackDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const launchedMissiles = useSelector((state: RootState) => state.attack.launchedMissiles);
  const [missileType, setMissileType] = useState('Qassam');
  const [region, setRegion] = useState('North');

  const handleLaunch = () => {
    dispatch(launchMissile({ type: missileType, region })).unwrap().catch(error => {
      console.error("Launch missile error:", error);
    });
  };

  return (
    <div className="attack-dashboard">
      <h2 className="attack-title">Attack Dashboard</h2>
      <div className="attack-controls">
        <select className="attack-select" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="YehudaAndShomron">Yehuda and Shomron</option>
        </select>
        <select className="attack-select" value={missileType} onChange={(e) => setMissileType(e.target.value)}>
          <option value="Qassam">Qassam</option>
          <option value="Fajr-5">Fajr-5</option>
        </select>
        <button className="attack-button" onClick={handleLaunch}>Launch Missile</button>
      </div>

      <h3 className="missile-list-title">Launched Missiles</h3>
      <table className="missile-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Region</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {launchedMissiles.map((missile) => (
            <tr key={missile.id}>
              <td>{missile.type}</td>
              <td>{missile.region}</td>
              <td>{missile.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
