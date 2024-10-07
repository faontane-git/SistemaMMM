import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
} from '@mui/material';

const CrearNoticia: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Conexión a Firestore
      const db = getFirestore();
      const noticiasCollection = collection(db, 'Noticias');

      // Agregar nueva noticia a la base de datos
      await addDoc(noticiasCollection, {
        titulo,
        descripcion,
        fecha,
      });

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: '¡Noticia creada con éxito!',
        text: 'La noticia se ha publicado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        // Redirigir a la pantalla de noticias después de cerrar el SweetAlert
        navigate('/noticia-eventos'); // Asegúrate de que esta ruta coincida con la ruta correcta
      });
    } catch (error) {
      console.error('Error al crear la noticia:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear la noticia. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar */}

      {/* Contenedor Principal */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        <Container maxWidth="sm" sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 3, padding: 4 }}>
          {/* Título del formulario */}
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3a6073' }}>
            Crear Nueva Noticia
          </Typography>

          {/* Formulario de creación de noticia */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {/* Campo de Título */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ingrese el título de la noticia"
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Campo de Descripción */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ingrese la descripción detallada de la noticia"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

              {/* Campo de Fecha */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Botón para publicar la noticia */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 4,
                backgroundColor: '#3a7bd5',
                '&:hover': {
                  backgroundColor: '#3a6073',
                },
                fontSize: '16px',
                fontWeight: 'bold',
                padding: 1.5,
              }}
            >
              Publicar Noticia
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default CrearNoticia;
