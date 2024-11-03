import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
  foto: string;
}

const Contactos: React.FC = () => {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [contactoSeleccionado, setContactoSeleccionado] = useState<Contacto | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [nuevoContacto, setNuevoContacto] = useState<Contacto>({ id: '', nombre: '', telefono: '', foto: '' });
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null);

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const db = getFirestore();
        const contactosCollection = collection(db, 'Contactos');
        const querySnapshot = await getDocs(contactosCollection);
        const contactosArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Contacto[];
        setContactos(contactosArray);
      } catch (error) {
        console.error('Error al obtener contactos:', error);
      }
    };

    obtenerContactos();
  }, []);

  const handleEditar = (contacto: Contacto) => {
    setContactoSeleccionado(contacto);
    setNombreArchivo(null);
    setOpenEditar(true);
  };

  const handleCrear = () => {
    setNuevoContacto({ id: '', nombre: '', telefono: '', foto: '' });
    setOpenCrear(true);
  };

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setContactoSeleccionado(null);
    setNombreArchivo(null);
  };

  const handleCloseCrear = () => {
    setOpenCrear(false);
    setNuevoContacto({ id: '', nombre: '', telefono: '', foto: '' });
    setNombreArchivo(null);
  };

  const handleChangeEditar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactoSeleccionado({
      ...contactoSeleccionado!,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCrear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoContacto({
      ...nuevoContacto,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, modo: 'crear' | 'editar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (modo === 'crear') {
          setNuevoContacto({ ...nuevoContacto, foto: reader.result as string });
        } else if (modo === 'editar' && contactoSeleccionado) {
          setContactoSeleccionado({ ...contactoSeleccionado, foto: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
      setNombreArchivo(file.name);
    }
  };

  const handleActualizarContacto = async () => {
    if (contactoSeleccionado) {
      const db = getFirestore();
      const contactoRef = doc(db, 'Contactos', contactoSeleccionado.id);
      try {
        await updateDoc(contactoRef, {
          nombre: contactoSeleccionado.nombre,
          telefono: contactoSeleccionado.telefono,
          foto: contactoSeleccionado.foto,
        });

        setContactos(
          contactos.map((contacto) =>
            contacto.id === contactoSeleccionado.id ? contactoSeleccionado : contacto
          )
        );

        handleCloseEditar();
        Swal.fire('Contacto actualizado', 'El contacto ha sido actualizado exitosamente.', 'success');
      } catch (error) {
        console.error('Error al actualizar el contacto:', error);
      }
    }
  };

  const handleAgregarContacto = async () => {
    if (nuevoContacto.nombre && nuevoContacto.telefono && nuevoContacto.foto) {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, 'Contactos'), {
          nombre: nuevoContacto.nombre,
          telefono: nuevoContacto.telefono,
          foto: nuevoContacto.foto,
        });

        setContactos([...contactos, { ...nuevoContacto, id: docRef.id }]);

        handleCloseCrear();
        Swal.fire('Contacto creado', 'El nuevo contacto ha sido creado exitosamente.', 'success');
      } catch (error) {
        console.error('Error al crear el contacto:', error);
        Swal.fire('Error', 'Hubo un problema al crear el contacto. Por favor, inténtelo de nuevo.', 'error');
      }
    } else {
      Swal.fire('Campos incompletos', 'Por favor, completa todos los campos para crear el contacto.', 'warning');
    }
  };

  const handleEliminar = async (contacto: Contacto) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${contacto.nombre}? Esta acción no se puede deshacer.`,
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
          await deleteDoc(doc(db, 'Contactos', contacto.id));
          setContactos(contactos.filter((c) => c.id !== contacto.id));
          Swal.fire('Eliminado', `El contacto ${contacto.nombre} ha sido eliminado.`, 'success');
        } catch (error) {
          console.error('Error al eliminar el contacto:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el contacto. Por favor, inténtelo de nuevo.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        {/* Botón de Regresar en la parte superior izquierda */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>

        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '18px' }}>
          Contactos
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Aquí puedes encontrar los datos de contacto de nuestros pastores.
        </Typography>

        {/* Botón para crear contacto en la parte superior */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCrear}>
            Crear Contacto
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {contactos.map((contacto) => (
            <Card key={contacto.id} sx={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt={contacto.nombre}
                src={contacto.foto}
                sx={{ width: 80, height: 80, margin: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" component="div" sx={{ fontSize: '16px' }}>
                  {contacto.nombre}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <PhoneIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="body1">{contacto.telefono}</Typography>
                </Box>
              </CardContent>
              <IconButton color="primary" onClick={() => handleEditar(contacto)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleEliminar(contacto)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>

        {/* Modal para editar el contacto */}
        <Dialog open={openEditar} onClose={handleCloseEditar}>
          <DialogTitle>Editar Contacto</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={contactoSeleccionado?.nombre || ''}
              onChange={handleChangeEditar}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              name="telefono"
              fullWidth
              value={contactoSeleccionado?.telefono || ''}
              onChange={handleChangeEditar}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 2 }}
              color="primary"
            >
              Reemplazar Foto
              <input type="file" hidden accept="image/*" onChange={(e) => handleUploadImage(e, 'editar')} />
            </Button>
            {nombreArchivo && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Archivo seleccionado: {nombreArchivo}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditar} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleActualizarContacto} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal para crear un nuevo contacto */}
        <Dialog open={openCrear} onClose={handleCloseCrear}>
          <DialogTitle>Crear Nuevo Contacto</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={nuevoContacto.nombre}
              onChange={handleChangeCrear}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              name="telefono"
              fullWidth
              value={nuevoContacto.telefono}
              onChange={handleChangeCrear}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 2 }}
              color="primary"
            >
              Subir Foto
              <input type="file" hidden accept="image/*" onChange={(e) => handleUploadImage(e, 'crear')} />
            </Button>
            {nombreArchivo && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Archivo seleccionado: {nombreArchivo}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrear} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAgregarContacto} color="primary">
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Contactos;
