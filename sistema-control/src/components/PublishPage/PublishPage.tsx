import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import './PublishPage.css'; // Asegúrate de tener los estilos correctos

const PublishPage: React.FC = () => {
  return (
    <div>

      <Navbar />

      {/* Contenido de la página de publicación */}
      <div className="publish-container">
        <h1 className="publish-title">Pantalla de Publicación</h1>

        <div className="menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/crear-publicacion" className="menu-link">Crear una nueva publicación</Link>
            </li>
            <li className="menu-item">
              <Link to="/administrar-publicaciones" className="menu-link">Administrar publicaciones</Link>
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
