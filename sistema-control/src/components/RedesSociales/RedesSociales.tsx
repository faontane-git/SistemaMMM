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
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

interface RedSocial {
  id: string;
  tipo: string;
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
  const navigate = useNavigate();

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

  const handleOpenEditar = (redSocial: RedSocial) => {
    setRedSocialSeleccionada(redSocial);
    setOpenEditar(true);
  };

  const handleOpenCrear = () => {
    setNuevaRedSocial({ id: '', tipo: '', nombre: '', url: '', usuario: '', correo: '' });
    setOpenCrear(true);
  };

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setRedSocialSeleccionada(null);
  };

  const handleCloseCrear = () => {
    setOpenCrear(false);
    setNuevaRedSocial({ id: '', tipo: '', nombre: '', url: '', usuario: '', correo: '' });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRedSocialSeleccionada((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setRedSocialSeleccionada((prevState) => ({
      ...prevState!,
      [name!]: value,
    }));
  };

  const handleTextFieldChangeCrear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaRedSocial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChangeCrear = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNuevaRedSocial((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

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
        return <MailIcon fontSize="large" sx={{ color: '#D93025' }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* Botón de Regresar */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Box>

        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '24px' }}>
          Redes Sociales
        </Typography>
        
        {/* Botón de Crear */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Fab color="primary" aria-label="add" onClick={handleOpenCrear}>
            <AddIcon />
          </Fab>
        </Box>

        {/* Redes Sociales */}
        <Grid container spacing={3}>
          {redesSociales.map((redSocial) => (
            <Grid item xs={12} sm={6} md={4} key={redSocial.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    {obtenerIconoRedSocial(redSocial.tipo)}
                    <Box>
                      <IconButton onClick={() => handleOpenEditar(redSocial)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEliminarRedSocial(redSocial)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="h6">{redSocial.nombre}</Typography>
                  <Typography variant="body2">{redSocial.url || redSocial.correo}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Crear Red Social */}
        <Dialog open={openCrear} onClose={handleCloseCrear}>
          <DialogTitle>Crear Red Social</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth margin="normal">
                <InputLabel id="tipo-label">Tipo</InputLabel>
                <Select
                  labelId="tipo-label"
                  id="tipo"
                  name="tipo"
                  value={nuevaRedSocial.tipo}
                  label="Tipo"
                  onChange={handleSelectChangeCrear}
                >
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="Twitter">Twitter</MenuItem>
                  <MenuItem value="YouTube">YouTube</MenuItem>
                  <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                  <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                  <MenuItem value="Correo">Correo</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nombre"
                value={nuevaRedSocial.nombre}
                onChange={handleTextFieldChangeCrear}
              />
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                margin="normal"
                name="url"
                value={nuevaRedSocial.url}
                onChange={handleTextFieldChangeCrear}
              />
              <TextField
                label="Usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                name="usuario"
                value={nuevaRedSocial.usuario}
                onChange={handleTextFieldChangeCrear}
              />
              <TextField
                label="Correo"
                variant="outlined"
                fullWidth
                margin="normal"
                name="correo"
                value={nuevaRedSocial.correo}
                onChange={handleTextFieldChangeCrear}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrear}>Cancelar</Button>
            <Button onClick={handleCrearRedSocial} color="primary">Crear</Button>
          </DialogActions>
        </Dialog>

        {/* Editar Red Social */}
        <Dialog open={openEditar} onClose={handleCloseEditar}>
          <DialogTitle>Editar Red Social</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth margin="normal">
                <InputLabel id="tipo-label">Tipo</InputLabel>
                <Select
                  labelId="tipo-label"
                  id="tipo"
                  name="tipo"
                  value={redSocialSeleccionada?.tipo || ''}
                  label="Tipo"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="Twitter">Twitter</MenuItem>
                  <MenuItem value="YouTube">YouTube</MenuItem>
                  <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                  <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                  <MenuItem value="Correo">Correo</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nombre"
                value={redSocialSeleccionada?.nombre || ''}
                onChange={handleTextFieldChange}
              />
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                margin="normal"
                name="url"
                value={redSocialSeleccionada?.url || ''}
                onChange={handleTextFieldChange}
              />
              <TextField
                label="Usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                name="usuario"
                value={redSocialSeleccionada?.usuario || ''}
                onChange={handleTextFieldChange}
              />
              <TextField
                label="Correo"
                variant="outlined"
                fullWidth
                margin="normal"
                name="correo"
                value={redSocialSeleccionada?.correo || ''}
                onChange={handleTextFieldChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditar}>Cancelar</Button>
            <Button onClick={handleActualizarRedSocial} color="primary">Actualizar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default RedesSociales;
