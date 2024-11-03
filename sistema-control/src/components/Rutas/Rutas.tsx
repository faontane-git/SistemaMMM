import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, IconButton } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const Rutas: React.FC = () => {
  const [direccion, setDireccion] = useState('');
  const [gpsLink, setGpsLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [buses, setBuses] = useState('');
  const navigate = useNavigate();

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
      alert('Datos actualizados correctamente');
    } catch (error) {
      console.error("Error actualizando los datos: ", error);
      alert('Error al actualizar los datos');
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

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#3a6073', fontSize: '24px' }}
        >
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
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: '#3a6073',
              color: '#fff',
              px: 4,
              py: 1.5,
              fontSize: '16px',
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