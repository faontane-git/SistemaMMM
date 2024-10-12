import React from 'react';
import Navbar from '../Navbar'; // Importar el Navbar
import Carousel from 'react-material-ui-carousel'; // Carrusel de Material-UI
import { Paper, Typography, Box, Container } from '@mui/material';
import './MainLayout.css';

// Imágenes para el carrusel (puedes sustituir con las imágenes que desees)
const items = [
  { id: 1, image: 'https://via.placeholder.com/1200x600?text=Imagen+1', title: 'Bienvenido a la Iglesia MMM' },
  { id: 2, image: 'https://via.placeholder.com/1200x600?text=Imagen+2', title: 'Únete a nuestras actividades' },
  { id: 3, image: 'https://via.placeholder.com/1200x600?text=Imagen+3', title: 'Creciendo juntos en comunidad' }
];

const MainLayout: React.FC = () => {
  return (
    <div>
      {/* Navbar colocado en la parte superior */}
      <Navbar />

      {/* Título alegre y divertido */}
      <Box
        sx={{
          backgroundColor: '#ffeb3b', // Un color amarillo vibrante para el fondo
          padding: '40px 0',
          textAlign: 'center',
          borderBottom: '5px solid #fbc02d',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2 }}>
          ¡Bienvenidos a nuestra Iglesia!
        </Typography>
        <Typography variant="h5" sx={{ color: '#3f51b5', fontStyle: 'italic' }}>
          Participa en nuestras actividades y únete a nuestra comunidad. <br />
          <strong>¡Juntos crecemos y aprendemos!</strong>
        </Typography>
      </Box>

      {/* Carrusel de imágenes mejorado */}
      <Carousel>
        {items.map((item) => (
          <Paper key={item.id} sx={{ position: 'relative' }}>
            {/* Agrandamos la imagen a 600px de altura */}
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Un fondo más oscuro para mejor legibilidad
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.5s ease',
              }}
            >
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                {item.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default MainLayout;
