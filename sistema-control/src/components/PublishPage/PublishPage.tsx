import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShareIcon from '@mui/icons-material/Share';
import MapIcon from '@mui/icons-material/Map';  // Icono para la opción de Rutas

const PublishPage: React.FC = () => {
  return (
    <div>
      {/* Navbar en la parte superior */}
      <Navbar />

      {/* Contenedor Principal */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#ffffff', // Fondo blanco
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Título Principal */}
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}
          >
            Panel de Publicaciones
          </Typography>

          {/* Menú de opciones con tarjetas en una fila */}
          <Grid container spacing={4} justifyContent="center">
            {/* Opción 1: Noticia y eventos */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardActionArea component={Link} to="/noticia-eventos">
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <EventIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Noticia y eventos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mantente informado con noticias y eventos relevantes de la comunidad.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            {/* Opción 2: Contactos */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardActionArea component={Link} to="/contactos">
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <ContactsIcon sx={{ fontSize: 60, color: '#388e3c', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Contactos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accede a los contactos de miembros y líderes de la comunidad.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            {/* Opción 3: Agenda */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardActionArea component={Link} to="/agenda">
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <ScheduleIcon sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Agenda
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Consulta la agenda de eventos y reuniones programadas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            {/* Opción 4: Redes Sociales */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardActionArea component={Link} to="/redes-sociales">
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <ShareIcon sx={{ fontSize: 60, color: '#ff5722', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Redes Sociales
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Conéctate con nosotros a través de nuestras redes sociales oficiales.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            {/* Opción 5: Rutas (Nueva opción) */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardActionArea component={Link} to="/rutas">
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <MapIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Rutas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Encuentra las mejores rutas para llegar a nuestras instalaciones.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>

          {/* Contenido renderizado de las rutas seleccionadas */}
          <Box sx={{ mt: 4 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default PublishPage;
