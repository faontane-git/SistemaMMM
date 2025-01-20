import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';
import {
  Box, TextField, Button, Card, Typography, Container, Alert, Stack, CssBaseline
} from '@mui/material';
import logo from '../../assets/logo.png';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await login(email, password);
    if (response.success) {
      navigate('/menu'); // Redirige al menú después del login
    }  
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ background: 'linear-gradient(135deg, #3a7bd5 30%, #3a6073 90%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
        <Container maxWidth="xs">
          <Card sx={{ padding: 3, borderRadius: 3, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', backgroundColor: '#ffffff', borderTop: '5px solid #3a7bd5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <img src={logo} alt="Logo" style={{ width: '70px', height: '70px' }} />
            </Box>

            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3a6073' }}>
              Sistema de Gestión
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 3, fontWeight: 'medium', color: '#3a6073' }}>
              Inicie Sesión
            </Typography>

            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField label="Usuario" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }} />
                <TextField label="Contraseña" variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }} />

                {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1.5, fontSize: '16px', mt: 2, backgroundColor: '#3a7bd5', '&:hover': { backgroundColor: '#3a6073' }, borderRadius: 2 }}>
                  Ingresar
                </Button>
              </Stack>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginForm;
