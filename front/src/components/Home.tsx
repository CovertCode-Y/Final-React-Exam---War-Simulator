import React, { useState } from 'react';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the War Simulator</h1>

      <div className="auth-container">
        {showLogin ? (
          <div className="auth-section">
            <Login />
            <p>
              Don't have an account?{' '}
              <Link to="#" onClick={toggleForm} className="toggle-link">
                Register here
              </Link>
            </p>
          </div>
        ) : (
          <div className="auth-section">
            <Register />
            <p>
              Already have an account?{' '}
              <Link to="#" onClick={toggleForm} className="toggle-link">
                Login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
