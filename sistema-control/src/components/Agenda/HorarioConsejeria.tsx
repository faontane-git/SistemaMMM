import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText
} from '@mui/material';
import esLocale from '@fullcalendar/core/locales/es';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

export const Horario: React.FC = () => {
  const colorOptions = [
    { label: 'Rojo', value: '#FF5733' },
    { label: 'Azul', value: '#007BFF' },
    { label: 'Verde', value: '#28A745' },
    { label: 'Amarillo', value: '#FFC107' },
    { label: 'Púrpura', value: '#6F42C1' },
  ];

  const commonColor = colorOptions[0].value; // Color por defecto
  const [events, setEvents] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', materia: '', dia_num: '', hora_inicio: '', hora_final: '', color: commonColor });
  const [isLoading, setIsLoading] = useState(false);
  const actividadesCollection = collection(firestore, 'actividades'); // Colección en Firestore
  const [errors, setErrors] = useState<any>({}); // Este estado almacenará los errores de los campos

  // Cargar datos desde Firestore
  const loadEventsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(actividadesCollection);
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID del documento Firestore
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error al cargar actividades desde Firestore:', error);
    }
  };

  const validateFields = () => {
    const newErrors: any = {}; // Almacenará los errores de los campos

    // Validar que todos los campos estén completos
    if (!newEvent.materia.trim()) {
      newErrors.materia = 'La actividad es obligatoria';
    }
    if (!newEvent.dia_num) {
      newErrors.dia_num = 'El día de la semana es obligatorio';
    }
    if (!newEvent.hora_inicio) {
      newErrors.hora_inicio = 'La hora de inicio es obligatoria';
    }
    if (!newEvent.hora_final) {
      newErrors.hora_final = 'La hora de fin es obligatoria';
    }
    if (!newEvent.color) {
      newErrors.color = 'El color es obligatorio';
    }

    setErrors(newErrors); // Actualizar el estado con los errores

    // Si no hay errores, retornamos true
    return Object.keys(newErrors).length === 0;
  };


  // Guardar nuevo evento o actualizar evento existente en Firestore
  const saveEventToFirestore = async () => {
    // Validar que todos los campos necesarios estén presentes
    if (!validateFields()) {
      return; // Si los campos no son válidos, no proceder
    }

    try {
      const eventData = {
        materia: newEvent.materia.trim(),
        dia_num: newEvent.dia_num.trim(),
        hora_inicio: newEvent.hora_inicio.trim(),
        hora_final: newEvent.hora_final.trim(),
        color: newEvent.color,
      };

      if (newEvent.id) {
        // Si el evento ya tiene un ID, actualizamos el documento existente
        const eventDoc = doc(firestore, 'actividades', newEvent.id);
        await updateDoc(eventDoc, eventData);
      } else {
        // Si no tiene un ID, creamos un nuevo documento
        await addDoc(actividadesCollection, eventData);
      }

      await loadEventsFromFirestore(); // Recargar eventos
      setOpenDialog(false); // Cerrar el diálogo
    } catch (error) {
      console.error('Error al guardar la actividad en Firestore:', error);
      alert('Hubo un problema al guardar la actividad. Por favor, inténtalo de nuevo.');
    }
  };


  // Eliminar evento de Firestore
  const deleteEventFromFirestore = async () => {
    try {
      if (newEvent.id) {
        const eventDoc = doc(firestore, 'actividades', newEvent.id);
        await deleteDoc(eventDoc); // Eliminar el documento
        await loadEventsFromFirestore(); // Recargar eventos
        setOpenDialog(false); // Cerrar el diálogo
      }
    } catch (error) {
      console.error('Error al eliminar la actividad en Firestore:', error);
    }
  };

  // Manejar clic sobre un evento para editarlo
  const handleEventClick = (info: any) => {
    const eventData = events.find((event) => event.id === info.event.id);
    if (eventData) {
      setNewEvent(eventData); // Cargar los datos del evento seleccionado
      setOpenDialog(true); // Abrir el diálogo para edición
    }
  };

  useEffect(() => {
    loadEventsFromFirestore();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* Título centrado */}
      <Typography variant="h4" gutterBottom>
        Horario de Consejería Pastoral
      </Typography>

      {/* Botón centrado */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setNewEvent({ id: '', materia: '', dia_num: '', hora_inicio: '', hora_final: '', color: commonColor });
          setOpenDialog(true);
        }}
        style={{ marginBottom: '2em' }}
      >
        Agregar Actividad
      </Button>

      {/* Calendario */}
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events.map((item) => ({
          id: item.id,
          title: item.materia,
          daysOfWeek: [Number(item.dia_num)],
          startTime: item.hora_inicio,
          endTime: item.hora_final,
          backgroundColor: item.color,
          borderColor: item.color,
          textColor: '#FFFFFF',
        }))}
        locale={esLocale}
        dayHeaderFormat={{ weekday: 'long' }}
        headerToolbar={{ left: '', center: '', right: '' }}
        allDaySlot={false}
        // Formato de las horas en la primera fila (usando dos dígitos)
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short',
        }}
        slotMinTime="05:00:00"
        slotMaxTime="22:00:00"
        eventClick={handleEventClick}
      />

      {/* Diálogo para agregar/editar actividad */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newEvent.id ? 'Editar Actividad' : 'Agregar Actividad'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Actividad"
            fullWidth
            value={newEvent.materia}
            onChange={(e) => setNewEvent({ ...newEvent, materia: e.target.value })}
            error={Boolean(errors.materia)} // Si hay un error, mostrar el campo en rojo
            helperText={errors.materia} // Mostrar el mensaje de error
          />
          <FormControl fullWidth style={{ marginTop: '1em' }} error={Boolean(errors.dia_num)}>
            <InputLabel>Día de la semana</InputLabel>
            <Select
              value={newEvent.dia_num}
              onChange={(e) => setNewEvent({ ...newEvent, dia_num: e.target.value })}
            >
              <MenuItem value="0">Domingo</MenuItem>
              <MenuItem value="1">Lunes</MenuItem>
              <MenuItem value="2">Martes</MenuItem>
              <MenuItem value="3">Miércoles</MenuItem>
              <MenuItem value="4">Jueves</MenuItem>
              <MenuItem value="5">Viernes</MenuItem>
              <MenuItem value="6">Sábado</MenuItem>
            </Select>
            <FormHelperText>{errors.dia_num}</FormHelperText>
          </FormControl>
          <TextField
            label="Hora de inicio"
            fullWidth
            type="time"
            value={newEvent.hora_inicio}
            onChange={(e) => setNewEvent({ ...newEvent, hora_inicio: e.target.value })}
            style={{ marginTop: '1em' }}
            error={Boolean(errors.hora_inicio)} // Si hay error, mostrar en rojo
            helperText={errors.hora_inicio} // Mostrar el mensaje de error
          />
          <TextField
            label="Hora de fin"
            fullWidth
            type="time"
            value={newEvent.hora_final}
            onChange={(e) => setNewEvent({ ...newEvent, hora_final: e.target.value })}
            style={{ marginTop: '1em' }}
            error={Boolean(errors.hora_final)} // Si hay error, mostrar en rojo
            helperText={errors.hora_final} // Mostrar el mensaje de error
          />
          <FormControl fullWidth style={{ marginTop: '1em' }} error={Boolean(errors.color)}>
            <InputLabel>Color</InputLabel>
            <Select
              value={newEvent.color}
              onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
            >
              {colorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.color}</FormHelperText>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          {newEvent.id && (
            <Button onClick={deleteEventFromFirestore} color="error">
              Eliminar
            </Button>
          )}
          <Button onClick={saveEventToFirestore}>Guardar</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default Horario;
