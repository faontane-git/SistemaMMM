import React, { useState } from 'react';
import Navbar from '../Navbar'; // Importa el Navbar
import './ManagePosts.css'; // Estilos específicos para la pantalla de administrar publicaciones

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string; // Añadimos la propiedad de imagen
}

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Post 1', content: 'Este es el contenido del Post 1.', date: '2024-09-10', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Post 2', content: 'Este es el contenido del Post 2.', date: '2024-09-09', imageUrl: 'https://via.placeholder.com/150' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para abrir y cerrar el modal
  const [currentPost, setCurrentPost] = useState<Post | null>(null); // Post que se está editando
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null); // Estado para previsualización de la nueva imagen

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setNewImagePreviewUrl(null); // Reseteamos la previsualización de imagen
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null); // Limpiar el post actual
  };

  const handleSave = () => {
    if (currentPost) {
      const updatedPosts = posts.map(post =>
        post.id === currentPost.id
          ? { ...currentPost, imageUrl: newImagePreviewUrl || currentPost.imageUrl } // Actualizamos la imagen si se seleccionó una nueva
          : post
      );
      setPosts(updatedPosts);
      alert('Publicación actualizada');
      handleCloseModal();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviewUrl(reader.result as string); // Mostramos la nueva imagen en el modal
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar */}
      
      <div className="manage-posts-container">
        <h1 className="manage-posts-title">Administrar Publicaciones</h1>

        {posts.length === 0 ? (
          <p>No hay publicaciones disponibles.</p>
        ) : (
          <ul className="posts-list">
            {posts.map(post => (
              <li key={post.id} className="post-item">
                {/* Imagen genérica */}
                <img src={post.imageUrl} alt={post.title} className="post-image" />

                <div className="post-content">
                  <h2>{post.title}</h2>
                  <p><strong>Fecha de Publicación:</strong> {post.date}</p>
                  <p>{post.content}</p>

                  <div className="post-actions">
                    <button className="edit-button" onClick={() => handleEdit(post)}>Editar</button>
                    <button className="delete-button" onClick={() => setPosts(posts.filter(p => p.id !== post.id))}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal para editar la publicación */}
      {isModalOpen && currentPost && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Publicación</h2>

            {/* Mostrar la imagen actual o la nueva previsualización */}
            <div className="image-preview-container">
              {newImagePreviewUrl ? (
                <img src={newImagePreviewUrl} alt="Previsualización" className="image-preview" />
              ) : (
                <img src={currentPost.imageUrl} alt="Imagen actual" className="image-preview" />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title">Título de la publicación</label>
              <input
                type="text"
                id="title"
                value={currentPost.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Contenido de la publicación</label>
              <textarea
                id="content"
                value={currentPost.content}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, content: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Cambiar Imagen (opcional)</label>
              <input 
                type="file" 
                id="image" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </div>

            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>Guardar</button>
              <button className="cancel-button" onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
