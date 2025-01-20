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
import { logout } from '../auth';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 🔹 Borra la sesión del usuario
    navigate('/'); // 🔹 Redirigir al login
  };

  const goToMetrics = () => {
    navigate('/metrics'); // Redirigir a métricas
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f9f4ef, #e6dfd4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: '600', color: '#3e4a59', mb: 6 }}
          >
            Configuración de Usuario
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={5}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #ffffff, #f3f3f3)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  padding: 3,
                  boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.15)',
                    transform: 'scale(1.05)',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: '600', color: '#3e4a59', mb: 2 }}>
                    Métricas
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Consulta el rendimiento y uso de almacenamiento de la aplicación.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={goToMetrics}
                    sx={{
                      backgroundColor: '#5a8f7b',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '10px 24px',
                      borderRadius: '50px',
                      '&:hover': { backgroundColor: '#487461' },
                    }}
                  >
                    Ver métricas
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #ffffff, #f3f3f3)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  padding: 3,
                  boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.15)',
                    transform: 'scale(1.05)',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: '600', color: '#3e4a59', mb: 2 }}>
                    Cerrar Sesión
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sal de tu cuenta de forma segura.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      backgroundColor: '#d9534f',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '10px 24px',
                      borderRadius: '50px',
                      '&:hover': { backgroundColor: '#c9302c' },
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
