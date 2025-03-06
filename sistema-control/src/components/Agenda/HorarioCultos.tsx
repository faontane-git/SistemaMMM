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
  FormHelperText,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import esLocale from '@fullcalendar/core/locales/es';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const HorarioCultos: React.FC = () => {
  const navigate = useNavigate();

  const colorOptions = [
    { label: 'Rojo', value: '#FF5733' },
    { label: 'Azul', value: '#007BFF' },
    { label: 'Verde', value: '#28A745' },
    { label: 'Amarillo', value: '#FFC107' },
    { label: 'Púrpura', value: '#6F42C1' },
  ];

  const commonColor = colorOptions[0].value;
  const [events, setEvents] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', materia: '', dia_num: '', hora_inicio: '', hora_final: '', color: commonColor });
  const actividadesCollection = collection(firestore, 'cultos');
  const [errors, setErrors] = useState<any>({});

  const loadEventsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(actividadesCollection);
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error al cargar actividades desde Firestore:', error);
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (!newEvent.materia.trim()) newErrors.materia = 'La actividad es obligatoria';
    if (!newEvent.dia_num) newErrors.dia_num = 'El día de la semana es obligatorio';
    if (!newEvent.hora_inicio) newErrors.hora_inicio = 'La hora de inicio es obligatoria';
    if (!newEvent.hora_final) newErrors.hora_final = 'La hora de fin es obligatoria';
    if (!newEvent.color) newErrors.color = 'El color es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEventToFirestore = async () => {
    if (!validateFields()) return;

    try {
      const eventData = {
        materia: newEvent.materia.trim(),
        dia_num: newEvent.dia_num.trim(),
        hora_inicio: newEvent.hora_inicio.trim(),
        hora_final: newEvent.hora_final.trim(),
        color: newEvent.color,
      };

      if (newEvent.id) {
        const eventDoc = doc(firestore, 'cultos', newEvent.id);
        await updateDoc(eventDoc, eventData);
      } else {
        await addDoc(actividadesCollection, eventData);
      }

      await loadEventsFromFirestore();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al guardar la actividad en Firestore:', error);
    }
  };

  const deleteEventFromFirestore = async () => {
    try {
      if (newEvent.id) {
        const eventDoc = doc(firestore, 'cultos', newEvent.id);
        await deleteDoc(eventDoc);
        await loadEventsFromFirestore();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error al eliminar la actividad en Firestore:', error);
    }
  };

  const handleEventClick = (info: any) => {
    const eventData = events.find((event) => event.id === info.event.id);
    if (eventData) {
      setNewEvent(eventData);
      setOpenDialog(true);
    }
  };

  useEffect(() => {
    loadEventsFromFirestore();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {/* 🔹 Botón Regresar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/agenda')}
          >
            Regresar
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom>
          Horario de Cultos
        </Typography>

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
          slotLabelFormat={{ hour: '2-digit', minute: '2-digit', meridiem: 'short' }}
          slotMinTime="05:00:00"
          slotMaxTime="22:00:00"
          eventClick={handleEventClick}
        />

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{newEvent.id ? 'Editar Actividad' : 'Agregar Actividad'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Actividad"
              fullWidth
              value={newEvent.materia}
              onChange={(e) => setNewEvent({ ...newEvent, materia: e.target.value })}
              error={Boolean(errors.materia)}
              helperText={errors.materia}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }} error={Boolean(errors.dia_num)}>
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
              sx={{ mt: 2 }}
              error={Boolean(errors.hora_inicio)}
              helperText={errors.hora_inicio}
            />
            <TextField
              label="Hora de fin"
              fullWidth
              type="time"
              value={newEvent.hora_final}
              onChange={(e) => setNewEvent({ ...newEvent, hora_final: e.target.value })}
              sx={{ mt: 2 }}
              error={Boolean(errors.hora_final)}
              helperText={errors.hora_final}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            {newEvent.id && <Button onClick={deleteEventFromFirestore} color="error">Eliminar</Button>}
            <Button onClick={saveEventToFirestore}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default HorarioCultos;