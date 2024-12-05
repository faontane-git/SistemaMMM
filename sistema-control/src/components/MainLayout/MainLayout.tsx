import React from 'react';
import Navbar from '../Navbar';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Container } from '@mui/material';

const items = [
  {
    id: 1,
    title: 'Nuestros Servicios',
    description: 'Ofrecemos servicios semanales para toda la familia, donde puedes aprender, crecer espiritualmente y compartir en comunidad. ¡Todos son bienvenidos!',
  },
  {
    id: 2,
    title: 'Nuestra Misión',
    description: 'Nuestra misión es ser una comunidad que fomente el crecimiento espiritual y el amor al prójimo. Buscamos servir a través de la enseñanza y la acción.',
  },
  {
    id: 3,
    title: 'Recursos y Apoyo',
    description: 'Contamos con programas de apoyo y consejería para quienes lo necesiten. Nuestro equipo está aquí para acompañarte en momentos importantes.',
  },
];

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />

      <Box
        sx={{
          backgroundColor: '#f0f4fa',
          padding: { xs: '40px 0', sm: '60px 0' }, // Ajuste de padding en móviles y pantallas grandes
          textAlign: 'center',
          borderBottom: '2px solid #cfd8dc',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#3f51b5',
            mb: 1,
            letterSpacing: 1,
            fontSize: { xs: '1.8rem', sm: '2rem' }, // Ajuste de tamaño de fuente para pantallas pequeñas
          }}
        >
          ¡Bienvenidos a nuestra Iglesia!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#757575',
            fontStyle: 'italic',
            maxWidth: '700px',
            margin: '0 auto',
            fontSize: { xs: '1rem', sm: '1.1rem' }, // Ajuste de tamaño en dispositivos pequeños
          }}
        >
          Participa en nuestras actividades y únete a nuestra comunidad.
          <br />
          <strong>¡Juntos crecemos y aprendemos!</strong>
        </Typography>
      </Box>

      <Container sx={{ mt: 4, maxWidth: '850px', px: { xs: 2, sm: 4 } }}> {/* Ajuste de padding para móvil */}
        <Carousel
          autoPlay
          interval={5000}
          animation="fade"
          indicators
          navButtonsAlwaysVisible
          navButtonsProps={{
            style: {
              backgroundColor: '#ffffff',
              color: '#3f51b5',
              borderRadius: '50%',
              margin: '0 8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: '#c5cae9',
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#3f51b5',
            },
          }}
        >
          {items.map((item) => (
            <Paper
              key={item.id}
              sx={{
                padding: { xs: '20px', sm: '30px' }, // Ajuste de padding en móvil
                borderRadius: '12px',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#ffffff',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  color: '#3f51b5',
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' }, // Ajuste de tamaño de título
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  color: '#757575',
                  maxWidth: '700px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.95rem', sm: '1rem' }, // Ajuste de tamaño de fuente
                }}
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default MainLayout;
