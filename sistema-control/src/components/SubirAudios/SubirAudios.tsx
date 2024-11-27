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
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
      if (selectedFile.size > 10 * 1024 * 1024) {
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

  // Manejar subida del archivo
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

    setSubiendo(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `audios/${archivo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, archivo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progreso de la subida: ${progress}%`);
        },
        (error) => {
          console.error('Error durante la subida:', error);
          Swal.fire({
            title: 'Error al subir el audio',
            text: `Detalles: ${error.message || 'Error desconocido.'}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          setSubiendo(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          const db = getFirestore();
          await addDoc(collection(db, 'Audios'), {
            titulo,
            descripcion,
            url: downloadURL,
            fecha: new Date().toISOString(),
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
          setSubiendo(false);
        }
      );
    } catch (error: any) {
      console.error('Error al subir el audio:', error);
      Swal.fire({
        title: 'Error al subir el audio',
        text: `Detalles: ${error.message || 'Error desconocido.'}`,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      setSubiendo(false);
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
                  <input
                    type="file"
                    hidden
                    accept="audio/*"
                    onChange={handleFileChange}
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
