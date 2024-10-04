import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface RedSocial {
  id: string;
  nombre: string; // Nombre de la red social
  url: string; // Enlace a la red social
  usuario: string; // Usuario o nombre de perfil
}

const RedesSociales: React.FC = () => {
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);
  const [redSocialSeleccionada, setRedSocialSeleccionada] = useState<RedSocial | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [nuevaRedSocial, setNuevaRedSocial] = useState<RedSocial>({ id: '', nombre: '', url: '', usuario: '' });

  useEffect(() => {
    const obtenerRedesSociales = async () => {
      try {
        const db = getFirestore();
        const redesSocialesCollection = collection(db, 'RedesSociales');
        const querySnapshot = await getDocs(redesSocialesCollection);
        const redesSocialesArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as RedSocial[];
        setRedesSociales(redesSocialesArray);
      } catch (error) {
        console.error('Error al obtener redes sociales:', error);
      }
    };

    obtenerRedesSociales();
  }, []);

  const handleEditar = (redSocial: RedSocial) => {
    setRedSocialSeleccionada(redSocial);
    setOpenEditar(true);
  };

  const handleCrear = () => {
    setNuevaRedSocial({ id: '', nombre: '', url: '', usuario: '' });
    setOpenCrear(true);
  };

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setRedSocialSeleccionada(null);
  };

  const handleCloseCrear = () => {
    setOpenCrear(false);
    setNuevaRedSocial({ id: '', nombre: '', url: '', usuario: '' });
  };

  const handleChangeEditar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedSocialSeleccionada({
      ...redSocialSeleccionada!,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCrear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaRedSocial({
      ...nuevaRedSocial,
      [e.target.name]: e.target.value,
    });
  };

  const handleActualizarRedSocial = async () => {
    if (redSocialSeleccionada) {
      const db = getFirestore();
      const redSocialRef = doc(db, 'RedesSociales', redSocialSeleccionada.id);
      try {
        await updateDoc(redSocialRef, {
          nombre: redSocialSeleccionada.nombre,
          url: redSocialSeleccionada.url,
          usuario: redSocialSeleccionada.usuario,
        });

        setRedesSociales(
          redesSociales.map((redSocial) =>
            redSocial.id === redSocialSeleccionada.id ? redSocialSeleccionada : redSocial
          )
        );

        handleCloseEditar();
        Swal.fire({
          title: 'Red Social actualizada',
          text: 'La red social ha sido actualizada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        console.error('Error al actualizar la red social:', error);
      }
    }
  };

  const handleAgregarRedSocial = async () => {
    if (nuevaRedSocial.nombre && nuevaRedSocial.url && nuevaRedSocial.usuario) {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, 'RedesSociales'), {
          nombre: nuevaRedSocial.nombre,
          url: nuevaRedSocial.url,
          usuario: nuevaRedSocial.usuario,
        });

        setRedesSociales([...redesSociales, { ...nuevaRedSocial, id: docRef.id }]);

        handleCloseCrear();
        Swal.fire({
          title: 'Red Social creada',
          text: 'La nueva red social ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        console.error('Error al crear la red social:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear la red social. Por favor, inténtelo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos para crear la red social.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleEliminar = async (redSocial: RedSocial) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la red social ${redSocial.nombre}? Esta acción no se puede deshacer.`,
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
          await deleteDoc(doc(db, 'RedesSociales', redSocial.id));

          setRedesSociales(redesSociales.filter((c) => c.id !== redSocial.id));

          Swal.fire({
            title: 'Eliminado',
            text: `La red social ${redSocial.nombre} ha sido eliminada.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } catch (error) {
          console.error('Error al eliminar la red social:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la red social. Por favor, inténtelo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Redes Sociales
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Aquí puedes encontrar los enlaces a las redes sociales de nuestros pastores.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            mt: 3,
          }}
        >
          {redesSociales.map((redSocial) => (
            <Card key={redSocial.id} sx={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" component="div">
                  {redSocial.nombre}
                </Typography>
                <Typography variant="body1">{redSocial.usuario}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <a href={redSocial.url} target="_blank" rel="noopener noreferrer">
                    {redSocial.url}
                  </a>
                </Typography>
              </CardContent>
              <IconButton color="primary" onClick={() => handleEditar(redSocial)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleEliminar(redSocial)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>

        {/* Botón para crear red social en la parte inferior */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCrear}>
            Crear Red Social
          </Button>
        </Box>

        {/* Modal para editar la red social */}
        <Dialog open={openEditar} onClose={handleCloseEditar}>
          <DialogTitle>Editar Red Social</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={redSocialSeleccionada?.nombre || ''}
              onChange={handleChangeEditar}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Usuario"
              name="usuario"
              fullWidth
              value={redSocialSeleccionada?.usuario || ''}
              onChange={handleChangeEditar}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="URL"
              name="url"
              fullWidth
              value={redSocialSeleccionada?.url || ''}
              onChange={handleChangeEditar}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditar} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleActualizarRedSocial} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal para crear una nueva red social */}
        <Dialog open={openCrear} onClose={handleCloseCrear}>
          <DialogTitle>Crear Nueva Red Social</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={nuevaRedSocial.nombre}
              onChange={handleChangeCrear}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Usuario"
              name="usuario"
              fullWidth
              value={nuevaRedSocial.usuario}
              onChange={handleChangeCrear}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="URL"
              name="url"
              fullWidth
              value={nuevaRedSocial.url}
              onChange={handleChangeCrear}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrear} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAgregarRedSocial} color="primary">
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default RedesSociales;
