import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const predefinedSuperAdmin = { email: 'admin@example.com', password: 'admin123' };

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === predefinedSuperAdmin.email && password === predefinedSuperAdmin.password) {
      // Store Super Admin role in localStorage
      localStorage.setItem('role', 'SuperAdmin');
      navigate('/superadmin-dashboard');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { role } = response.data;

        // Store role in localStorage
        localStorage.setItem('role', role);

        if (role === 'Teacher') {
          navigate('/teacher-dashboard');
        } else if (role === 'Student') {
          navigate('/student-dashboard');
        }
      } catch (error) {
        console.log('Login failed');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
