import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getFirestore, getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';

interface Audio {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme?.palette?.primary?.main || '#1976d2',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme?.palette?.action?.hover || '#f5f5f5',
  },
}));

const DetalleAudio: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([
    {
      id: '1',
      titulo: 'Sermón de Domingo',
      descripcion: 'Un sermón inspirador sobre la fe y la comunidad.',
      url: 'https://example.com/audio/sermon-domingo.mp3'
    },
    {
      id: '2',
      titulo: 'Alabanza Matutina',
      descripcion: 'Un audio especial para empezar el día con gratitud.',
      url: 'https://example.com/audio/alabanza-matutina.mp3'
    },
    {
      id: '3',
      titulo: 'Testimonio de María',
      descripcion: 'María nos cuenta su inspiradora historia de superación.',
      url: 'https://example.com/audio/testimonio-maria.mp3'
    },
    {
      id: '4',
      titulo: 'Clase sobre el Éxodo',
      descripcion: 'Estudio detallado sobre el libro del Éxodo.',
      url: 'https://example.com/audio/clase-exodo.mp3'
    },
    {
      id: '5',
      titulo: 'Reflexión sobre la Esperanza',
      descripcion: 'Una breve reflexión sobre el poder de la esperanza.',
      url: 'https://example.com/audio/reflexion-esperanza.mp3'
    },
    {
      id: '6',
      titulo: 'Oración por la Paz',
      descripcion: 'Oración especial por la paz en el mundo.',
      url: 'https://example.com/audio/oracion-paz.mp3'
    },
    {
      id: '7',
      titulo: 'Invitación a la Vigilia',
      descripcion: 'Te invitamos a nuestra vigilia mensual el próximo viernes.',
      url: 'https://example.com/audio/invitacion-vigilia.mp3'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [audioSeleccionado, setAudioSeleccionado] = useState<Audio | null>(null);

  const handleOpenModal = (audio: Audio) => {
    setAudioSeleccionado(audio);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setAudioSeleccionado(null);
  };

  const handleEditarAudio = async () => {
    if (audioSeleccionado) {
      try {
        const db = getFirestore();
        const audioRef = doc(db, 'Audios', audioSeleccionado.id);
        await updateDoc(audioRef, {
          titulo: audioSeleccionado.titulo,
          descripcion: audioSeleccionado.descripcion,
        });

        setAudios((prevAudios) =>
          prevAudios.map((audio) =>
            audio.id === audioSeleccionado.id ? audioSeleccionado : audio
          )
        );

        Swal.fire('Actualizado', 'El audio ha sido actualizado exitosamente.', 'success');
        handleCloseModal();
      } catch (error) {
        console.error('Error al actualizar el audio:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el audio. Por favor, intenta de nuevo.', 'error');
      }
    }
  };

  const handleEliminar = (id: string) => {
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
          const db = getFirestore();
          await deleteDoc(doc(db, 'Audios', id));
          setAudios(audios.filter((audio) => audio.id !== id));
          Swal.fire('Eliminado', 'El audio ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar el audio:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el audio. Por favor, intenta de nuevo.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Actualización de Audios
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          {loading && <CircularProgress />}
        </Box>
        {!loading && (
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label="table of audios">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Título</StyledTableCell>
                  <StyledTableCell>Descripción</StyledTableCell>
                  <StyledTableCell>Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audios.map((audio) => (
                  <StyledTableRow key={audio.id}>
                    <TableCell>{audio.titulo}</TableCell>
                    <TableCell>{audio.descripcion}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="editar audio"
                        onClick={() => handleOpenModal(audio)}
                        sx={{ marginRight: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="eliminar audio"
                        onClick={() => handleEliminar(audio.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!loading && audios.length === 0 && (
          <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
            No se encontraron audios.
          </Typography>
        )}
      </Container>

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Editar Audio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            value={audioSeleccionado?.titulo || ''}
            onChange={(e) =>
              setAudioSeleccionado({ ...audioSeleccionado!, titulo: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={audioSeleccionado?.descripcion || ''}
            onChange={(e) =>
              setAudioSeleccionado({ ...audioSeleccionado!, descripcion: e.target.value })
            }
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditarAudio} color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetalleAudio;
