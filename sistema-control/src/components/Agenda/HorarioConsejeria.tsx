import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el locale en español

export const Horario: React.FC = () => {
  const commonColor = '#FF5733'; // Color común para todos los eventos

  const [events, setEvents] = useState<any[]>([
    { id: 'event-0', materia: 'Consejería Individual', dia_num: '1', hora_inicio: '10:00', hora_final: '12:00', color: commonColor },
    { id: 'event-1', materia: 'Consejería Grupal', dia_num: '2', hora_inicio: '14:00', hora_final: '16:00', color: commonColor },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', materia: '', dia_num: '', hora_inicio: '', hora_final: '', color: commonColor });
  const [calendarKey, setCalendarKey] = useState(0); // Estado para forzar la actualización del calendario

  // Función para manejar el clic sobre un evento y permitir su edición
  const handleEventClick = (info: any) => {
    const eventData = events.find(event => event.id === info.event.id);
    if (eventData) {
      setNewEvent(eventData); // Cargar los datos del evento seleccionado en el formulario
      setOpenDialog(true); // Abrir el cuadro de diálogo para editar el evento
    }
  };

  // Función para manejar el clic sobre el botón de "Guardar"
  const handleAddEvent = () => {
    if (newEvent.materia && newEvent.dia_num && newEvent.hora_inicio && newEvent.hora_final) {
      const eventData = {
        ...newEvent,
        daysOfWeek: [Number(newEvent.dia_num)], // Día de la semana (0 = Domingo, 1 = Lunes, ...)
        backgroundColor: newEvent.color,
        borderColor: newEvent.color,
        textColor: '#FFFFFF',
        borderRadius: '8px', // Bordes redondeados para un look más moderno
        boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`, // Sombra para los eventos
      };

      if (newEvent.id) {
        // Si existe un ID, significa que estamos editando un evento
        setEvents(prevEvents =>
          prevEvents.map(event => (event.id === newEvent.id ? { ...event, ...eventData } : event))
        );
      } else {
        // Si no existe un ID, es un nuevo evento
        setEvents(prevEvents => [...prevEvents, { ...eventData, id: `event-${prevEvents.length}` }]);
      }

      // Forzar la actualización del calendario
      setCalendarKey(prevKey => prevKey + 1);

      setOpenDialog(false); // Cierra el cuadro de diálogo
    }
  };

  // Función para eliminar un evento
  const handleDeleteEvent = () => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== newEvent.id)); // Elimina el evento seleccionado
    setOpenDialog(false); // Cierra el cuadro de diálogo
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setNewEvent({ id: '', materia: '', dia_num: '', hora_inicio: '', hora_final: '', color: commonColor });
          setOpenDialog(true);
        }}
        style={{ marginBottom: '1em' }}
      >
        Agregar Actividad
      </Button>

      <FullCalendar
        key={calendarKey} // Usamos la prop 'key' para forzar la actualización
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek" // Vista de semana con horas
        events={events.map((item) => ({
          id: item.id,
          title: item.materia,
          daysOfWeek: [Number(item.dia_num)], // Día de la semana (0 = Domingo, 1 = Lunes, ...)
          startTime: item.hora_inicio,
          endTime: item.hora_final,
          backgroundColor: item.color, // Aplica el mismo color a todos los eventos
          borderColor: item.color,
          textColor: '#FFFFFF',
          borderRadius: '8px', // Bordes redondeados
          boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`, // Sombra en los eventos
          // Transición para el hover
          hoverBackgroundColor: '#444',
        }))} // Convertir los eventos en el formato adecuado para FullCalendar
        locale={esLocale}
        dayHeaderFormat={{ weekday: 'long' }} // Mostrar los días de la semana con nombres largos
        headerToolbar={{ left: '', center: '', right: '' }}  
        allDaySlot={false} // Elimina la opción "Todo el día"
        eventClick={handleEventClick} // Permite seleccionar y editar eventos

        // Limitar las horas visibles en el calendario
        slotMinTime="05:00:00"
        slotMaxTime="22:00:00"

        // Formato de las horas en la primera fila (usando dos dígitos)
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        }}

        // Estilo adicional para las actividades (hover y foco)
        eventMouseEnter={(info) => {
          info.el.style.transform = 'scale(1.05)'; // Aumentar ligeramente el tamaño al pasar el ratón
          info.el.style.transition = 'transform 0.2s ease-in-out';
        }}
        eventMouseLeave={(info) => {
          info.el.style.transform = 'scale(1)'; // Volver al tamaño original al quitar el ratón
        }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newEvent.id ? 'Editar Actividad' : 'Agregar Actividad'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Materia"
            fullWidth
            value={newEvent.materia}
            onChange={(e) => setNewEvent({ ...newEvent, materia: e.target.value })}
          />
          <FormControl fullWidth style={{ marginTop: '1em' }}>
            <InputLabel>Día de la semana</InputLabel>
            <Select
              value={newEvent.dia_num}
              onChange={(e) => setNewEvent({ ...newEvent, dia_num: e.target.value })}
            >
              <MenuItem value="1">Lunes</MenuItem>
              <MenuItem value="2">Martes</MenuItem>
              <MenuItem value="3">Miércoles</MenuItem>
              <MenuItem value="4">Jueves</MenuItem>
              <MenuItem value="5">Viernes</MenuItem>
              <MenuItem value="6">Sábado</MenuItem>
              <MenuItem value="0">Domingo</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Hora de inicio"
            fullWidth
            type="time"
            value={newEvent.hora_inicio}
            onChange={(e) => setNewEvent({ ...newEvent, hora_inicio: e.target.value })}
            style={{ marginTop: '1em' }}
          />
          <TextField
            label="Hora de fin"
            fullWidth
            type="time"
            value={newEvent.hora_final}
            onChange={(e) => setNewEvent({ ...newEvent, hora_final: e.target.value })}
            style={{ marginTop: '1em' }}
          />
          <TextField
            label="Color"
            fullWidth
            type="color"
            value={newEvent.color}
            onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
            style={{ marginTop: '1em' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          {newEvent.id && (
            <Button onClick={handleDeleteEvent} color="error">
              Eliminar
            </Button>
          )}
          <Button onClick={handleAddEvent}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Horario;
