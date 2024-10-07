import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail'; // Icono para el correo
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

interface RedSocial {
  id: string;
  tipo: string; // Tipo de red social (Facebook, Instagram, etc.)
  nombre: string;
  url: string;
  usuario: string;
  correo: string;
}

const RedesSociales: React.FC = () => {
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);
  const [redSocialSeleccionada, setRedSocialSeleccionada] = useState<RedSocial | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [nuevaRedSocial, setNuevaRedSocial] = useState<RedSocial>({ id: '', tipo: '', nombre: '', url: '', usuario: '', correo: '' });

  // Obtener las redes sociales desde Firestore
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

  // Función para abrir el modal de edición
  const handleOpenEditar = (redSocial: RedSocial) => {
    setRedSocialSeleccionada(redSocial);
    setOpenEditar(true);
  };

  // Función para abrir el modal de creación
  const handleOpenCrear = () => {
    setNuevaRedSocial({ id: '', tipo: '', nombre: '', url: '', usuario: '', correo: '' });
    setOpenCrear(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEditar = () => {
    setOpenEditar(false);
    setRedSocialSeleccionada(null);
  };

  // Función para cerrar el modal de creación
  const handleCloseCrear = () => {
    setOpenCrear(false);
    setNuevaRedSocial({ id: '', tipo: '', nombre: '', url: '', usuario: '', correo: '' });
  };

  // Función para manejar los cambios en los TextField
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRedSocialSeleccionada((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  // Función para manejar los cambios del Select
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setRedSocialSeleccionada((prevState) => ({
      ...prevState!,
      [name!]: value,
    }));
  };

  // Función para manejar los cambios en los TextField del modal de creación
  const handleTextFieldChangeCrear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaRedSocial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar los cambios del Select del modal de creación
  const handleSelectChangeCrear = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNuevaRedSocial((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

  // Función para actualizar la red social en Firestore
  const handleActualizarRedSocial = async () => {
    if (redSocialSeleccionada) {
      const db = getFirestore();
      const redSocialRef = doc(db, 'RedesSociales', redSocialSeleccionada.id);
      try {
        await updateDoc(redSocialRef, {
          tipo: redSocialSeleccionada.tipo,
          nombre: redSocialSeleccionada.nombre,
          url: redSocialSeleccionada.url,
          usuario: redSocialSeleccionada.usuario,
          correo: redSocialSeleccionada.correo,
        });

        setRedesSociales(
          redesSociales.map((redSocial) =>
            redSocial.id === redSocialSeleccionada.id ? redSocialSeleccionada : redSocial
          )
        );

        handleCloseEditar();
        Swal.fire('Red Social actualizada', 'La red social ha sido actualizada exitosamente.', 'success');
      } catch (error) {
        console.error('Error al actualizar la red social:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar la red social. Por favor, inténtalo de nuevo.', 'error');
      }
    }
  };

  // Función para agregar una nueva red social a Firestore
  const handleCrearRedSocial = async () => {
    if (nuevaRedSocial.tipo && nuevaRedSocial.nombre && (nuevaRedSocial.url || nuevaRedSocial.correo)) {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, 'RedesSociales'), {
          tipo: nuevaRedSocial.tipo,
          nombre: nuevaRedSocial.nombre,
          url: nuevaRedSocial.url,
          usuario: nuevaRedSocial.usuario,
          correo: nuevaRedSocial.correo,
        });

        setRedesSociales([...redesSociales, { ...nuevaRedSocial, id: docRef.id }]);
        handleCloseCrear();
        Swal.fire('Red Social creada', 'La nueva red social ha sido creada exitosamente.', 'success');
      } catch (error) {
        console.error('Error al crear la red social:', error);
        Swal.fire('Error', 'Hubo un problema al crear la red social. Por favor, inténtalo de nuevo.', 'error');
      }
    } else {
      Swal.fire('Campos incompletos', 'Por favor, completa todos los campos para crear la red social.', 'warning');
    }
  };

  // Función para eliminar la red social de Firestore
  const handleEliminarRedSocial = async (redSocial: RedSocial) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la red social ${redSocial.nombre}? Esta acción no se puede deshacer.`,
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

          setRedesSociales(redesSociales.filter((item) => item.id !== redSocial.id));
          Swal.fire('Eliminada', 'La red social ha sido eliminada exitosamente.', 'success');
        } catch (error) {
          console.error('Error al eliminar la red social:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar la red social. Por favor, inténtalo de nuevo.', 'error');
        }
      }
    });
  };

  // Función para obtener el ícono según el nombre de la red social
  const obtenerIconoRedSocial = (tipo: string | undefined) => {
    if (!tipo) return null;

    switch (tipo?.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon fontSize="large" color="primary" />;
      case 'instagram':
        return <InstagramIcon fontSize="large" sx={{ color: '#E1306C' }} />;
      case 'twitter':
        return <TwitterIcon fontSize="large" color="primary" />;
      case 'youtube':
        return <YouTubeIcon fontSize="large" sx={{ color: '#FF0000' }} />;
      case 'linkedin':
        return <LinkedInIcon fontSize="large" sx={{ color: '#0077B5' }} />;
      case 'whatsapp':
        return <WhatsAppIcon fontSize="large" sx={{ color: '#25D366' }} />;
      case 'correo':
        return <MailIcon fontSize="large" sx={{ color: '#D93025' }} />; // Ícono de correo
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Redes Sociales
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Aquí puedes ver todas las redes sociales de la iglesia y su comunidad.
        </Typography>

        {/* Botón para agregar nueva red social */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Fab color="primary" aria-label="add" onClick={handleOpenCrear}>
            <AddIcon />
          </Fab>
        </Box>

        {/* Mostrar las redes sociales en un Grid */}
        <Grid container spacing={5} justifyContent="center">
          {redesSociales.map((redSocial) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={redSocial.id}> {/* Ajuste para que sean más grandes */}
              <Card
                sx={{
                  height: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 4, // Más padding para tarjetas más grandes
                  borderRadius: 4,
                  boxShadow: 5,
                  backgroundColor: '#f7f7f7',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.08)', boxShadow: 8 }, // Mayor efecto en hover
                }}
              >
                <CardContent>
                  {/* Muestra el icono de la red social */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {obtenerIconoRedSocial(redSocial.tipo)}
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {redSocial.nombre}
                  </Typography>
                  {redSocial.tipo?.toLowerCase() === 'correo' ? (
                    <Typography variant="body2" color="text.secondary">
                      Correo: {redSocial.correo}
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Usuario: {redSocial.usuario}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <a href={redSocial.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#3b5998' }}>
                          {redSocial.url}
                        </a>
                      </Typography>
                    </>
                  )}
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <IconButton color="primary" onClick={() => handleOpenEditar(redSocial)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleEliminarRedSocial(redSocial)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal para editar la red social */}
        <Dialog open={openEditar} onClose={handleCloseEditar}>
          <DialogTitle>Editar Red Social</DialogTitle>
          <DialogContent>
            {/* Campo tipo con Select */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Red Social</InputLabel>
              <Select
                label="Tipo de Red Social"
                name="tipo"
                value={redSocialSeleccionada?.tipo || ''}
                onChange={handleSelectChange}
              >
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Twitter">Twitter</MenuItem>
                <MenuItem value="YouTube">YouTube</MenuItem>
                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                <MenuItem value="Correo">Correo</MenuItem> {/* Opción de correo */}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={redSocialSeleccionada?.nombre || ''}
              onChange={handleTextFieldChange}
              sx={{ mb: 2 }}
            />
            {redSocialSeleccionada?.tipo?.toLowerCase() === 'correo' ? (
              <TextField
                margin="dense"
                label="Correo"
                name="correo"
                fullWidth
                value={redSocialSeleccionada?.correo || ''}
                onChange={handleTextFieldChange}
                sx={{ mb: 2 }}
              />
            ) : (
              <>
                <TextField
                  margin="dense"
                  label="Usuario"
                  name="usuario"
                  fullWidth
                  value={redSocialSeleccionada?.usuario || ''}
                  onChange={handleTextFieldChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="URL"
                  name="url"
                  fullWidth
                  value={redSocialSeleccionada?.url || ''}
                  onChange={handleTextFieldChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}
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
            {/* Campo tipo con Select */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Red Social</InputLabel>
              <Select
                label="Tipo de Red Social"
                name="tipo"
                value={nuevaRedSocial.tipo}
                onChange={handleSelectChangeCrear}
              >
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Twitter">Twitter</MenuItem>
                <MenuItem value="YouTube">YouTube</MenuItem>
                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                <MenuItem value="Correo">Correo</MenuItem> {/* Opción de correo */}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={nuevaRedSocial.nombre}
              onChange={handleTextFieldChangeCrear}
              sx={{ mb: 2 }}
            />
            {nuevaRedSocial.tipo?.toLowerCase() === 'correo' ? (
              <TextField
                margin="dense"
                label="Correo"
                name="correo"
                fullWidth
                value={nuevaRedSocial.correo}
                onChange={handleTextFieldChangeCrear}
                sx={{ mb: 2 }}
              />
            ) : (
              <>
                <TextField
                  margin="dense"
                  label="Usuario"
                  name="usuario"
                  fullWidth
                  value={nuevaRedSocial.usuario}
                  onChange={handleTextFieldChangeCrear}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="URL"
                  name="url"
                  fullWidth
                  value={nuevaRedSocial.url}
                  onChange={handleTextFieldChangeCrear}
                  sx={{ mb: 2 }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrear} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCrearRedSocial} color="primary">
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default RedesSociales;
