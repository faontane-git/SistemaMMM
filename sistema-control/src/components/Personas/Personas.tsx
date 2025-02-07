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
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface PersonData {
  id: string;
  Nombres: string;
  Apellidos: string;
  FechaNacimiento: string;
  Cedula: string;
  Password: string;
  Sexo: string;
  EstadoCivil: string;
  NombreCoyuge?: string;
  FechaMatrimonio?: string;
  País: string;
  CiudadResidencia: string;
  DireccionDomicilio: string;
  ContactoPersonal: string;
  ContactoEmergencia: string;
  Correo: string;
  Ministro: string;
  IglesiaActual: string;
  CargoIglesia: string;
  BautizadoAgua: string;
  FechaBaustismo?: string;
  Pastor: string;
  IglesiaBautismo: string;
  BautizadoEspirutoSanto: string;
  CasadoEclesiaticamnete: string;
  Activo: string;
  Funcion: string;
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
  
        const personasArray: PersonData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            Nombres: data.Nombres || '',
            Apellidos: data.Apellidos || '',
            FechaNacimiento: data.FechaNacimiento || '',
            Cedula: data.Cedula || '',
            Password: data.Password || '',
            Sexo: data.Sexo || '',
            EstadoCivil: data.EstadoCivil || '',
            NombreCoyuge: data.NombreCoyuge || '',
            FechaMatrimonio: data.FechaMatrimonio || '',
            País: data.País || '',
            CiudadResidencia: data.CiudadResidencia || '',
            DireccionDomicilio: data.DireccionDomicilio || '',
            ContactoPersonal: data.ContactoPersonal || '',
            ContactoEmergencia: data.ContactoEmergencia || '',
            Correo: data.Correo || '',
            Ministro: data.Ministro || '',
            IglesiaActual: data.IglesiaActual || '',
            CargoIglesia: data.CargoIglesia || '',
            BautizadoAgua: data.BautizadoAgua || '',
            FechaBaustismo: data.FechaBaustismo || '',
            Pastor: data.Pastor || '',
            IglesiaBautismo: data.IglesiaBautismo || '',
            BautizadoEspirutoSanto: data.BautizadoEspirutoSanto || '',
            CasadoEclesiaticamnete: data.CasadoEclesiaticamnete || '',
            Activo: data.Activo || '',
            Funcion: data.Funcion || '',
            Photo: data.Photo || '',
          };
        });
  
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

    const filtered = data.filter((person) => {
      const nombres = person.Nombres?.toLowerCase() || '';
      const apellidos = person.Apellidos?.toLowerCase() || '';
      const cedula = person.Cedula?.toLowerCase() || '';

      return (
        nombres.includes(query) ||
        apellidos.includes(query) ||
        cedula.includes(query)
      );
    });

    setFilteredData(filtered);
    setPage(0);
  };

  const handleCrearPersona = () => {
    navigate('/crear-persona');
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
          <Button variant="contained" color="primary" onClick={handleCrearPersona}>
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
