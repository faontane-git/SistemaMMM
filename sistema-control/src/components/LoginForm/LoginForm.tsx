// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado para la navegación.
import './LoginForm.css'; // Archivo de CSS para estilos

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación.

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar credenciales
    if (email === 'admin' && password === 'admin') {
      navigate('/menu'); // Redirige al menú principal si las credenciales son correctas.
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Sistema de control de miembros de la iglesia Universal MMM</h1>
        <h2>Inicie Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Correo"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
