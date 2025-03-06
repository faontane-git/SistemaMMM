import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const Rutas: React.FC = () => {
  const [nombreIglesia, setNombreIglesia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [gpsLink, setGpsLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [buses, setBuses] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'rutas', 'ubicacionInfo');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreIglesia(data.nombreIglesia || '');
          setDireccion(data.direccion);
          setGpsLink(data.gpsLink);
          setVideoLink(data.videoLink);
          setBuses(data.buses);
          if (data.fotoBase64) {
            setFotoPreview(data.fotoBase64);
          }
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
        nombreIglesia,
        direccion,
        gpsLink,
        videoLink,
        buses,
        fotoBase64,
      });

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        text: 'Los datos se han actualizado correctamente.',
      });
    } catch (error) {
      console.error("Error actualizando los datos: ", error);
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
      setFotoPreview(URL.createObjectURL(file));
      compressImage(file);
    }
  };

  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setFotoBase64(compressedBase64);
      };
    };
  };

  return (
    <div>
      <Navbar />

      {/* 🔹 Botón Regresar afuera del formulario */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Regresar
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Rutas y Ubicación
        </Typography>

        <Box sx={{ backgroundColor: '#f9f9f9', p: 3, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <TextField label="Nombre de la Iglesia" fullWidth variant="outlined" value={nombreIglesia} onChange={(e) => setNombreIglesia(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Dirección" fullWidth variant="outlined" value={direccion} onChange={(e) => setDireccion(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Ubicación GPS (Google Maps)" fullWidth variant="outlined" value={gpsLink} onChange={(e) => setGpsLink(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Video de Cómo llegar" fullWidth variant="outlined" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Buses que pasan por la zona" fullWidth variant="outlined" value={buses} onChange={(e) => setBuses(e.target.value)} sx={{ mb: 2 }} />

          <Button variant="contained" component="label">
            Subir Foto
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>

          {fotoPreview && (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="textSecondary">Vista previa de la foto:</Typography>
              <Box component="img" src={fotoPreview} alt="Vista previa de la foto" sx={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: 2, boxShadow: 2 }} />
            </Grid>
          )}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleUpdate} sx={{ backgroundColor: '#3a6073', color: '#fff' }}>
            Actualizar Datos
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Rutas;
