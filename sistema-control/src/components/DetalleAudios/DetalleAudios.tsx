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

  // Datos de ejemplo
  useEffect(() => {
    const datosEjemplo: Audio[] = [
      {
        id: '1',
        name: 'Canción 1',
        description: 'Descripción de la canción 1',
        url: 'https://example.com/cancion1.mp3',
        uploadedAt: '2024-11-01T10:00:00Z',
      },
      {
        id: '2',
        name: 'Canción 2',
        description: 'Descripción de la canción 2',
        url: 'https://example.com/cancion2.mp3',
        uploadedAt: '2024-11-15T12:00:00Z',
      },
    ];
    setAudios(datosEjemplo);
  }, []);

  // Abrir y cerrar el diálogo
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setNewAudio({ name: '', description: '', url: '', uploadedAt: '' });
  };

  // Guardar nuevo audio
  const handleGuardarAudio = () => {
    if (!newAudio.name || !newAudio.description || !newAudio.url || !newAudio.uploadedAt) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const newId = (audios.length + 1).toString(); // Generar un ID simple
    const audioConId: Audio = { id: newId, ...newAudio };

    setAudios((prev) => [...prev, audioConId]);
    handleCloseDialog(); // Cerrar el pop-up
  };

  // Eliminar audio
  const handleEliminarAudio = (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el audio de manera permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setAudios(audios.filter((audio) => audio.id !== id));
        Swal.fire('Eliminado', 'El audio ha sido eliminado.', 'success');
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
