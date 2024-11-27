import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importar el plugin TimeGrid
import esLocale from '@fullcalendar/core/locales/es'; // Importar el idioma español

const Agenda: React.FC = () => {
  const navigate = useNavigate();

  // Estado para determinar qué horario mostrar
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  // Horario de Cultos
  const horarioCultos = [
    { dia: 'Martes', actividades: ['Ayuno, 09:00 - 13:00', 'Culto de Oración, 19:00 - 21:00'] },
    { dia: 'Miércoles', actividades: ['Culto de Enseñanza, 19:00 - 21:00'] },
    { dia: 'Jueves', actividades: ['Culto de Caballeros, 19:00 - 21:00'] },
    { dia: 'Viernes', actividades: ['Culto de Damas, 19:00 - 21:00'] },
    { dia: 'Sábado', actividades: ['Culto de Jóvenes, 17:00 - 19:00'] },
    { dia: 'Domingo', actividades: ['Escuela Dominical, 09:30 - 12:00', 'Celebración Santa Cena (último domingo del mes)'] },
  ];

  // Horario de Consejería Pastoral
  const horarioConsejeria = [
    { dia: 'Martes', actividades: ['Consejería Pastoral, 10:00 - 12:00'] },
    { dia: 'Miércoles', actividades: ['Consejería Pastoral, 19:00 - 20:00'] },
    { dia: 'Domingo', actividades: ['Consejería Pastoral, 09:00 - 10:00', 'Consejería Pastoral, 12:00 - 13:00'] },
  ];

  const getDayIndex = (dia: string): number => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek.indexOf(dia);
  };

  const convertToCalendarEvents = (horario: { dia: string; actividades: string[] }[]): any[] => {
    return horario.flatMap((dia) =>
      dia.actividades.map((actividad) => {
        const [descripcion, hora] = actividad.split(',');
        if (!descripcion || !hora) return null;

        const [startTime, endTime] = hora.split(' - ').map((h) => h.trim());

        return {
          title: descripcion.trim(),
          startTime,
          endTime,
          daysOfWeek: [getDayIndex(dia.dia)], // Día de la semana (0=Domingo, 1=Lunes, ...)
          allDay: false,
        };
      }).filter(Boolean)
    );
  };

  if (selectedHorario === null) {
    // Pantalla de selección de horario
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
                '&:hover': { backgroundColor: '#145ca0' },
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
              Consejería Pastoral
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
              Otros
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  // Mostrar el horario seleccionado
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => setSelectedHorario(null)} // Volver a la pantalla de selección
              sx={{
                color: '#1976d2',
                borderColor: '#1976d2',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              Regresar
            </Button>
          </Box>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: selectedHorario === 'cultos' ? '#1976d2' : '#4caf50',
            }}
          >
            {selectedHorario === 'cultos' ? 'Horario de Cultos' : 'Horario de Consejería Pastoral'}
          </Typography>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={convertToCalendarEvents(
              selectedHorario === 'cultos' ? horarioCultos : horarioConsejeria
            )}
            firstDay={1} // Comienza el calendario con lunes
            allDaySlot={false} // Elimina la fila "Todo el día"
            slotMinTime="05:00:00" // La hora mínima visible (5:00 AM)
            slotMaxTime="22:00:00" // La hora máxima visible (10:00 PM)
            headerToolbar={{ left: '', center: '', right: '' }}
            locale={esLocale} // Establece el idioma español
            dayHeaderFormat={{ weekday: 'long' }}
            height="auto"
            contentHeight="auto"
            eventColor={selectedHorario === 'cultos' ? '#1976d2' : '#4caf50'} // Color de eventos
          />
        </Paper>
      </Container>
    </div>
  );
};

export default Agenda;
