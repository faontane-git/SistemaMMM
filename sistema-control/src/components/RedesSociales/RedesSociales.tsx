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
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Mail as MailIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
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
  const [openCrear, setOpenCrear] = useState(false);
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

  const handleOpenCrear = () => {
    setOpenCrear(true);
  };

  const handleCloseCrear = () => {
    setOpenCrear(false);
  };

  const obtenerIconoRedSocial = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon sx={{ color: '#1877F2' }} />;
      case 'instagram':
        return <InstagramIcon sx={{ color: '#E1306C' }} />;
      case 'twitter':
        return <TwitterIcon sx={{ color: '#1DA1F2' }} />;
      case 'youtube':
        return <YouTubeIcon sx={{ color: '#FF0000' }} />;
      case 'linkedin':
        return <LinkedInIcon sx={{ color: '#0077B5' }} />;
      case 'whatsapp':
        return <WhatsAppIcon sx={{ color: '#25D366' }} />;
      case 'correo':
        return <MailIcon sx={{ color: '#D93025' }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        {/* 🔹 Botón de Regresar */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </Box>

        {/* 🔹 Título */}
        <Typography variant="h4" align="center" gutterBottom>
          Redes Sociales
        </Typography>

        {/* 🔹 Botón de Crear en la siguiente línea */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Fab color="primary" size="medium" onClick={handleOpenCrear}>
            <AddIcon />
          </Fab>
        </Box>

        {/* 🔹 Lista de Redes Sociales */}
        <Grid container spacing={3}>
          {redesSociales.map((redSocial) => (
            <Grid item xs={12} sm={6} md={4} key={redSocial.id}>
              <Card sx={cardStyles}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      {obtenerIconoRedSocial(redSocial.tipo)}
                      <Typography variant="h6" sx={{ ml: 1 }}>{redSocial.nombre}</Typography>
                    </Box>
                    <Box>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {redSocial.url || redSocial.correo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🔹 Modal para Crear */}
      <Dialog open={openCrear} onClose={handleCloseCrear}>
        <DialogTitle>Crear Red Social</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select>
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Nombre" margin="normal" />
          <TextField fullWidth label="URL / Correo" margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCrear}>Cancelar</Button>
          <Button color="primary">Crear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RedesSociales;

/* 🔹 Estilos de las Tarjetas */
const cardStyles = {
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.02)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};
