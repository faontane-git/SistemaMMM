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
    
          {/* Botón "Atrás" colocado debajo del título */}
          <Button
            variant="text"
            onClick={() => navigate(-1)}  // Navega hacia la página anterior
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#1976d2',
              fontWeight: 'bold',
              marginBottom: 4,  // Espaciado entre el botón y los siguientes elementos
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
                backgroundColor: '#1976d2',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1565c0',
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
                backgroundColor: '#4caf50',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#388e3c',
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
                backgroundColor: '#ff9800',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '12px 0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f57c00',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
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
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1000, // Aseguramos que el botón esté por encima de otros elementos
          }}
        >
          Volver
        </Button>
        {selectedHorario === 'cultos' && <HorarioCultos />}
        {selectedHorario === 'consejeria' && <CalendarApp />}
        {selectedHorario === 'otros' && <HorarioOtros />}
      </Container>
    </div>
  );
};

export default Agenda;
