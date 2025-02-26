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
  useTheme
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShareIcon from '@mui/icons-material/Share';
import MapIcon from '@mui/icons-material/Map';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import HomeIcon from '@mui/icons-material/Home';

// Definimos los items fuera del componente para evitar recreaciones innecesarias
const publishOptions = [
  {
    to: "/bienvenida",
    icon: <HomeIcon sx={{ fontSize: 35, color: '#ffeb3b', mb: 1 }} />,
    title: "Bienvenida",
    description: "Explora nuestra comunidad y conoce más sobre nosotros.",
  },
  {
    to: "/detalle-noticia",
    icon: <EventIcon sx={{ fontSize: 35, color: '#1976d2', mb: 1 }} />,
    title: "Noticia y eventos",
    description: "Mantente informado con noticias y eventos relevantes de la comunidad.",
  },
  {
    to: "/detalle-audio",
    icon: <AudiotrackIcon sx={{ fontSize: 35, color: '#673ab7', mb: 1 }} />,
    title: "Mensajes",
    description: "Escucha sermones y mensajes de audio de nuestros líderes.",
  },
  {
    to: "/rutas",
    icon: <MapIcon sx={{ fontSize: 35, color: '#4caf50', mb: 1 }} />,
    title: "Rutas",
    description: "Encuentra las mejores rutas para llegar a nuestras instalaciones.",
  },
  {
    to: "/agenda",
    icon: <ScheduleIcon sx={{ fontSize: 35, color: '#d32f2f', mb: 1 }} />,
    title: "Agenda",
    description: "Consulta la agenda de eventos y reuniones programadas.",
  },
  {
    to: "/redes-sociales",
    icon: <ShareIcon sx={{ fontSize: 35, color: '#ff5722', mb: 1 }} />,
    title: "Redes Sociales",
    description: "Conéctate con nosotros a través de nuestras redes sociales oficiales.",
  }
];

const PublishPage: React.FC = () => {
  const theme = useTheme(); // Usamos el tema para obtener los colores correctos

  return (
    <div>
      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default, // Usamos el tema global
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Panel de Publicaciones
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {publishOptions.map(({ to, icon, title, description }, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <CardActionArea component={Link} to={to} aria-label={title}>
                    <CardContent sx={{ textAlign: 'center', padding: 1.5 }}>
                      {icon}
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default PublishPage;
