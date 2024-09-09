import React, { useState } from 'react';
import Navbar from '../Navbar'; // Importa el componente Navbar
import './CreatePost.css'; // Estilos específicos para el formulario de creación de publicaciones

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Estado para la previsualización de la imagen

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // Crear la previsualización de la imagen con FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string); // Asigna la URL de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Publicación creada:', { title, content, image });

    // Aquí podrías agregar el código para enviar los datos al backend
    alert('Publicación creada con éxito!');
  };

  return (
    <div>
      {/* Agregamos el Navbar */}
      <Navbar />

      <div className="create-post-container">
        <h1 className="create-post-title">Crear Nueva Publicación</h1>
        <div className="create-post-card">
          <div className="image-section">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Previsualización" className="image-preview" />
            ) : (
              <div className="placeholder">Header</div>
            )}
          </div>
          <div className="content-section">
            <form className="create-post-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título de la publicación</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ingrese el título"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Contenido de la publicación</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ingrese el contenido"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Subir una imagen (opcional)</label>
                <input 
                  type="file" 
                  id="image" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>

              <button type="submit" className="submit-button">Publicar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
