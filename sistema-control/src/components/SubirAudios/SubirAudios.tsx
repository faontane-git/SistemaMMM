import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 
const SubirAudio: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const navigate = useNavigate();

  // Manejar selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
      if (!validTypes.includes(selectedFile.type)) {
        Swal.fire({
          title: 'Formato no válido',
          text: 'Por favor, selecciona un archivo de audio válido (MP3, WAV, OGG).',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        setArchivo(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {  // Máximo 10MB
        Swal.fire({
          title: 'Archivo demasiado grande',
          text: 'El archivo no debe superar los 10 MB.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        setArchivo(null);
        return;
      }
      setArchivo(selectedFile);
    }
  };

 
  // Subir el archivo comprimido a Firestore como base64
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

 
  };

  return (
    <div>
      <Navbar />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={subiendo}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
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
                disabled={subiendo}
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
                disabled={subiendo}
              />
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton color="primary" component="label" sx={{ mr: 2 }}>
                  <UploadFileIcon />
                  <input
                    type="file"
                    hidden
                    accept="audio/*"
                    onChange={handleFileChange}
                    disabled={subiendo}
                  />
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
                disabled={!titulo || !archivo || subiendo}
                sx={{
                  mt: 3,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'none',
                  padding: 1.5,
                }}
              >
                {subiendo ? 'Subiendo...' : 'Subir Audio'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SubirAudio;
