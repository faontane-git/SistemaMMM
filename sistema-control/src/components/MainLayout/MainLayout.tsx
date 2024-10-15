import React from 'react';
import Navbar from '../Navbar'; // Importar el Navbar
import Carousel from 'react-material-ui-carousel'; // Carrusel de Material-UI
import { Paper, Typography, Box, Container } from '@mui/material';
import './MainLayout.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

// Imágenes para el carrusel (puedes sustituir con las imágenes que desees)
const items = [
  { id: 1, image: img1, title: 'Bienvenido a la Iglesia MMM' },
  { id: 2, image: img2, title: 'Únete a nuestras actividades' },
  { id: 3, image: img3, title: 'Creciendo juntos en comunidad' },
];

const MainLayout: React.FC = () => {
  return (
    <div>
      {/* Navbar colocado en la parte superior */}
      <Navbar />

      {/* Sección de bienvenida con un fondo suave */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5', // Un color gris claro para fondo suave
          padding: '40px 0',
          textAlign: 'center',
          borderBottom: '2px solid #e0e0e0', // Un borde sutil
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2, letterSpacing: 1 }}>
          ¡Bienvenidos a nuestra Iglesia!
        </Typography>
        <Typography variant="h5" sx={{ color: '#616161', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
          Participa en nuestras actividades y únete a nuestra comunidad. <br />
          <strong>¡Juntos crecemos y aprendemos!</strong>
        </Typography>
      </Box>

      {/* Carrusel de imágenes con títulos reubicados */}
      <Container sx={{ mt: 4, maxWidth: '900px' }}>
        <Carousel
          autoPlay
          interval={5000}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible
          navButtonsProps={{
            style: {
              backgroundColor: '#ffffff',
              color: '#3f51b5',
              borderRadius: 50,
              margin: '0 10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {items.map((item) => (
            <Paper key={item.id} sx={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
              {/* Imagen del carrusel */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', transition: 'transform 0.5s ease' }}
                className="carousel-image"
              />
              {/* Título reubicado en la parte inferior */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro transparente para legibilidad
                  color: 'white',
                  textAlign: 'center',
                  padding: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.5s ease',
                }}
              >
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                  {item.title}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>
      </Container>

      <style>
        {`
          .carousel-image:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
