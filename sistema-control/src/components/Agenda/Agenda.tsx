import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import HorarioCultos from './HorarioCultos';
import HorarioConsejeria from './HorarioConsejeria';
import HorarioOtros from './HorarioOtros';
import CalendarApp from './HorarioConsejeria';

interface Actividad {
  nombre: string;
  lugar: string;
  fechas: string;
}

const Agenda: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  if (selectedHorario === null) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Seleccione el tipo de horario
          </Typography>

          <Button
            variant="text"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#2C387E',
              fontWeight: 'bold',
              marginBottom: 4,
            }}
          >
            Atrás
          </Button>

          <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('cultos')}
              sx={{
                width: '60%',
                backgroundColor: '#2C387E',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#23305B',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Horario de Cultos
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('consejeria')}
              sx={{
                width: '60%',
                backgroundColor: '#2C387E',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#23305B',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Horario de Consejería Pastoral
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('otros')}
              sx={{
                width: '60%',
                backgroundColor: '#2C387E',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#23305B',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Actividades
            </Button>
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
