import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Rutas: React.FC = () => {
  const [direccion, setDireccion] = useState('');
  const [gpsLink, setGpsLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [buses, setBuses] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [foto, setFoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'rutas', 'ubicacionInfo');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDireccion(data.direccion);
          setGpsLink(data.gpsLink);
          setVideoLink(data.videoLink);
          setBuses(data.buses);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'rutas', 'ubicacionInfo');
      await updateDoc(docRef, {
        direccion,
        gpsLink,
        videoLink,
        buses,
      });

      // Mostrar alerta de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        text: 'Los datos se han actualizado correctamente.',
      });
    } catch (error) {
      console.error("Error actualizando los datos: ", error);

      // Mostrar alerta de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar los datos.',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file)); // Vista previa de la imagen
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 6, position: 'relative' }}>
        {/* Botón de Regresar */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Rutas y Ubicación
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Encuentra nuestra ubicación y la forma de llegar fácilmente.
        </Typography>

        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            p: 3,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            label="Dirección"
            fullWidth
            variant="outlined"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ubicación GPS (Google Maps)"
            fullWidth
            variant="outlined"
            value={gpsLink}
            onChange={(e) => setGpsLink(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Video de Cómo llegar"
            fullWidth
            variant="outlined"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Buses que pasan por la zona"
            fullWidth
            variant="outlined"
            value={buses}
            onChange={(e) => setBuses(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button variant="contained" component="label" sx={{ fontSize: '14px', fontWeight: 'bold', padding: '8px 16px' }}>
              Subir Foto
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {fotoPreview && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Vista previa de la foto:</Typography>
              <Box component="img" src={fotoPreview} alt="Vista previa de la foto" sx={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: 2, boxShadow: 2 }} />
            </Grid>
          )}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: '#3a6073',
              color: '#fff',
              px: 3,
              py: 1,
              fontSize: '14px',
              '&:hover': { backgroundColor: '#2e4e5e' },
            }}
          >
            Actualizar Datos
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Rutas;