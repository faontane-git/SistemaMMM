import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/menu');
  };

  const handleSettingsClick = () => {
    navigate('/settings');  
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" className="logo-image" />
        <span>IGLESIA UNIVERSAL MMM</span>
      </div>
      <div className="navbar-actions">
        <button className="publish-button" onClick={() => navigate('/publicar')}>
          Publicar
        </button>
        <button className="iglesias-button" onClick={() => navigate('/iglesias')}>
          Iglesias
        </button>
        <div className="user-icon" onClick={handleSettingsClick} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faWrench} size="2x" color="white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
