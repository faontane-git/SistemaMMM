import React, { useState } from 'react';
import { Container, Typography, Box, Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import ChurchIcon from '@mui/icons-material/Church';
import { useNavigate } from 'react-router-dom';
import HorarioCultos from './HorarioCultos';
import HorarioConsejeria from './HorarioConsejeria';
import HorarioOtros from './HorarioOtros';
import CalendarApp from './HorarioConsejeria';

const Agenda: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  if (selectedHorario === null) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5 }}>
          {/* 🔹 Encabezado con Botón y Título */}
          <Box position="relative" display="flex" justifyContent="center" alignItems="center" mb={4}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ position: 'absolute', left: 0 }}
            >
              Regresar
            </Button>
            <Typography variant="h4" align="center">
              Seleccione el tipo de Horario
            </Typography>
          </Box>

          {/* 🔹 Tarjetas para Seleccionar Horarios */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" gap={3} mt={4}>
            {/* Tarjeta: Cultos */}
            <Card sx={cardStyles} onClick={() => setSelectedHorario('cultos')}>
              <CardActionArea>
                <CardMedia sx={iconContainer}>
                  <ChurchIcon sx={iconStyle} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Horario de Cultos
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* Tarjeta: Consejería */}
            <Card sx={cardStyles} onClick={() => setSelectedHorario('consejeria')}>
              <CardActionArea>
                <CardMedia sx={iconContainer}>
                  <PeopleIcon sx={iconStyle} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Horario de Consejería Pastoral
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* Tarjeta: Actividades */}
            <Card sx={cardStyles} onClick={() => setSelectedHorario('otros')}>
              <CardActionArea>
                <CardMedia sx={iconContainer}>
                  <EventIcon sx={iconStyle} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Actividades
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {selectedHorario === 'cultos' && <HorarioCultos />}
        {selectedHorario === 'consejeria' && <CalendarApp />}
        {selectedHorario === 'otros' && <HorarioOtros />}
      </Container>
    </div>
  );
};

export default Agenda;

/* 🔹 Estilos para Tarjetas */
const cardStyles = {
  width: { xs: '100%', md: '30%' },
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

/* 🔹 Estilos para Iconos */
const iconContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
};

const iconStyle = {
  fontSize: '3rem',
  color: '#2C387E',
};
