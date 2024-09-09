import React from 'react';
import Navbar from '../Navbar'; // Asegúrate de que el Navbar esté en la ruta correcta
import './MainLayout.css'; // Asegúrate de tener los estilos correctos

const MainLayout: React.FC = () => {
  return (
    <div>
      {/* Incluye el Navbar */}
      <Navbar />
      
      {/* Contenido del Menú Principal */}
      <div className="main-menu">
        <h1 className="menu-title">Menú Principal</h1>

        <div className="cards-container">
          <div className="card">
            <h2>Publicar Nuevo Contenido</h2>
            <p>Comparte tus ideas o anuncios con la comunidad. Publica contenido fresco y relevante para todos.</p>
            <button className="card-button">Crear Publicación</button>
          </div>

          <div className="card">
            <h2>Administrar Publicaciones</h2>
            <p>Revisa, edita o elimina las publicaciones anteriores que hayas hecho. Mantén tu contenido actualizado.</p>
            <button className="card-button">Administrar</button>
          </div>

          <div className="card">
            <h2>Perfil de Usuario</h2>
            <p>Configura tus preferencias de usuario, actualiza tu foto de perfil o cambia tu contraseña.</p>
            <button className="card-button">Ver Perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
