import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import HorarioCultos from './HorarioCultos';
import HorarioConsejeria from './HorarioConsejeria';
import HorarioOtros from './HorarioOtros';

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

  // Horario de Cultos (con la interfaz Actividad)
  const horarioCultos: { dia: string; actividades: string[] }[] = [
    { dia: 'Lunes', actividades: ['Consejería Individual, 10:00 - 12:00'] },
    { dia: 'Miércoles', actividades: ['Consejería Grupal, 14:00 - 16:00'] },
    { dia: 'Viernes', actividades: ['Consejería de Parejas, 18:00 - 20:00'] },
  ];

  // Horario de Consejería Pastoral
  const horarioConsejeria: { dia: string; actividades: string[] }[] = [
    { dia: 'Lunes', actividades: ['Consejería Individual, 10:00 - 12:00'] },
    { dia: 'Miércoles', actividades: ['Consejería Grupal, 14:00 - 16:00'] },
    { dia: 'Viernes', actividades: ['Consejería de Parejas, 18:00 - 20:00'] },
  ];

  // Horario de Otros
  const horarioOtros: { dia: string; actividades: Actividad[] }[] = [
    { dia: 'Lunes', actividades: [{ nombre: 'Reunión de Equipos', lugar: 'Salón de reuniones', fechas: '15:00 - 17:00' }] },
    { dia: 'Jueves', actividades: [{ nombre: 'Taller de Desarrollo Personal', lugar: 'Auditorio', fechas: '18:00 - 20:00' }] },
    { dia: 'Sábado', actividades: [{ nombre: 'Actividad Recreativa', lugar: 'Parque Central', fechas: '10:00 - 12:00' }] },
  ];

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
        {selectedHorario === 'cultos' && <HorarioCultos horario={horarioCultos} />}
        {selectedHorario === 'consejeria' && <HorarioConsejeria horario={horarioConsejeria} />}
        {selectedHorario === 'otros' && <HorarioOtros horario={horarioOtros} />}
      </Container>
    </div>
  );
};

export default Agenda;
