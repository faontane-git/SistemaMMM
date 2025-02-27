import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';
import Navbar from '../Navbar';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const QuienesSomos: React.FC = () => {
  const [nombreIglesia, setNombreIglesia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  const [galeria, setGaleria] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGaleria([...galeria, ...files]);
      setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
    }
  };

  const handleSubmit = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'iglesia', 'quienesSomos');
      await setDoc(docRef, {
        nombreIglesia,
        descripcion,
        mision,
        vision,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Información guardada',
        text: 'Los datos se han guardado correctamente.',
      });
    } catch (error) {
      console.error("Error guardando los datos: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los datos.',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ¿Quiénes Somos?
        </Typography>
        <Box sx={{ backgroundColor: '#f9f9f9', p: 3, borderRadius: 2, boxShadow: 2 }}>
          <TextField
            label="Nombre de la Iglesia"
            fullWidth
            variant="outlined"
            value={nombreIglesia}
            onChange={(e) => setNombreIglesia(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Misión"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={mision}
            onChange={(e) => setMision(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Visión"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Subir Imágenes
            <input type="file" accept="image/*" multiple hidden onChange={handleFileChange} />
          </Button>
          <Grid container spacing={2}>
            {previews.map((src, index) => (
              <Grid item xs={4} key={index}>
                <Box component="img" src={src} alt={`Imagen ${index + 1}`} sx={{ width: '100%', borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: '#3a6073', color: '#fff', px: 3, py: 1 }}
          >
            Guardar Información
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default QuienesSomos;
