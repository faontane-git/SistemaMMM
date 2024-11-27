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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  CircularProgress,
  TextField,
  TableContainer,
} from '@mui/material';
import Navbar from '../Navbar';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface PersonData {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  foto?: string;
}

const PersonasList: React.FC = () => {
  const [data, setData] = useState<PersonData[]>([]);
  const [filteredData, setFilteredData] = useState<PersonData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
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
          ...(doc.data() as Omit<PersonData, 'id'>),
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

    const filtered = data.filter(
      (person) =>
        person.nombres.toLowerCase().includes(query) ||
        person.apellidos.toLowerCase().includes(query) ||
        person.cedula.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
    setPage(0); // Reiniciar la paginación al cambiar la búsqueda
  };

  const handleDelete = async (personId: string) => {
    const confirmed = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed.isConfirmed) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'Personas', personId));
        const updatedData = data.filter((person) => person.id !== personId);
        setData(updatedData);
        setFilteredData(updatedData);

        Swal.fire({
          title: 'Eliminado',
          text: 'El registro ha sido eliminado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        console.error('Error deleting document:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar el registro. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleEdit = (person: PersonData) => {
    navigate(`/editar-persona/${person.id}`);
  };

  const openCrearPersonaPage = () => {
    navigate('/crear-persona');
  };

  const handleOpenPasswordDialog = (person: PersonData) => {
    setSelectedPerson(person);
    setNewPassword('');
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setSelectedPerson(null);
    setNewPassword('');
    setPasswordDialogOpen(false);
  };

  const handleSavePassword = async () => {
    if (selectedPerson && newPassword) {
      try {
        const db = getFirestore();
        const personDocRef = doc(db, 'Personas', selectedPerson.id);

        await updateDoc(personDocRef, { contraseña: newPassword });

        Swal.fire({
          title: 'Contraseña Actualizada',
          text: 'La contraseña se ha actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        handleClosePasswordDialog();
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar la contraseña. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg"> {/* Ampliamos el contenedor */}
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Personas
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={openCrearPersonaPage}>
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
                        {person.foto ? (
                          <Avatar src={person.foto} alt={`${person.nombres} ${person.apellidos}`} />
                        ) : (
                          <Avatar>{person.nombres.charAt(0)}</Avatar>
                        )}
                      </TableCell>
                      <TableCell>{person.nombres}</TableCell>
                      <TableCell>{person.apellidos}</TableCell>
                      <TableCell>{person.cedula}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(person)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 1 }}
                          onClick={() => handleDelete(person.id)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => handleOpenPasswordDialog(person)}
                        >
                          Contraseña
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

        {/* Dialog para actualizar contraseña */}
        <Dialog open={passwordDialogOpen} onClose={handleClosePasswordDialog}>
          <DialogTitle>Actualizar Contraseña</DialogTitle>
          <DialogContent>
            {selectedPerson && (
              <Typography variant="subtitle1" gutterBottom>
                {selectedPerson.nombres} {selectedPerson.apellidos}
              </Typography>
            )}
            <TextField
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePasswordDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSavePassword} color="primary" disabled={!newPassword}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default PersonasList;
