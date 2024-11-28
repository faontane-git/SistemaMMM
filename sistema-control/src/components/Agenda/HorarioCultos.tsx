import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importar el plugin TimeGrid
import esLocale from '@fullcalendar/core/locales/es'; // Importar el idioma español
import EditIcon from '@mui/icons-material/Edit'; // Icono para editar
import DeleteIcon from '@mui/icons-material/Delete'; // Icono para eliminar

// Definimos la interfaz para las props que recibirá el componente
interface HorarioCultosProps {
  horario: { dia: string; actividades: string[] }[]; // Recibe el horario como prop
}

const HorarioCultos: React.FC<HorarioCultosProps> = ({ horario }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false); // Estado para abrir/cerrar el pop-up
  const [editingActividad, setEditingActividad] = useState<{ index?: number; dia?: string; descripcion?: string; horaInicio?: string; horaFin?: string } | null>(null); // Estado para editar actividad
  const [newActividad, setNewActividad] = useState<{ dia: string; descripcion: string; horaInicio: string; horaFin: string }>({
    dia: '',
    descripcion: '',
    horaInicio: '',
    horaFin: '',
  }); // Estado para agregar nueva actividad
  const [horarioState, setHorario] = useState<HorarioCultosProps['horario']>(horario); // Estado local para manejar el horario

  // Convertir actividades de cultos a eventos para FullCalendar
  const convertToCalendarEvents = (horario: { dia: string; actividades: string[] }[]): any[] => {
    return horario.flatMap((dia) =>
      dia.actividades.map((actividad, actividadIndex) => {
        const parts = actividad.split(',');
        const descripcion = parts[0]?.trim();
        const hora = parts[1]?.trim();
        const [horaInicio, horaFin] = hora.split(' - ').map((h) => h.trim());

        return {
          title: descripcion,
          start: `${dia.dia} ${horaInicio}`,
          end: `${dia.dia} ${horaFin}`,
          diaIndex: horario.indexOf(dia),
          actividadIndex: actividadIndex,
        };
      }).filter(Boolean)
    );
  };

  // Manejar el clic en una actividad del calendario
  const handleEventClick = (info: any) => {
    const { diaIndex, actividadIndex } = info.event.extendedProps;
    const actividad = horarioState[diaIndex].actividades[actividadIndex];
    const [descripcion, hora] = actividad.split(',');
    const [horaInicio, horaFin] = hora.split(' - ');

    setEditingActividad({
      dia: horarioState[diaIndex].dia,
      descripcion: descripcion.trim(),
      horaInicio: horaInicio.trim(),
      horaFin: horaFin.trim(),
      index: actividadIndex,
    });
    setOpenDialog(true);
  };

  // Agregar nueva actividad
  const addActividad = () => {
    if (newActividad.dia && newActividad.descripcion && newActividad.horaInicio && newActividad.horaFin) {
      // Hacer una copia del horario
      const updatedHorario = [...horarioState];

      const diaIndex = updatedHorario.findIndex((h) => h.dia === newActividad.dia);

      if (diaIndex >= 0) {
        updatedHorario[diaIndex].actividades.push(`${newActividad.descripcion}, ${newActividad.horaInicio} - ${newActividad.horaFin}`);
      } else {
        updatedHorario.push({
          dia: newActividad.dia,
          actividades: [`${newActividad.descripcion}, ${newActividad.horaInicio} - ${newActividad.horaFin}`],
        });
      }

      // Actualizar el estado con el nuevo horario
      setHorario(updatedHorario);

      // Limpiar los campos de la actividad y cerrar el diálogo
      setNewActividad({ dia: '', descripcion: '', horaInicio: '', horaFin: '' });
      setOpenDialog(false);
    }
  };

  // Actualizar actividad después de editar
  const updateActividad = () => {
    if (editingActividad && editingActividad.dia) {
      // Hacer una copia del horario
      const updatedHorario = [...horarioState];

      // Crear la nueva actividad con la descripción y horas actualizadas
      const actividad = `${editingActividad.descripcion}, ${editingActividad.horaInicio} - ${editingActividad.horaFin}`;

      // Encontrar el índice del día correspondiente
      const diaIndex = updatedHorario.findIndex((h) => h.dia === editingActividad.dia);

      // Reemplazar la actividad editada con la nueva
      if (diaIndex !== -1) {
        updatedHorario[diaIndex].actividades = updatedHorario[diaIndex].actividades.map((act, idx) => {
          return idx === editingActividad.index ? actividad : act;
        });
      }

      // Actualizar el estado con el horario modificado
      setHorario(updatedHorario);

      // Restablecer el estado de la actividad que se está editando
      setEditingActividad(null);
      setOpenDialog(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Horario de Cultos
      </Typography>

      {/* Botón para abrir el pop-up para agregar actividad */}
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)} // Abre el pop-up en modo agregar actividad
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#145ca0' },
          }}
        >
          Agregar Actividad
        </Button>
      </Box>

      {/* Mostrar calendario */}
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={convertToCalendarEvents(horarioState)}
        locale={esLocale} // Español
        eventClick={handleEventClick} // Añadir evento para hacer clic en una actividad
      />

      {/* Diálogo para agregar/editar actividad */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingActividad ? 'Editar Actividad' : 'Agregar Actividad'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Día"
            value={editingActividad ? editingActividad.dia : newActividad.dia}
            onChange={(e) => {
              const newDia = e.target.value;
              setNewActividad({ ...newActividad, dia: newDia });
              setEditingActividad({ ...editingActividad, dia: newDia });
            }}
            name="dia"
            sx={{ mb: 2 }}
          >
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Descripción"
            value={editingActividad ? editingActividad.descripcion : newActividad.descripcion}
            onChange={(e) => {
              const newDescripcion = e.target.value;
              setNewActividad({ ...newActividad, descripcion: newDescripcion });
              setEditingActividad({ ...editingActividad, descripcion: newDescripcion });
            }}
            name="descripcion"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hora Inicio"
                value={editingActividad ? editingActividad.horaInicio : newActividad.horaInicio}
                onChange={(e) => {
                  const newHoraInicio = e.target.value;
                  setNewActividad({ ...newActividad, horaInicio: newHoraInicio });
                  setEditingActividad({ ...editingActividad, horaInicio: newHoraInicio });
                }}
                name="horaInicio"
                type="time"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hora Fin"
                value={editingActividad ? editingActividad.horaFin : newActividad.horaFin}
                onChange={(e) => {
                  const newHoraFin = e.target.value;
                  setNewActividad({ ...newActividad, horaFin: newHoraFin });
                  setEditingActividad({ ...editingActividad, horaFin: newHoraFin });
                }}
                name="horaFin"
                type="time"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={editingActividad ? updateActividad : addActividad} color="primary">
            {editingActividad ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HorarioCultos;
