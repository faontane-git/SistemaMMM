import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';

interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
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

const DetalleNoticia: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const db = getFirestore();
        const noticiasCollection = collection(db, 'Noticias');
        const querySnapshot = await getDocs(noticiasCollection);
        const noticiasArray: Noticia[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Noticia[];

        setNoticias(noticiasArray);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerNoticias();
  }, []);

  const handleOpenModal = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNoticiaSeleccionada(null);
  };

  const handleEditarNoticia = async () => {
    if (noticiaSeleccionada) {
      try {
        const db = getFirestore();
        const noticiaRef = doc(db, 'Noticias', noticiaSeleccionada.id);
        await updateDoc(noticiaRef, {
          titulo: noticiaSeleccionada.titulo,
          descripcion: noticiaSeleccionada.descripcion,
          fecha: noticiaSeleccionada.fecha,
        });

        setNoticias((prevNoticias) =>
          prevNoticias.map((noticia) =>
            noticia.id === noticiaSeleccionada.id ? noticiaSeleccionada : noticia
          )
        );

        Swal.fire('Actualizado', 'La noticia ha sido actualizada exitosamente.', 'success');
        handleCloseModal();
      } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar la noticia. Por favor, intenta de nuevo.', 'error');
      }
    }
  };

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la noticia de manera permanente.',
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
          await deleteDoc(doc(db, 'Noticias', id));
          setNoticias(noticias.filter((noticia) => noticia.id !== id));
          Swal.fire('Eliminado', 'La noticia ha sido eliminada.', 'success');
        } catch (error) {
          console.error('Error al eliminar la noticia:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar la noticia. Por favor, intenta de nuevo.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
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
          Listado de Noticias
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/crear-noticia')}
          >
            Crear Nueva Noticia
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          {loading && <CircularProgress />}
        </Box>

        {!loading && (
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="table of noticias">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Título</StyledTableCell>
                    <StyledTableCell>Descripción</StyledTableCell>
                    <StyledTableCell>Fecha</StyledTableCell>
                    <StyledTableCell align="center">Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noticias.map((noticia) => (
                    <StyledTableRow key={noticia.id}>
                      <TableCell>{noticia.titulo}</TableCell>
                      <TableCell>{noticia.descripcion}</TableCell>
                      <TableCell>
                        {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="editar noticia"
                          onClick={() => handleOpenModal(noticia)}
                          sx={{ marginRight: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="eliminar noticia"
                          onClick={() => handleEliminar(noticia.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {!loading && noticias.length === 0 && (
          <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
            No se encontraron noticias.
          </Typography>
        )}
      </Container>

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Editar Noticia</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            value={noticiaSeleccionada?.titulo || ''}
            onChange={(e) =>
              setNoticiaSeleccionada({ ...noticiaSeleccionada!, titulo: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={noticiaSeleccionada?.descripcion || ''}
            onChange={(e) =>
              setNoticiaSeleccionada({ ...noticiaSeleccionada!, descripcion: e.target.value })
            }
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Fecha"
            type="date"
            value={noticiaSeleccionada?.fecha || ''}
            onChange={(e) =>
              setNoticiaSeleccionada({ ...noticiaSeleccionada!, fecha: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditarNoticia} color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetalleNoticia;
