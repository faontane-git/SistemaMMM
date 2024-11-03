import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { Container, Typography, TextField, Box, Button, IconButton, Card, CardContent } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubirAudio: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!titulo || !archivo) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa el título y selecciona un archivo de audio.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'Audios'), {
        titulo,
        descripcion,
        url: 'URL_DEL_AUDIO_SUBIDO',
      });

      Swal.fire({
        title: 'Audio Subido',
        text: 'El audio ha sido subido exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setTitulo('');
      setDescripcion('');
      setArchivo(null);
    } catch (error) {
      console.error('Error al subir el audio:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al subir el audio. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {/* Botón de regresar fuera del recuadro */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>
        
        <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
              <AudiotrackIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography variant="h4" align="center">
                Subir Audio
              </Typography>
            </Box>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                label="Título del Audio"
                fullWidth
                variant="outlined"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton color="primary" component="label" sx={{ mr: 2 }}>
                  <UploadFileIcon />
                  <input type="file" hidden accept="audio/*" onChange={handleFileChange} />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado'}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpload}
                sx={{
                  mt: 3,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'none',
                  padding: 1.5,
                }}
              >
                Subir Audio
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SubirAudio;
