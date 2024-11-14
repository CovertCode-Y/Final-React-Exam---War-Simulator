import React from 'react';
import  { BrowserRouter ,Route, Routes } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { DefenseDashboard } from './components/Dashboard/DefenseDashboard';
import { AttackDashboard } from './components/Dashboard/AttackDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/defense" element={<DefenseDashboard />} />
          <Route path="/attack" element={<AttackDashboard />} />
        </Route>
      </Routes>
      </BrowserRouter>
   
  );
}

export default App;
