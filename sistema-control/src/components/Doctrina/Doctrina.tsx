import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const Doctrina: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const [clasesDoctrinales, setClasesDoctrinales] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'doctrina', 'informacion');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMensaje(data.mensaje);
          setClasesDoctrinales(data.clasesDoctrinales);
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
      const docRef = doc(db, 'doctrina', 'informacion');
      await updateDoc(docRef, {
        mensaje,
        clasesDoctrinales,
      });

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        text: 'La información se ha actualizado correctamente.',
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

  return (
    <div>
      <Navbar />

      {/* 🔹 Botón Regresar fuera del formulario */}
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Regresar
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Doctrina
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
            label="Mensaje"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Clases Doctrinales"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={clasesDoctrinales}
            onChange={(e) => setClasesDoctrinales(e.target.value)}
          />
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

export default Doctrina;
