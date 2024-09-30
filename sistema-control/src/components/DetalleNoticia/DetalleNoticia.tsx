import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getFirestore, getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

// Definir una interfaz para la noticia individual
interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
}

// Estilos personalizados para la tabla y los componentes, con validación de 'theme'
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

  // Obtener datos desde Firestore
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

  // Función para manejar la eliminación de noticias
  const handleEliminar = async (id: string) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'Noticias', id));
      setNoticias(noticias.filter((noticia) => noticia.id !== id));
      alert('Noticia eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
    }
  };

  // Función para manejar la edición de noticias
  const handleEditar = (id: string) => {
    console.log(`Editar noticia con ID: ${id}`);
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Listado de Noticias
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          {loading && <CircularProgress />}
        </Box>
        {!loading && (
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
                    <TableCell>{noticia.fecha}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="editar noticia"
                        onClick={() => handleEditar(noticia.id)}
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
        )}
        {!loading && noticias.length === 0 && (
          <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
            No se encontraron noticias.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default DetalleNoticia;
