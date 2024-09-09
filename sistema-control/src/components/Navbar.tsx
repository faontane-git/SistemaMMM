import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Importa la imagen del logo
import './Navbar.css'; // Asegúrate de tener los estilos correctos

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogoClick = () => {
    navigate('/menu'); // Redirige al menú principal al hacer clic en el logo
  };

  const handlePublishClick = () => {
    navigate('/publicar'); // Redirige a la página de "Publicación"
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" className="logo-image" /> {/* Muestra el logo */}
        <span>IGLESIA UNIVERSAL MMM</span>
      </div>
      <div className="navbar-actions">
        <button className="publish-button" onClick={handlePublishClick}>
          Publicar
        </button>
        <div className="user-icon">
          <FontAwesomeIcon icon={faWrench} size="2x" color="white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
