import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import './PublishPage.css'; // Asegúrate de tener los estilos correctos

const PublishPage: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="publish-container">
        <h1 className="publish-title">Publicaciones</h1>

        <div className="menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/crear-publicacion" className="menu-link">
                <div className="menu-card">
                  <h2>Crear una nueva publicación</h2>
                  <p>Comparte tus ideas o anuncios con la comunidad. Publica contenido relevante y mantente conectado.</p>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/administrar-publicaciones" className="menu-link">
                <div className="menu-card">
                  <h2>Administrar publicaciones</h2>
                  <p>Gestiona tus publicaciones anteriores. Edita o elimina publicaciones según sea necesario.</p>
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
