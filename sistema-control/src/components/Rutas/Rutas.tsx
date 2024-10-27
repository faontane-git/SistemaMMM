import React, { useState } from 'react';
import { Container, Typography, Box, Link, TextField, Button } from '@mui/material';
import Navbar from '../Navbar';

const Rutas: React.FC = () => {
  const [direccion, setDireccion] = useState('Estamos Ubicados en la Cdla. Vergeles, Av. Francisco de Orellana y Callejón 23 (Alado de Urgentito)');
  const [gpsLink, setGpsLink] = useState('https://maps.app.goo.gl/5T8qgD1newABiDHQ9');
  const [videoLink, setVideoLink] = useState('https://fb.watch/uilFjkFkEn/');
  const [buses, setBuses] = useState('64B, 63A, 85, 131, 143');

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Rutas
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Dirección"
            fullWidth
            variant="outlined"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ubicación GPS (Google Maps)"
            fullWidth
            variant="outlined"
            value={gpsLink}
            onChange={(e) => setGpsLink(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Video de Cómo llegar"
            fullWidth
            variant="outlined"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Buses que pasan por la zona"
            fullWidth
            variant="outlined"
            value={buses}
            onChange={(e) => setBuses(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Rutas;
