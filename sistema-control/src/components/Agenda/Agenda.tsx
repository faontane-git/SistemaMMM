import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import HorarioCultos from './HorarioCultos';
import HorarioConsejeria from './HorarioConsejeria';
import HorarioOtros from './HorarioOtros';
import CalendarApp from './HorarioConsejeria';

// Definición de la interfaz Actividad directamente aquí
interface Actividad {
  nombre: string;
  lugar: string;
  fechas: string;
}

const Agenda: React.FC = () => {
  const navigate = useNavigate();

  // Estado para determinar qué horario mostrar
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  // Si no se ha seleccionado un horario, mostramos la pantalla de selección
  if (selectedHorario === null) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Seleccione el tipo de horario
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('cultos')}
              sx={{
                width: '50%',
                backgroundColor: '#1976d2',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Horario de Cultos
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('consejeria')}
              sx={{
                width: '50%',
                backgroundColor: '#4caf50',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#388e3c' },
              }}
            >
              Horario de Consejería Pastoral
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedHorario('otros')}
              sx={{
                width: '50%',
                backgroundColor: '#ff9800',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#f57c00' },
              }}
            >
              Horario de Otros
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  // Si se ha seleccionado un horario, mostramos el horario correspondiente
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Button
          variant="text"
          onClick={() => setSelectedHorario(null)}
          startIcon={<ArrowBackIcon />}
          sx={{ color: '#1976d2' }}
        >
          Volver
        </Button>
        {selectedHorario === 'cultos' && <HorarioCultos/>}
        {selectedHorario === 'consejeria' && <CalendarApp/>}
        {selectedHorario === 'otros' && <HorarioOtros/>}
      </Container>
    </div>
  );
};

export default Agenda;
