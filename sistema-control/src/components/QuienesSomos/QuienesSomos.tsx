import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Navbar';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const QuienesSomos: React.FC = () => {
  const [nombreIglesia, setNombreIglesia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  const [galeria, setGaleria] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'iglesia', 'quienesSomos');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombreIglesia(data.nombreIglesia || '');
        setDescripcion(data.descripcion || '');
        setMision(data.mision || '');
        setVision(data.vision || '');
        setGaleria(data.galeria || []);
      }
    };
    fetchData();
  }, []);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 800;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const compressedImages = await Promise.all(files.map(compressImage));
      setGaleria([...galeria, ...compressedImages]);
    }
  };

  const eliminarImagen = (index: number) => {
    const nuevaGaleria = galeria.filter((_, i) => i !== index);
    setGaleria(nuevaGaleria);
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
        galeria,
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
            {galeria.map((src, index) => (
              <Grid item xs={4} key={index} sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={src}
                  alt={`Imagen ${index + 1}`}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => eliminarImagen(index)}
                  sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
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
