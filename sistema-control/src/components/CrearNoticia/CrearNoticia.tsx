import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Box, Container, TextField, Typography, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import imageCompression from 'browser-image-compression';

const CrearNoticia: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Función para manejar el cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file)); // Mostrar la vista previa de la imagen
    }
  };

  // Función para comprimir la imagen y convertirla a base64
  const compressAndConvertToBase64 = async (file: File): Promise<string> => {
    try {
      const options = {
        maxSizeMB: 1, // tamaño máximo de la imagen (1 MB)
        maxWidthOrHeight: 1024, // máximo ancho o altura de la imagen
        useWebWorker: true, // utilizar worker web para la compresión
      };

      const compressedFile = await imageCompression(file, options);

      // Convertir la imagen comprimida a base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      throw new Error('Error al comprimir la imagen');
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !descripcion || !fecha) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const db = getFirestore();
      const noticiasCollection = collection(db, 'Noticias');

      let fotoBase64 = '';
      if (foto) {
        // Comprimir y convertir la foto a base64
        fotoBase64 = await compressAndConvertToBase64(foto);
      }

      // Guardar en Firestore
      await addDoc(noticiasCollection, {
        titulo,
        descripcion,
        fecha,
        fotoBase64, // Guardar el string base64 comprimido
      });

      Swal.fire({
        title: '¡Noticia creada con éxito!',
        text: 'La noticia se ha publicado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/detalle-noticia');
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

        <Container maxWidth="sm" sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 3, padding: 4 }}>
          {/* Título del formulario */}
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Crear Nueva Noticia
          </Typography>

          {/* Formulario de creación de noticia */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
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

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                  }}
                >
                  Subir Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              {fotoPreview && (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Vista previa de la foto:
                  </Typography>
                  <Box
                    component="img"
                    src={fotoPreview}
                    alt="Vista previa de la foto"
                    sx={{
                      width: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                </Grid>
              )}
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
              Publicar Noticia
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default CrearNoticia;
