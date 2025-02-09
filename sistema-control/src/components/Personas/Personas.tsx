import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Avatar,
  CircularProgress,
  TextField,
  TableContainer,
} from '@mui/material';
import Navbar from '../Navbar';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface PersonData {
  id: string;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Photo?: string;
}

const PersonasList: React.FC = () => {
  const [data, setData] = useState<PersonData[]>([]);
  const [filteredData, setFilteredData] = useState<PersonData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const db = getFirestore();
        const personasCollection = collection(db, 'Personas');
        const querySnapshot = await getDocs(personasCollection);
  
        const personasArray: PersonData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Nombres: doc.data().Nombres || '',
          Apellidos: doc.data().Apellidos || '',
          Cedula: doc.data().Cedula || '',
          Photo: doc.data().Photo || '',
        }));
  
        setData(personasArray);
        setFilteredData(personasArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((person) =>
      person.Nombres.toLowerCase().includes(query) ||
      person.Apellidos.toLowerCase().includes(query) ||
      person.Cedula.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
    setPage(0);
  };

  const handleEditar = (id: string) => {
    navigate(`/editar-persona/${id}`);
  };

  const handleCambiarContraseña = (id: string) => {
    Swal.fire({
      title: 'Cambiar Contraseña',
      input: 'password',
      inputLabel: 'Nueva Contraseña',
      inputPlaceholder: 'Ingrese la nueva contraseña',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: (newPassword) => {
        if (!newPassword) {
          Swal.showValidationMessage('Debe ingresar una contraseña válida');
          return false;
        }
        return newPassword;
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const db = getFirestore();
          const personDocRef = doc(db, 'Personas', id);
          await updateDoc(personDocRef, { Password: result.value });

          Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success');
        } catch (error) {
          Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error');
        }
      }
    });
  };

  const handleEliminar = async (id: string) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar Persona?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'Personas', id));
        
        const updatedData = data.filter((person) => person.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);

        Swal.fire('Eliminado', 'Persona eliminada correctamente', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la persona', 'error');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box mt={4} mb={2} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Lista de Personas
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mb={3}>
          <Button variant="contained" color="primary" onClick={() => navigate('/crear-persona')}>
            Crear Persona
          </Button>
        </Box>

        <Box mb={3}>
          <TextField
            label="Buscar Personas"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            size="small"
            fullWidth
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : filteredData.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Nombres</TableCell>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Cédula</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person) => (
                    <TableRow key={person.id}>
                      <TableCell>
                        {person.Photo ? (
                          <Avatar src={person.Photo} alt={`${person.Nombres} ${person.Apellidos}`} />
                        ) : (
                          <Avatar>{person.Nombres.charAt(0)}</Avatar>
                        )}
                      </TableCell>
                      <TableCell>{person.Nombres}</TableCell>
                      <TableCell>{person.Apellidos}</TableCell>
                      <TableCell>{person.Cedula}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEditar(person.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleCambiarContraseña(person.id)}
                        >
                          Contraseña
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleEliminar(person.id)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No se encontraron personas con el criterio de búsqueda.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default PersonasList;
