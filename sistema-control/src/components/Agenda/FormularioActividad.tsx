import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, Alert, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Swal from 'sweetalert2';

interface Actividad {
  id?: string;
  nombre: string;
  lugar: string;
  startDate?: Date;
  endDate?: Date;
}

interface FormularioActividadProps {
  onActividadGuardada: () => void;
  onCerrarFormulario: () => void;
  actividad?: Actividad | null;
}

const FormularioActividad: React.FC<FormularioActividadProps> = ({
  onActividadGuardada,
  onCerrarFormulario,
  actividad,
}) => {
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [error, setError] = useState<string | null>(null);

  const actividadesCollection = collection(firestore, 'actividades_otros');

  const formatDate = (date?: Date): string =>
    date ? date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  useEffect(() => {
    if (actividad) {
      setNombre(actividad.nombre);
      setLugar(actividad.lugar);
      setStartDate(actividad.startDate);
      setEndDate(actividad.endDate);
    } else {
      setNombre('');
      setLugar('');
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [actividad]);

  const saveActividad = async () => {
    if (!nombre.trim() || !lugar.trim() || !startDate || !endDate) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      if (actividad?.id) {
        const actividadRef = doc(firestore, 'actividades_otros', actividad.id);
        await updateDoc(actividadRef, {
          nombre: nombre.trim(),
          lugar: lugar.trim(),
          fechas: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        });
        Swal.fire({
          icon: 'success',
          title: '¡Actividad actualizada!',
          confirmButtonText: 'Aceptar',
        });
      } else {
        await addDoc(actividadesCollection, {
          nombre: nombre.trim(),
          lugar: lugar.trim(),
          fechas: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        });
        Swal.fire({
          icon: 'success',
          title: '¡Actividad creada!',
          confirmButtonText: 'Aceptar',
        });
      }

      onActividadGuardada();
      onCerrarFormulario();
    } catch (err) {
      console.error('Error al guardar actividad:', err);
    }
  };

  const eliminarActividad = async () => {
    if (!actividad?.id) return;

    const confirmacion = await Swal.fire({
      title: '¿Eliminar actividad?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        const actividadRef = doc(firestore, 'actividades_otros', actividad.id);
        await deleteDoc(actividadRef);

        Swal.fire({
          icon: 'success',
          title: 'Actividad eliminada',
          confirmButtonText: 'Aceptar',
        });

        onActividadGuardada();
        onCerrarFormulario();
      } catch (error) {
        console.error('Error al eliminar actividad:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'Ocurrió un problema al eliminar la actividad.',
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3, backgroundColor: 'white', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        {actividad ? 'Editar Actividad' : 'Nueva Actividad'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Lugar"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">Fecha de Inicio</Typography>
          <Box
            sx={{
              height: '48px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              paddingX: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date || undefined)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha"
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">Fecha de Fin</Typography>
          <Box
            sx={{
              height: '48px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              paddingX: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date || undefined)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha"
              minDate={startDate}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={saveActividad}>
          {actividad ? 'Actualizar Actividad' : 'Guardar Actividad'}
        </Button>

        {actividad && (
          <Button variant="outlined" color="error" onClick={eliminarActividad}>
            Eliminar Actividad
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FormularioActividad;
