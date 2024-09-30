import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './CrearNoticia.css';

const CrearNoticia: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Conexión a Firestore
      const db = getFirestore();
      const noticiasCollection = collection(db, 'Noticias');

      // Agregar nueva noticia a la base de datos
      await addDoc(noticiasCollection, {
        titulo,
        descripcion,
        fecha,
      });

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: '¡Noticia creada con éxito!',
        text: 'La noticia se ha publicado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        // Redirigir a la pantalla de noticias después de cerrar el SweetAlert
        navigate('/noticia-eventos'); // Asegúrate de que esta ruta coincida con la ruta correcta
      });
    } catch (error) {
      console.error('Error al crear la noticia:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear la noticia. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="crear-noticia-wrapper">
        <div className="crear-noticia-container">
          <h1 className="crear-noticia-title">Crear Nueva Noticia</h1>
          <form onSubmit={handleSubmit} className="crear-noticia-form">
            <div className="form-group">
              <label htmlFor="titulo">Título:</label>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ingrese el título de la noticia"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción detallada de la noticia"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha:</label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Publicar Noticia</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearNoticia;
