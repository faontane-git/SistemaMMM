import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FormularioActividad from './FormularioActividad';
import Navbar from '../Navbar';

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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState<Actividad | null>(null);

  const navigate = useNavigate();

  const actividadesCollection = collection(firestore, 'actividades_otros');

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
          startDate: parseDate(fechasSplit[0]),
          endDate: parseDate(fechasSplit[1]),
        };
      }) as Actividad[];

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

  const handleAbrirFormulario = (actividad?: Actividad | null) => {
    setActividadSeleccionada(actividad || null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setActividadSeleccionada(null);
  };

  return (
    <div>
      <Navbar />
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#2e2e2e',
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/black-linen.png)',
        minHeight: '100vh'
      }}>
        {/* 🔹 Botón Regresar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/agenda')}>
            Regresar
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5', mb: 4 }}>
          Horario de Actividades 📌
        </Typography>

        {/* 🔹 Botón que cambia según el estado */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            color={mostrarFormulario ? "error" : "primary"}
            onClick={() => {
              if (mostrarFormulario) {
                handleCerrarFormulario();
              } else {
                handleAbrirFormulario();
              }
            }}
          >
            {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Actividad'}
          </Button>
        </Box>

        {/* 🔹 Formulario (crear o editar) */}
        {mostrarFormulario && (
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <FormularioActividad
              onActividadGuardada={loadActividades}
              onCerrarFormulario={handleCerrarFormulario}
              actividad={actividadSeleccionada}
            />
          </Box>
        )}

        {/* 🔹 Lista de actividades */}
        {!mostrarFormulario && (
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {actividades.map((actividad) => (
              <Grid item xs={12} md={4} key={actividad.id}>
                <Paper
                  elevation={3}
                  sx={{ p: 3, backgroundColor: '#fff9c4', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => handleAbrirFormulario(actividad)}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{actividad.nombre}</Typography>
                  <Typography variant="body1">📍 <strong>{actividad.lugar}</strong></Typography>
                  <Typography variant="body2">📅 <strong>{actividad.fechas}</strong></Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>

  );
};

export default HorarioOtros;
