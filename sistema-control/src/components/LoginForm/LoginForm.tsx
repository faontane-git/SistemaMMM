// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase'; // Importa la configuración de Firebase
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Referencia a la colección "Usuarios"
      const usersRef = collection(firestore, 'Usuarios');

      // Crear una consulta para buscar al usuario con email y contraseña
      const q = query(usersRef, where('user', '==', email), where('password', '==', password));

      // Ejecutar la consulta y obtener los documentos que coincidan con la consulta
      const querySnapshot = await getDocs(q);

      // Verificar si se encontró al menos un documento que coincida
      if (!querySnapshot.empty) {
        // Credenciales correctas
        navigate('/menu');
      } else {
        // Credenciales incorrectas
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión. Inténtalo más tarde.');
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