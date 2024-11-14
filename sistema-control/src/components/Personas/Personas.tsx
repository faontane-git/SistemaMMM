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
  CircularProgress
} from '@mui/material';
import Navbar from '../Navbar';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

interface PersonData {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  foto?: string;
}

const PersonasList: React.FC = () => {
  const [data, setData] = useState<PersonData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Orden inicial ascendente
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

        // Orden ascendente por defecto
        const sortedData = personasArray.sort((a, b) => (a.nombres < b.nombres ? -1 : 1));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a.nombres < b.nombres) return sortOrder === 'asc' ? -1 : 1;
      if (a.nombres > b.nombres) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Alterna el orden
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
    }
  };

  const handleOpenModal = async (person: PersonData) => {
    setSelectedPerson(person);
    setPhoto(null);

    const db = getFirestore();
    const personDocRef = doc(db, 'Personas', person.id);
    const personDoc = await getDoc(personDocRef);

    if (personDoc.exists() && personDoc.data().foto) {
      setPhoto(personDoc.data().foto);
    } else {
      Swal.fire({
        title: 'Foto no encontrada',
        text: 'Hay que subir foto.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
    setPhoto(null);
    setOpenModal(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo procesar la imagen. Por favor, intenta con otra.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleSavePhoto = async () => {
    if (selectedPerson && photo) {
      try {
        const db = getFirestore();
        const personDocRef = doc(db, 'Personas', selectedPerson.id);

        await updateDoc(personDocRef, { foto: photo });

        setData((prevData) =>
          prevData.map((person) =>
            person.id === selectedPerson.id ? { ...person, foto: photo } : person
          )
        );

        Swal.fire({
          title: 'Foto Subida',
          text: 'La foto se ha subido correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        handleCloseModal();
      } catch (error) {
        console.error('Error al subir la foto:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al subir la foto. Por favor, inténtalo de nuevo.',
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

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Personas
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={openCrearPersonaPage}>
            Crear Persona
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : data.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Foto</TableCell>
                  <TableCell onClick={handleSort} style={{ cursor: 'pointer' }}>
                    Nombres ▲
                  </TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person) => (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
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
            No se encontraron datos de personas.
          </Typography>
        )}

        {/* Modal para subir foto */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Subir Foto</DialogTitle>
          <DialogContent>
            {selectedPerson && (
              <>
                <Typography variant="subtitle1">
                  {selectedPerson.nombres} {selectedPerson.apellidos}
                </Typography>
                <Typography variant="subtitle2">Cédula: {selectedPerson.cedula}</Typography>
              </>
            )}
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              {photo ? (
                <Avatar
                  src={photo}
                  alt="Preview"
                  sx={{ width: 150, height: 150, mb: 2, borderRadius: 0 }}
                />
              ) : (
                <Typography color="textSecondary" mt={2}>
                  Hay que subir foto.
                </Typography>
              )}
              <Button
                variant="contained"
                component="label"
                disabled={!!photo}
              >
                Seleccionar Foto
                <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={handleSavePhoto}
              color="primary"
              disabled={!photo}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default PersonasList;
