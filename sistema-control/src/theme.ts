// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a6073',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h1: {
      fontSize: '20px', // Tamaño ajustado
      fontWeight: 'bold',
      letterSpacing: 1.2,
      color: '#3a6073',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
});

export default theme;
