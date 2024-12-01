import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, TextField, Modal, IconButton } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

interface Actividad {
  id?: string; // ID del documento Firestore
  nombre: string;
  lugar: string;
  fechas: string;
}

const HorarioOtros: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [newActividad, setNewActividad] = useState<Actividad>({ nombre: '', lugar: '', fechas: '' });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [selectedActividad, setSelectedActividad] = useState<Actividad | null>(null);

  const actividadesCollection = collection(firestore, 'actividades_otros');

  // Cargar actividades desde Firestore
  const loadActividades = async () => {
    try {
      const querySnapshot = await getDocs(actividadesCollection);
      const fetchedActividades = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Actividad[];
      setActividades(fetchedActividades);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  };

  // Guardar o actualizar actividad en Firestore
  const saveActividad = async () => {
    try {
      const actividadConFechas = {
        nombre: newActividad.nombre.trim(),
        lugar: newActividad.lugar.trim(),
        fechas: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
      };

      if (selectedActividad?.id) {
        // Actualizar actividad existente
        const actividadDoc = doc(firestore, 'actividades_otros', selectedActividad.id);
        await updateDoc(actividadDoc, actividadConFechas);
      } else {
        // Guardar nueva actividad
        await addDoc(actividadesCollection, actividadConFechas);
      }

      // Recargar actividades
      await loadActividades();

      // Limpiar y cerrar el modal
      setNewActividad({ nombre: '', lugar: '', fechas: '' });
      setStartDate(undefined);
      setEndDate(undefined);
      setSelectedActividad(null);
      setOpenModal(false);
    } catch (error) {
      console.error('Error al guardar actividad:', error);
    }
  };

  // Eliminar actividad de Firestore
  const deleteActividad = async () => {
    try {
      if (selectedActividad?.id) {
        const actividadDoc = doc(firestore, 'actividades_otros', selectedActividad.id);
        await deleteDoc(actividadDoc);
        await loadActividades();
        setSelectedActividad(null);
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
    }
  };

  useEffect(() => {
    loadActividades();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Horario de Actividades
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#1565c0' },
            padding: '10px 30px',
            fontSize: '16px',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          Agregar Actividad
        </Button>
      </Box>

      {/* Modal para agregar o editar actividad */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedActividad(null);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            width: 450,
            boxShadow: 3,
            maxHeight: '80%',
            overflow: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            {selectedActividad ? 'Editar Actividad' : 'Agregar Nueva Actividad'}
          </Typography>

          <TextField
            label="Nombre de la Actividad"
            variant="outlined"
            value={newActividad.nombre}
            onChange={(e) => setNewActividad({ ...newActividad, nombre: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Lugar de la Actividad"
            variant="outlined"
            value={newActividad.lugar}
            onChange={(e) => setNewActividad({ ...newActividad, lugar: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: '#1976d2' }}>
              Seleccionar Fechas
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date || undefined)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Fecha de inicio"
                  dateFormat="dd/MM/yyyy"
                  className="react-datepicker__input"
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date || undefined)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || undefined}
                  placeholderText="Fecha de fin"
                  dateFormat="dd/MM/yyyy"
                  className="react-datepicker__input"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="contained"
              onClick={saveActividad}
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565c0' },
                padding: '10px 20px',
                fontSize: '14px',
                boxShadow: 3,
                borderRadius: 2,
                width: '45%',
              }}
            >
              {selectedActividad ? 'Guardar Cambios' : 'Agregar Actividad'}
            </Button>

            {selectedActividad && (
              <IconButton
                onClick={deleteActividad}
                sx={{
                  color: '#d32f2f',
                  '&:hover': { backgroundColor: '#f8d7da', borderRadius: '50%' },
                }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Modal>

      {/* Mostrar las actividades */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {actividades.map((actividad, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                setSelectedActividad(actividad);
                setNewActividad(actividad);
                setStartDate(new Date(actividad.fechas.split(' - ')[0]));
                setEndDate(new Date(actividad.fechas.split(' - ')[1]));
                setOpenModal(true);
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {actividad.nombre}
              </Typography>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                <strong>Lugar:</strong> {actividad.lugar}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                <strong>Fechas:</strong> {actividad.fechas}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HorarioOtros;
