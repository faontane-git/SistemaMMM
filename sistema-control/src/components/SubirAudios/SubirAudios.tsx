import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Container, Typography, TextField, Box, Button } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const SubirAudio: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

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
      // Aquí podrías implementar la lógica para subir el archivo de audio a Firebase Storage
      // y luego obtener la URL para almacenarla en Firestore junto con el título y la descripción.
      const db = getFirestore();
      await addDoc(collection(db, 'Audios'), {
        titulo,
        descripcion,
        url: 'URL_DEL_AUDIO_SUBIDO', // Reemplaza esto con la URL del archivo subido
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
        <Typography variant="h4" align="center" gutterBottom>
          Subir Audio
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            label="Título del Audio"
            fullWidth
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mb: 2 }}
            color="primary"
          >
            Seleccionar Archivo
            <input type="file" hidden accept="audio/*" onChange={handleFileChange} />
          </Button>
          {archivo && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Archivo seleccionado: {archivo.name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpload}
          >
            Subir Audio
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SubirAudio;
