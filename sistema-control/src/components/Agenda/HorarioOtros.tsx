import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, Grid, Button, TextField } from '@mui/material';

interface Actividad {
  nombre: string;
  lugar: string;
  fechas: string;
}

interface HorarioOtrosProps {
  horario: { dia: string; actividades: Actividad[] }[]; // Recibe el horario como prop
}

const HorarioOtros: React.FC<HorarioOtrosProps> = ({ horario }) => {
  const [showActivities, setShowActivities] = useState<boolean>(true); // Estado para mostrar/ocultar actividades
  const [newActividad, setNewActividad] = useState<Actividad>({
    nombre: '',
    lugar: '',
    fechas: '',
  }); // Estado para la nueva actividad

  // Función para agregar una nueva actividad
  const handleAddActivity = (dia: string) => {
    if (!newActividad.nombre.trim() || !newActividad.lugar.trim() || !newActividad.fechas.trim()) return; // Validación simple
    const newHorario = [...horario];
    const diaIndex = newHorario.findIndex((h) => h.dia === dia);
    
    if (diaIndex !== -1) {
      newHorario[diaIndex].actividades.push(newActividad);
    } else {
      newHorario.push({ dia, actividades: [newActividad] });
    }
    
    // Limpiar el formulario de la nueva actividad
    setNewActividad({ nombre: '', lugar: '', fechas: '' });
    // Aquí se podría actualizar el estado del componente padre si es necesario
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Horario de Actividades - Otros
      </Typography>

      {/* Botón para mostrar/ocultar actividades */}
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setShowActivities((prev) => !prev)}
          sx={{
            backgroundColor: '#ff9800',
            color: '#fff',
            '&:hover': { backgroundColor: '#f57c00' },
          }}
        >
          {showActivities ? 'Ocultar Actividades' : 'Mostrar Actividades'}
        </Button>
      </Box>

      {/* Formulario para agregar una nueva actividad */}
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
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
        <TextField
          label="Fechas de la Actividad (ej. viernes 22 al domingo 24 de marzo)"
          variant="outlined"
          value={newActividad.fechas}
          onChange={(e) => setNewActividad({ ...newActividad, fechas: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => handleAddActivity('Otros')} // Se asume que la actividad será añadida a "Otros"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Agregar Actividad
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
                  return (
                    <Card key={idx} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body1">
                          <strong>{actividad.nombre}</strong><br />
                          <span>{actividad.lugar}</span><br />
                          <span>{actividad.fechas}</span>
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
    </Container>
  );
};

export default HorarioOtros;
