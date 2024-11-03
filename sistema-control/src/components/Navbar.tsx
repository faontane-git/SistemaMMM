import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Función para manejar la navegación a las diferentes rutas
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        {/* Sección del logo y nombre */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => handleNavigation('/menu')}
        >
          <img src={logo} alt="Logo" style={{ width: 60, height: 60, marginRight: 15 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            IGLESIA CRISTIANA MMM
          </Typography>
        </Box>

        {/* Espacio entre el logo y los botones */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Botones de navegación alineados muy cerca al icono de configuración */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mr: 1 }}> {/* Menor margen y menos espacio */}
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
            onClick={() => handleNavigation('/publicar')}
          >
            Publicar
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
            onClick={() => handleNavigation('/personas')}
          >
            Personas
          </Button>

          {/* Icono de configuración pegado a los botones */}
          <IconButton color="inherit" onClick={() => handleNavigation('/settings')} sx={{ ml: 1 }}>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
