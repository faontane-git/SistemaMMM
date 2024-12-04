import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Navbar from '../Navbar'; // Importación del componente Navbar
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import { firestore } from "../../firebase"; // Asegúrate de que esta sea la configuración correcta
import { collection, getDocs, doc, addDoc, deleteDoc  } from "firebase/firestore"; // Asegúrate de importar 'query' y 'where'

interface Audio {
  id: string;
  name: string;
  description: string;
  url: string;
  uploadedAt: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SubirMusica: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [open, setOpen] = useState(false);
  const [newAudio, setNewAudio] = useState<Omit<Audio, 'id'>>({
    name: '',
    description: '',
    url: '',
    uploadedAt: '',
  });
  const [loading, setLoading] = useState(false);

  // Obtener audios desde Firebase Firestore
  useEffect(() => {
    const obtenerAudios = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Audios'));
        const audiosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Audio[];
        setAudios(audiosData);
      } catch (error) {
        console.error('Error al obtener audios:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerAudios();
  }, []);

  // Abrir y cerrar el diálogo
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setNewAudio({ name: '', description: '', url: '', uploadedAt: '' });
  };

  // Guardar nuevo audio en Firestore
  const handleGuardarAudio = async () => {
    if (!newAudio.name || !newAudio.description || !newAudio.url || !newAudio.uploadedAt) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Guardar el audio en Firestore
      const docRef = await addDoc(collection(firestore, 'Audios'), {
        ...newAudio,
        uploadedAt: new Date(newAudio.uploadedAt).toISOString(),
      });

      // Agregar el audio con el ID generado por Firestore
      setAudios((prev) => [
        ...prev,
        { id: docRef.id, ...newAudio },
      ]);

      handleCloseDialog(); // Cerrar el pop-up
    } catch (error) {
      console.error('Error al guardar el audio:', error);
    }
  };

  // Eliminar audio de Firestore
  const handleEliminarAudio = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el audio de manera permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(firestore, 'Audios', id)); // Eliminar el audio de Firestore
          setAudios(audios.filter((audio) => audio.id !== id));
          Swal.fire('Eliminado', 'El audio ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar el audio:', error);
        }
      }
    });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Administrar Música
          </Typography>
        </Paper>

        {/* Botón para Crear Audio */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
            Crear Audio
          </Button>
        </Box>

        {/* Cargando datos */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          {loading && <CircularProgress />}
        </Box>

        {/* Tabla de audios */}
        <Typography variant="h5" gutterBottom>
          Lista de Audios
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell><strong>Nombre</strong></StyledTableCell>
                <StyledTableCell><strong>Descripción</strong></StyledTableCell>
                <StyledTableCell><strong>Fecha</strong></StyledTableCell>
                <StyledTableCell><strong>URL</strong></StyledTableCell>
                <StyledTableCell><strong>Acciones</strong></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audios.map((audio) => (
                <StyledTableRow key={audio.id}>
                  <TableCell>{audio.name}</TableCell>
                  <TableCell>{audio.description}</TableCell>
                  <TableCell>
                    {new Date(audio.uploadedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <a href={audio.url} target="_blank" rel="noopener noreferrer">
                      Ver Archivo
                    </a>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => alert(`Editando ${audio.name}`)} sx={{ marginRight: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEliminarAudio(audio.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {audios.length === 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            No hay audios subidos.
          </Typography>
        )}
      </Container>

      {/* Diálogo para crear audio */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Crear Nuevo Audio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={newAudio.name}
            onChange={(e) => setNewAudio({ ...newAudio, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={newAudio.description}
            onChange={(e) => setNewAudio({ ...newAudio, description: e.target.value })}
            sx={{ mb: 2 }}
            multiline
          />
          <TextField
            fullWidth
            label="Fecha"
            type="date"
            value={newAudio.uploadedAt}
            onChange={(e) => setNewAudio({ ...newAudio, uploadedAt: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL"
            value={newAudio.url}
            onChange={(e) => setNewAudio({ ...newAudio, url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleGuardarAudio} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubirMusica;
