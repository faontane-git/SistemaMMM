import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';

const menuItems = [
  { text: 'Publicar', path: '/publicar' },
  { text: 'Personas', path: '/personas' },
  { text: 'Medicina al Corazón', path: '/enviarNotificacion' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const toggleDrawer = useCallback((open: boolean) => {
    setDrawerOpen(open);
  }, []);

  const buttonStyles = {
    fontWeight: 'bold',
    borderRadius: 2,
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        {/* Logo y Título */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleNavigation('/menu')}>
          <img src={logo} alt="Logo" style={{ width: 60, height: 60, marginRight: 15 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>
            IGLESIA CRISTIANA MMM
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Botones del Navbar en Escritorio */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center', mr: 1 }}>
          {menuItems.map(({ text, path }) => (
            <Button key={text} variant="outlined" color="inherit" sx={buttonStyles} onClick={() => handleNavigation(path)}>
              {text}
            </Button>
          ))}
          <IconButton color="inherit" onClick={() => handleNavigation('/settings')} sx={{ ml: 1 }}>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Menú Hamburguesa en Móviles */}
        <IconButton color="inherit" sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Drawer (Menú Lateral) */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
            <List>
              {menuItems.map(({ text, path }) => (
                <ListItem
                  key={text}
                  component="div"
                  onClick={() => handleNavigation(path)}
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <ListItem
                component="div"
                onClick={() => handleNavigation('/settings')}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <ListItemText primary="Configuración" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
