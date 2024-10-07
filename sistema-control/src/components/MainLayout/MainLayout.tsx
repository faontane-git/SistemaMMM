import React from 'react';
import Navbar from '../Navbar';
import Carousel from 'react-material-ui-carousel'; // Carrusel de Material-UI
import { Paper, Typography, Box, Button, Grid, Container } from '@mui/material';
import './MainLayout.css';

// Imágenes para el carrusel (puedes sustituir con las imágenes que desees)
const items = [
  { id: 1, image: 'https://via.placeholder.com/800x400?text=Imagen+1', title: 'Bienvenido a la Iglesia MMM' },
  { id: 2, image: 'https://via.placeholder.com/800x400?text=Imagen+2', title: 'Únete a nuestras actividades' },
  { id: 3, image: 'https://via.placeholder.com/800x400?text=Imagen+3', title: 'Creciendo juntos en comunidad' }
];

const MainLayout: React.FC = () => {
  return (
    <div>
      {/* Incluye el Navbar */}
      <Navbar />
      
      {/* Carrusel de imágenes */}
      <Carousel>
        {items.map((item) => (
          <Paper key={item.id} sx={{ position: 'relative' }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>

      {/* Contenido del Menú Principal */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 5, fontWeight: 'bold' }}>
          Menú Principal
        </Typography>

        <Grid container spacing={4}>
          {/* Publicar Nuevo Contenido */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                Publicar Nuevo Contenido
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Comparte tus ideas o anuncios con la comunidad. Publica contenido fresco y relevante para todos.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => alert('Crear Publicación')}>
                Crear Publicación
              </Button>
            </Paper>
          </Grid>

          {/* Administrar Publicaciones */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                Administrar Publicaciones
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Revisa, edita o elimina las publicaciones anteriores que hayas hecho. Mantén tu contenido actualizado.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => alert('Administrar')}>
                Administrar
              </Button>
            </Paper>
          </Grid>

          {/* Perfil de Usuario */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                Perfil de Usuario
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Configura tus preferencias de usuario, actualiza tu foto de perfil o cambia tu contraseña.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => alert('Ver Perfil')}>
                Ver Perfil
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainLayout;
