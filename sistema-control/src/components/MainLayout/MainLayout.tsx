import React from 'react';
import Navbar from '../Navbar';
import { Card, CardContent, Typography, Box, Grid, Container } from '@mui/material';
import { School, People, Support } from '@mui/icons-material';

const items = [
  {
    id: 1,
    title: 'Nuestros Servicios',
    description:
      'Ofrecemos servicios semanales para toda la familia, donde puedes aprender, crecer espiritualmente y compartir en comunidad. ¡Todos son bienvenidos!',
    icon: <School sx={{ fontSize: 50, color: '#2C387E' }} />,
  },
  {
    id: 2,
    title: 'Nuestra Misión',
    description:
      'Nuestra misión es ser una comunidad que fomente el crecimiento espiritual y el amor al prójimo. Buscamos servir a través de la enseñanza y la acción.',
    icon: <People sx={{ fontSize: 50, color: '#2C387E' }} />,
  },
  {
    id: 3,
    title: 'Recursos y Apoyo',
    description:
      'Contamos con programas de apoyo y consejería para quienes lo necesiten. Nuestro equipo está aquí para acompañarte en momentos importantes.',
    icon: <Support sx={{ fontSize: 50, color: '#2C387E' }} />,
  },
];

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />

      <Box
        sx={{
          backgroundColor: '#e8f0fe',
          padding: { xs: '40px 0', sm: '60px 0' },
          textAlign: 'center',
          borderBottom: '2px solid #c5cae9',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#2C387E',
            letterSpacing: 1,
            mb: 2,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          ¡Bienvenidos a nuestra Iglesia!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#616161',
            fontStyle: 'italic',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.8,
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          Participa en nuestras actividades y únete a nuestra comunidad.
          <br />
          <strong>¡Juntos crecemos y aprendemos!</strong>
        </Typography>
      </Box>

      <Container sx={{ mt: 6, maxWidth: '950px', px: { xs: 2, sm: 4 } }}>
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  padding: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      color: '#2C387E',
                      mt: 2,
                      mb: 1,
                      fontSize: '1.25rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#616161',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MainLayout;
