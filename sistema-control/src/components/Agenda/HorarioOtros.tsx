import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button, Modal, TextField, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

interface Actividad {
  id?: string;
  nombre: string;
  lugar: string;
  fechas: string;
  startDate?: Date;
  endDate?: Date;
}

const HorarioOtros: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newActividad, setNewActividad] = useState<Actividad>({ nombre: '', lugar: '', fechas: '' });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const actividadesCollection = collection(firestore, 'actividades_otros');

  // 🔹 Función para formatear fechas a "dd/MM/yyyy"
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // 🔹 Convertir una fecha "dd/MM/yyyy" a objeto Date
  const parseDate = (dateString: string): Date | undefined => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return undefined;
  };

  // 🔹 Cargar actividades y ordenarlas
  const loadActividades = async () => {
    try {
      const querySnapshot = await getDocs(actividadesCollection);
      const fetchedActividades = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const fechasSplit = data.fechas.split(' - ');

        return {
          id: doc.id,
          nombre: data.nombre,
          lugar: data.lugar,
          fechas: data.fechas,
          startDate: fechasSplit.length > 0 ? parseDate(fechasSplit[0]) : undefined,
          endDate: fechasSplit.length > 1 ? parseDate(fechasSplit[1]) : undefined,
        };
      }) as Actividad[];

      // 📌 Ordenar por fecha más cercana
      const sortedActividades = fetchedActividades.sort((a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return a.startDate.getTime() - b.startDate.getTime();
      });

      setActividades(sortedActividades);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  };

  useEffect(() => {
    loadActividades();
  }, []);

  // 🔹 Guardar actividad con formato de fecha correcto
  const saveActividad = async () => {
    if (!newActividad.nombre.trim() || !newActividad.lugar.trim() || !startDate || !endDate) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const actividadConFechas = {
        nombre: newActividad.nombre.trim(),
        lugar: newActividad.lugar.trim(),
        fechas: `${formatDate(startDate)} - ${formatDate(endDate)}`, // 📌 Guardado en "dd/MM/yyyy"
      };

      await addDoc(actividadesCollection, actividadConFechas);
      await loadActividades();
      setOpenModal(false);
    } catch (error) {
      console.error('Error al guardar actividad:', error);
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#2e2e2e',
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/black-linen.png)',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5' }}>
        Horario de Actividades 📌
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>Agregar Actividad</Button>
      </Box>

      {/* 🔹 MODAL PARA AGREGAR ACTIVIDAD */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 3, width: 400, boxShadow: 24 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Nueva Actividad</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField label="Nombre" value={newActividad.nombre} onChange={(e) => setNewActividad({ ...newActividad, nombre: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Lugar" value={newActividad.lugar} onChange={(e) => setNewActividad({ ...newActividad, lugar: e.target.value })} fullWidth sx={{ mb: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">Fecha de Inicio</Typography>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date || undefined)} dateFormat="dd/MM/yyyy" className="custom-datepicker" placeholderText="Seleccionar fecha" />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">Fecha de Fin</Typography>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date || undefined)} dateFormat="dd/MM/yyyy" className="custom-datepicker" placeholderText="Seleccionar fecha" minDate={startDate || undefined} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" onClick={saveActividad}>Guardar Actividad</Button>
          </Box>
        </Box>
      </Modal>

      {/* 🔹 LISTA DE ACTIVIDADES ORDENADAS */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {actividades.map((actividad) => (
          <Grid item xs={12} md={4} key={actividad.id}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff9c4', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{actividad.nombre}</Typography>
              <Typography variant="body1">📍 <strong>{actividad.lugar}</strong></Typography>
              <Typography variant="body2">📅 <strong>{actividad.fechas}</strong></Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HorarioOtros;
