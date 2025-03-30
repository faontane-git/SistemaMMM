import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardActionArea, 
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import ChurchIcon from '@mui/icons-material/Church';
import { useNavigate } from 'react-router-dom';

const Agenda: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      pb: 8,
      position: 'relative'
    }}>
      <Navbar />
      
      {/* Botón Regresar - Posición fija en esquina superior izquierda */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/publicar')}
        sx={{ 
          position: 'fixed',
          left: 24,
          top: 80,
          zIndex: 1000,
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)'
          }
        }}
      >
        Regresar
      </Button>

      <Container maxWidth="lg" sx={{ pt: 12 }}>
        {/* Header Section */}
        <Box sx={{ 
          textAlign: 'center',
          mb: 8
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 300,
              letterSpacing: '0.05em',
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Gestión de Horarios
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{
              mt: 2,
              color: theme.palette.text.secondary,
              fontWeight: 300
            }}
          >
            Seleccione el tipo de horario que desea administrar
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {/* Cultos Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
              <CardActionArea 
                onClick={() => navigate('/horario-cultos')}
                sx={{ height: '100%' }}
              >
                <CardContent sx={cardContentStyles}>
                  <Box sx={iconBoxStyles(theme.palette.primary.light)}>
                    <ChurchIcon sx={iconStyles} />
                  </Box>
                  <Typography variant="h5" sx={cardTitleStyles}>
                    Cultos
                  </Typography>
                  <Typography variant="body2" sx={cardSubtitleStyles}>
                    Horarios de servicios religiosos
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Consejería Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
              <CardActionArea 
                onClick={() => navigate('/horario-consejeria')}
                sx={{ height: '100%' }}
              >
                <CardContent sx={cardContentStyles}>
                  <Box sx={iconBoxStyles(theme.palette.secondary.light)}>
                    <PeopleIcon sx={iconStyles} />
                  </Box>
                  <Typography variant="h5" sx={cardTitleStyles}>
                    Consejería
                  </Typography>
                  <Typography variant="body2" sx={cardSubtitleStyles}>
                    Sesiones pastorales
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Actividades Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
              <CardActionArea 
                onClick={() => navigate('/horario-otros')}
                sx={{ height: '100%' }}
              >
                <CardContent sx={cardContentStyles}>
                  <Box sx={iconBoxStyles(theme.palette.info.light)}>
                    <EventIcon sx={iconStyles} />
                  </Box>
                  <Typography variant="h5" sx={cardTitleStyles}>
                    Actividades
                  </Typography>
                  <Typography variant="body2" sx={cardSubtitleStyles}>
                    Eventos especiales
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Estilos (se mantienen igual que en la versión anterior)
const cardStyles = {
  height: '100%',
  borderRadius: '12px',
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
  }
};

const cardContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  py: 5,
  px: 3
};

const iconBoxStyles = (color: string) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color,
  mb: 3,
  transition: 'all 0.3s ease'
});

const iconStyles = {
  fontSize: '2.5rem',
  color: '#fff'
};

const cardTitleStyles = {
  fontWeight: 400,
  mb: 1.5,
  color: 'text.primary'
};

const cardSubtitleStyles = {
  color: 'text.secondary',
  fontWeight: 300,
  fontSize: '0.9rem'
};

export default Agenda;