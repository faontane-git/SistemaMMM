// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Box,
  TextField,
  Button,
  Card,
  Typography,
  Container,
  Alert,
  Stack,
  CssBaseline,
} from '@mui/material';
import logo from '../../assets/logo.png'; // Importa el logo (asegúrate de la ruta correcta)

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Referencia a la colección "Usuarios" en Firestore
      const usersRef = collection(firestore, 'Usuarios');

      // Crear una consulta para buscar al usuario con el email y contraseña
      const q = query(usersRef, where('user', '==', email), where('password', '==', password));

      // Ejecutar la consulta y obtener los documentos que coincidan con la consulta
      const querySnapshot = await getDocs(q);

      // Verificar si se encontró al menos un documento que coincida
      if (!querySnapshot.empty) {
        // Credenciales correctas, redirigir al menú principal
        navigate('/menu');
      } else {
        // Credenciales incorrectas
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión. Inténtalo más tarde.');
    }
  };

  return (
    <>
      {/* Fondo gradiente para toda la página */}
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #3a7bd5 30%, #3a6073 90%)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        {/* Contenedor principal */}
        <Container maxWidth="sm">
          <Card
            sx={{
              padding: 5,
              borderRadius: 3,
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#ffffff',
              borderTop: '5px solid #3a7bd5', // Línea superior con color acentuado
            }}
          >
            {/* Logo de la iglesia */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <img src={logo} alt="Logo" style={{ width: '80px', height: '80px' }} /> {/* Tamaño más pequeño */}
            </Box>

            {/* Título principal (más pequeño) */}
            <Typography
              variant="h5" // Ajustado de h4 a h5 para reducir el tamaño
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#3a6073' }}
            >
              Sistema de Gestión de la Iglesia
            </Typography>
            <Typography
              variant="subtitle1" // Cambiado de h6 a subtitle1 para reducir el tamaño
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 3, fontWeight: 'medium', color: '#3a6073' }}
            >
              Inicie Sesión
            </Typography>

            {/* Formulario */}
            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Usuario"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                />
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                />

                {/* Mostrar error si existe */}
                {error && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {error}
                  </Alert>
                )}

                {/* Botón de inicio de sesión */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: 1.5,
                    fontSize: '16px',
                    mt: 1,
                    backgroundColor: '#3a7bd5',
                    '&:hover': { backgroundColor: '#3a6073' },
                    borderRadius: 2,
                  }}
                >
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
