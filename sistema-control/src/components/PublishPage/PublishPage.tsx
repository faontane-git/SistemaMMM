import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import './PublishPage.css'; // Asegúrate de tener los estilos correctos

const PublishPage: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* Mantén tu componente Navbar */}

      <div className="publish-container">
        <h1 className="publish-title">Panel de Publicaciones</h1>

        {/* Menú con las opciones Notivia y eventos, Contactos, Agenda y Redes Sociales */}
        <div className="menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/noticia-eventos" className="menu-link">
                <div className="menu-card">
                  <h2>Noticia y eventos</h2>
                  <p>Mantente informado con noticias y eventos relevantes de la comunidad.</p>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/contactos" className="menu-link">
                <div className="menu-card">
                  <h2>Contactos</h2>
                  <p>Accede a los contactos de miembros y líderes de la comunidad.</p>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/agenda" className="menu-link">
                <div className="menu-card">
                  <h2>Agenda</h2>
                  <p>Consulta la agenda de eventos y reuniones programadas.</p>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/redes-sociales" className="menu-link">
                <div className="menu-card">
                  <h2>Redes Sociales</h2>
                  <p>Conéctate con nosotros a través de nuestras redes sociales oficiales.</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Aquí se renderizan las rutas de las opciones seleccionadas */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
