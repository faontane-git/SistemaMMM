import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  Grid,
} from '@mui/material';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Sesión cerrada');
    navigate('/'); // Redirigir a la pantalla de login
  };

  const goToMetrics = () => {
    navigate('/metrics'); // Redirigir a la pantalla de métricas
  };

  return (
    <div>
      {/* Incluimos el Navbar */}
      <Navbar />

      {/* Contenedor principal con fondo blanco */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // Alinear el contenido hacia arriba
          padding: 3, // Reducir el padding para subir el contenido
          pt: 8, // Ajustar el padding top para un mejor espaciado superior
        }}
      >
        {/* Contenedor de la tarjeta */}
        <Container maxWidth="md">
          {/* Título de la configuración */}
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3a6073', mb: 4 }}
          >
            Configuración de Usuario
          </Typography>

          {/* Opciones de configuración organizadas en un Grid */}
          <Grid container spacing={3} justifyContent="center">
            {/* Tarjeta de Métricas */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 3,
                  textAlign: 'center',
                  padding: 4,
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
                  '&:hover': { boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.15)', transform: 'scale(1.03)' },
                  transition: 'all 0.3s ease-in-out',
                  minHeight: '300px', // Definir una altura mínima uniforme
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3a6073', mb: 2 }}>
                    Métricas
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Mira las métricas de almacenamiento y consultas.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}> {/* Alinear los botones en la misma posición */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={goToMetrics}
                    sx={{
                      backgroundColor: '#3a7bd5',
                      '&:hover': { backgroundColor: '#3a6073' },
                      fontSize: '16px',
                      padding: 1.2,
                    }}
                  >
                    Ver métricas
                  </Button>
                </CardActions>
              </Card>
            </Grid>

 
            {/* Tarjeta de Cerrar Sesión */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 3,
                  textAlign: 'center',
                  padding: 4,
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
                  '&:hover': { boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.15)', transform: 'scale(1.03)' },
                  transition: 'all 0.3s ease-in-out',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3a6073', mb: 2 }}>
                    Cerrar Sesión
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Salir de la cuenta actual.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                    sx={{
                      backgroundColor: '#e53935',
                      '&:hover': { backgroundColor: '#d32f2f' },
                      fontSize: '16px',
                      padding: 1.2,
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Settings;
