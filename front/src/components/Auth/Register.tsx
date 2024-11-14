import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import './Register.css';

export const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('IDF');
  const [region, setRegion] = useState('North');

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrganization = e.target.value;
    setOrganization(selectedOrganization);

    if (selectedOrganization !== 'IDF') {
      setRegion('');
    }
  };

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ username, password, organization, region })).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Register error', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <input
        className="register-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="register-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select className="register-select" value={organization} onChange={handleOrganizationChange}>
        <option value="IDF">IDF</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
      </select>

      {organization === 'IDF' && (
        <select className="register-select" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="YehudaAndShomron">Yehuda and Shomron</option>
        </select>
      )}
      
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  );
};
