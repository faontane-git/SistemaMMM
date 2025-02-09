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
import Navbar from '../Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import { firestore } from "../../firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 
interface Audio {
  id: string;
  name: string;
  description: string;
  url: string;
  uploadedAt: string;
}

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
}));

const SubirMusica: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingAudioId, setEditingAudioId] = useState<string | null>(null);
  const [newAudio, setNewAudio] = useState<Omit<Audio, 'id'>>({
    name: '',
    description: '',
    url: '',
    uploadedAt: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerAudios = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Audios'));
        const audiosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Audio, 'id'>,
        }));
        setAudios(audiosData);
      } catch (error) {
        console.error('Error al obtener audios:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los audios.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } finally {
        setLoading(false);
      }
    };

    obtenerAudios();
  }, []);

  const handleOpenDialog = (audio?: Audio) => {
    if (audio) {
      setEditingAudioId(audio.id);
      setNewAudio({
        name: audio.name,
        description: audio.description,
        url: audio.url,
        uploadedAt: audio.uploadedAt ? new Date(audio.uploadedAt).toISOString().split("T")[0] : '',
      });
    } else {
      setEditingAudioId(null);
      setNewAudio({ name: '', description: '', url: '', uploadedAt: '' });
    }
    setOpen(true);
  };

  const handleEliminarAudio = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(firestore, 'Audios', id));
          setAudios(prevAudios => prevAudios.filter(audio => audio.id !== id));
          Swal.fire({
            title: 'Eliminado',
            text: 'El audio ha sido eliminado.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } catch (error) {
          console.error('Error al eliminar el audio:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el audio.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewAudio({ name: '', description: '', url: '', uploadedAt: '' });
    setEditingAudioId(null);
  };

  const handleGuardarAudio = async () => {
    if (!newAudio.name || !newAudio.description || !newAudio.url || !newAudio.uploadedAt) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setSaving(true);
    setOpen(false);

    try {
      if (editingAudioId) {
        const audioRef = doc(firestore, 'Audios', editingAudioId);
        await updateDoc(audioRef, {
          ...newAudio,
          uploadedAt: new Date(newAudio.uploadedAt).toISOString(),
        });

        setAudios(prevAudios => prevAudios.map(audio =>
          audio.id === editingAudioId ? { id: editingAudioId, ...newAudio } : audio
        ));

        Swal.fire({
          title: 'Éxito',
          text: 'El audio se ha actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const docRef = await addDoc(collection(firestore, 'Audios'), {
          ...newAudio,
          uploadedAt: new Date(newAudio.uploadedAt).toISOString(),
        });

        setAudios(prevAudios => [...prevAudios, { id: docRef.id, ...newAudio }]);

        Swal.fire({
          title: 'Éxito',
          text: 'El audio se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al guardar el audio:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el audio.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleEditAudio = (audio: Audio) => {
    navigate('/crear-audio', { state: { audio } });
  };

  return (
    <div>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ position: 'absolute', left: 0 }} // 🔹 Fija el botón a la izquierda
          >
            Regresar
          </Button>
          <Typography variant="h4" align="center">
            Audios
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => handleNavigation("/crear-audio")}>
            Crear Audio
          </Button>
        </Box>

        {loading && <CircularProgress />}

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Descripción</StyledTableCell>
                <StyledTableCell>Fecha</StyledTableCell>
                <StyledTableCell>Archivo</StyledTableCell>
                <StyledTableCell>Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audios.map((audio) => (
                <StyledTableRow key={audio.id}>
                  <TableCell>{audio.name}</TableCell>
                  <TableCell>{audio.description}</TableCell>
                  <TableCell>{new Date(audio.uploadedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <a href={audio.url} target="_blank" rel="noopener noreferrer">
                      Ver Archivo
                    </a>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditAudio(audio)}>
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
      </Container>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingAudioId ? 'Editar Audio' : 'Crear Nuevo Audio'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Nombre" value={newAudio.name} onChange={(e) => setNewAudio({ ...newAudio, name: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Descripción" value={newAudio.description} onChange={(e) => setNewAudio({ ...newAudio, description: e.target.value })} sx={{ mb: 2 }} multiline />
          <TextField fullWidth label="URL" value={newAudio.url} onChange={(e) => setNewAudio({ ...newAudio, url: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Fecha" type="date" value={newAudio.uploadedAt} onChange={(e) => setNewAudio({ ...newAudio, uploadedAt: e.target.value })} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleGuardarAudio} color="primary" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : editingAudioId ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubirMusica;
