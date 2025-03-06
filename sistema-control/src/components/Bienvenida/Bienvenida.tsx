import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, TextField, Button, useTheme } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface BienvenidaData {
  Titulo: string;
  Mensaje: string;
}

const BienvenidaPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [bienvenida, setBienvenida] = useState<BienvenidaData>({ Titulo: '', Mensaje: '' });
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBienvenida = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Bienvenida'));
        querySnapshot.forEach((doc) => {
          const data = doc.data() as BienvenidaData;
          setBienvenida(data);
          setDocId(doc.id);
        });
      } catch (error) {
        console.error('Error al obtener la colección de Bienvenida:', error);
      }
    };

    fetchBienvenida();
  }, []);

  const handleUpdate = async () => {
    if (!docId) return;
    if (!bienvenida.Titulo.trim() || !bienvenida.Mensaje.trim()) {
      Swal.fire('Campos vacíos', 'Por favor, completa ambos campos antes de actualizar.', 'warning');
      return;
    }

    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar la bienvenida?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
      });

      if (result.isConfirmed) {
        await updateDoc(doc(firestore, 'Bienvenida', docId), {
          Titulo: bienvenida.Titulo,
          Mensaje: bienvenida.Mensaje,
        });
        Swal.fire('Actualizado', 'La bienvenida ha sido actualizada.', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar la Bienvenida:', error);
      Swal.fire('Error', 'No se pudo actualizar la bienvenida.', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      {/* 🔹 Botón Regresar */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/publicar')}
        >
          Regresar
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 2, // 🔹 Menos espacio arriba
          paddingBottom: 4,
        }}
      >
        <Container maxWidth="sm" sx={{ backgroundColor: theme.palette.background.paper, padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Bienvenida
          </Typography>
          <TextField
            fullWidth
            label="Título"
            variant="outlined"
            margin="normal"
            value={bienvenida.Titulo}
            onChange={(e) => setBienvenida({ ...bienvenida, Titulo: e.target.value })}
          />
          <TextField
            fullWidth
            label="Mensaje"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={bienvenida.Mensaje}
            onChange={(e) => setBienvenida({ ...bienvenida, Mensaje: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleUpdate}
          >
            Actualizar
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default BienvenidaPage;
