import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => handleNavigation('/menu')}
        >
          <img src={logo} alt="Logo" style={{ width: 60, height: 60, marginRight: 15 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>
            IGLESIA CRISTIANA MMM
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center', mr: 1 }}>
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
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
            onClick={() => handleNavigation('/enviarNotificacion')}
          >
            Medicina al Corazón
          </Button>
          <IconButton color="inherit" onClick={() => handleNavigation('/settings')} sx={{ ml: 1 }}>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Box>

        <IconButton
          color="inherit"
          sx={{ display: { xs: 'block', sm: 'none' } }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
              <ListItem
                component="div"
                onClick={() => handleNavigation('/publicar')}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <ListItemText primary="Publicar" />
              </ListItem>
              <ListItem
                component="div"
                onClick={() => handleNavigation('/personas')}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <ListItemText primary="Personas" />
              </ListItem>
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
