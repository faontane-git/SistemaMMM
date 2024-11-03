import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Navbar from '../Navbar';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface PersonData {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
  sexo: string;
  estadoCivil: string;
  conyuge: string;
  pais: string;
  ciudadResidencia: string;
  direccionDomicilio: string;
  correo: string;
  contactoPersonal: string;
  contactoEmergencia: string;
  iglesiaActual: string;
  cargoIglesia: string;
  bautizadoAgua: string;
  fechaBautizo: string;
  pastor: string;
  iglesiaBautismo: string;
  bautizadoEspirituSanto: string;
  casadoEclesiasticamente: string;
  fechaMatrimonio: string;
  ministro: string;
  iglesiaMatrimonio: string;
}

const PersonasList: React.FC = () => {
  const [data, setData] = useState<PersonData[]>([]);
  const [filteredData, setFilteredData] = useState<PersonData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter(person =>
      person.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (person: PersonData) => {
    setSelectedPerson(person);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPerson(null);
  };

  const handleDelete = async (personId: string) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'Personas', personId));

      setData(data.filter((person) => person.id !== personId));

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
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Personas
        </Typography>

        <TextField
          label="Buscar por nombre o apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        />

        {filteredData.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person, index) => (
                  <TableRow key={index}>
                    <TableCell>{person.nombres}</TableCell>
                    <TableCell>{person.apellidos}</TableCell>
                    <TableCell>{person.cedula}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(person)}
                        sx={{ mr: 1 }}
                      >
                        Más Información
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(person.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No se encontraron datos de personas.
          </Typography>
        )}

        {/* Dialog for more information */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Información Completa</DialogTitle>
          <DialogContent>
            {selectedPerson && (
              <>
                <Typography variant="subtitle1"><strong>Nombres:</strong> {selectedPerson.nombres}</Typography>
                <Typography variant="subtitle1"><strong>Apellidos:</strong> {selectedPerson.apellidos}</Typography>
                <Typography variant="subtitle1"><strong>Cédula:</strong> {selectedPerson.cedula}</Typography>
                <Typography variant="subtitle1"><strong>Fecha de Nacimiento:</strong> {selectedPerson.fechaNacimiento}</Typography>
                <Typography variant="subtitle1"><strong>Sexo:</strong> {selectedPerson.sexo}</Typography>
                <Typography variant="subtitle1"><strong>Estado Civil:</strong> {selectedPerson.estadoCivil}</Typography>
                <Typography variant="subtitle1"><strong>Conyuge:</strong> {selectedPerson.conyuge}</Typography>
                <Typography variant="subtitle1"><strong>País:</strong> {selectedPerson.pais}</Typography>
                <Typography variant="subtitle1"><strong>Ciudad de Residencia:</strong> {selectedPerson.ciudadResidencia}</Typography>
                <Typography variant="subtitle1"><strong>Dirección de Domicilio:</strong> {selectedPerson.direccionDomicilio}</Typography>
                <Typography variant="subtitle1"><strong>Correo:</strong> {selectedPerson.correo}</Typography>
                <Typography variant="subtitle1"><strong>Contacto Personal:</strong> {selectedPerson.contactoPersonal}</Typography>
                <Typography variant="subtitle1"><strong>Contacto de Emergencia:</strong> {selectedPerson.contactoEmergencia}</Typography>
                <Typography variant="subtitle1"><strong>Iglesia Actual:</strong> {selectedPerson.iglesiaActual}</Typography>
                <Typography variant="subtitle1"><strong>Cargo en la Iglesia:</strong> {selectedPerson.cargoIglesia}</Typography>
                <Typography variant="subtitle1"><strong>Bautizado en Agua:</strong> {selectedPerson.bautizadoAgua}</Typography>
                <Typography variant="subtitle1"><strong>Fecha de Bautizo:</strong> {selectedPerson.fechaBautizo}</Typography>
                <Typography variant="subtitle1"><strong>Pastor:</strong> {selectedPerson.pastor}</Typography>
                <Typography variant="subtitle1"><strong>Iglesia de Bautismo:</strong> {selectedPerson.iglesiaBautismo}</Typography>
                <Typography variant="subtitle1"><strong>Bautizado en Espíritu Santo:</strong> {selectedPerson.bautizadoEspirituSanto}</Typography>
                <Typography variant="subtitle1"><strong>Casado Eclesiásticamente:</strong> {selectedPerson.casadoEclesiasticamente}</Typography>
                <Typography variant="subtitle1"><strong>Fecha de Matrimonio:</strong> {selectedPerson.fechaMatrimonio}</Typography>
                <Typography variant="subtitle1"><strong>Ministro:</strong> {selectedPerson.ministro}</Typography>
                <Typography variant="subtitle1"><strong>Iglesia de Matrimonio:</strong> {selectedPerson.iglesiaMatrimonio}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default PersonasList;
