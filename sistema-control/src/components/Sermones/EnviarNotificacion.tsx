import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EnviarNotificacion: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [topic, setTopic] = useState('general'); // Por defecto, enviará al topic "general"
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !mensaje) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      // Enviar la notificación al backend
      const response = await axios.post('http://localhost:3001/send-notification', {
        title: titulo,
        body: mensaje,
        topic,
      });

      Swal.fire({
        title: '¡Notificación enviada!',
        text: 'La notificación se envió con éxito a los dispositivos.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la notificación. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Contenedor Principal */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          pt: 8,
          position: 'relative',
        }}
      >
        {/* Botón de regresar */}
        <Box display="flex" justifyContent="flex-start" mb={2} sx={{ width: '100%', maxWidth: 'sm' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>

        <Container
          maxWidth={isSmallScreen ? 'xs' : 'sm'}
          sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 3, padding: 4 }}
        >
          {/* Título del formulario */}
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Enviar Notificación
          </Typography>

          {/* Formulario de envío de notificación */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ingrese el título de la notificación"
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Ingrese el contenido del mensaje"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Topic (Opcional)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ingrese el topic (por defecto: general)"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 4,
                fontSize: '16px',
                fontWeight: 'bold',
                padding: 1.5,
              }}
            >
              Enviar Notificación
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default EnviarNotificacion;
