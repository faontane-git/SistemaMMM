import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, Grid, Button } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importar el plugin TimeGrid
import esLocale from '@fullcalendar/core/locales/es'; // Importar el idioma español

// Definimos la interfaz para las props que recibirá el componente
interface HorarioConsejeriaProps {
  horario: { dia: string; actividades: string[] }[]; // Recibe el horario como prop
}

const HorarioConsejeria: React.FC<HorarioConsejeriaProps> = ({ horario }) => {
  const [showActivities, setShowActivities] = useState<boolean>(false); // Estado para mostrar/ocultar actividades

  // Función para obtener el índice del día (0=Domingo, 1=Lunes, ...)
  const getDayIndex = (dia: string): number => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek.indexOf(dia);
  };

  // Convertir actividades de consejería a eventos para FullCalendar
  const convertToCalendarEvents = (horario: { dia: string; actividades: string[] }[]): any[] => {
    return horario.flatMap((dia) =>
      dia.actividades.map((actividad) => {
        // Aseguramos que actividad tiene una estructura válida
        const parts = actividad.split(',');
        if (parts.length !== 2) return null; // Si no tiene dos partes, no procesamos esta actividad

        const descripcion = parts[0]?.trim();
        const hora = parts[1]?.trim();

        if (!descripcion || !hora) return null; // Si no tenemos descripción o hora, no procesamos la actividad

        const [startTime, endTime] = hora.split(' - ').map((h) => h.trim());

        return {
          title: descripcion,
          startTime,
          endTime,
          daysOfWeek: [getDayIndex(dia.dia)], // Día de la semana (0=Domingo, 1=Lunes, ...)
          allDay: false,
        };
      }).filter(Boolean)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Horario de Consejería Pastoral
      </Typography>

      {/* Botón para mostrar/ocultar actividades */}
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setShowActivities((prev) => !prev)}
          sx={{
            backgroundColor: '#4caf50',
            color: '#fff',
            '&:hover': { backgroundColor: '#388e3c' },
          }}
        >
          {showActivities ? 'Ocultar Actividades' : 'Mostrar Actividades'}
        </Button>
      </Box>

      {/* Mostrar actividades en tarjetas solo si showActivities es true */}
      {showActivities && (
        <Grid container spacing={3}>
          {horario.map((horario, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {horario.dia}
                </Typography>
                {horario.actividades.map((actividad, idx) => {
                  const parts = actividad.split(',');
                  const descripcion = parts[0]?.trim();
                  const hora = parts[1]?.trim();

                  // Verificar si la descripción o la hora están vacías
                  if (!descripcion || !hora) return null;

                  return (
                    <Card key={idx} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body1">
                          <strong>{descripcion}</strong> - {hora}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Calendario */}
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={convertToCalendarEvents(horario)}
        firstDay={1} // Comienza el calendario con lunes
        allDaySlot={false} // Elimina la fila "Todo el día"
        slotMinTime="05:00:00" // La hora mínima visible (5:00 AM)
        slotMaxTime="22:00:00" // La hora máxima visible (10:00 PM)
        headerToolbar={{ left: '', center: '', right: '' }}
        locale={esLocale} // Establece el idioma español
        dayHeaderFormat={{ weekday: 'long' }}
        height="auto"
        contentHeight="auto"
        eventColor="#4caf50" // Color de eventos
      />
    </Container>
  );
};

export default HorarioConsejeria;
