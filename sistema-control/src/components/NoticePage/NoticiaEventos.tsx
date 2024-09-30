// src/components/NotiviaEventos.tsx
import React, { useEffect, useState } from 'react';
import './NoticiaEventos.css'; // Asegúrate de tener un archivo CSS para los estilos
import Navbar from '../Navbar';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

// Definir una interfaz para las noticias
interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const NotiviaEventos: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]); // Estado para almacenar las noticias

  // Simulación de carga de datos (puedes conectarlo a una base de datos real)
  useEffect(() => {
    const noticiasEjemplo: Noticia[] = [
      { id: '1', titulo: 'Nuevo evento de la comunidad', descripcion: 'Te invitamos al evento de recaudación de fondos este sábado a las 4:00 PM.', fecha: '2024-09-30' },
      { id: '2', titulo: 'Actualización de noticias y eventos', descripcion: 'Buscamos voluntarios para ayudar en la organización de nuestro próximo evento.', fecha: '2024-10-05' },
    ];
    setNoticias(noticiasEjemplo);
  }, []);

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar */}
      <div className="notivia-container">
        <h1 className="notivia-title">Noticias y Eventos</h1>

        {/* Mostrar un mensaje si no hay noticias */}
        {noticias.length === 0 ? (
          <p className="no-news">No hay noticias disponibles en este momento.</p>
        ) : (
          <div className="noticias-list">
            {noticias.map((noticia, index) => (
              // Si la noticia es la primera (index === 0), redirigir a "/crear-noticia"
              <Link
                to={index === 0 ? '/crear-noticia' : `/detalle-noticia`}
                key={noticia.id}
                className="noticia-card"
              >
                <h2 className="noticia-titulo">{noticia.titulo}</h2>
                <p className="noticia-descripcion">{noticia.descripcion}</p>
                <p className="noticia-fecha">{noticia.fecha}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotiviaEventos;
