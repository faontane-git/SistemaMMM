import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';

// Definir una interfaz para las noticias
interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const NotiviaEventos: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  // Simulación de carga de datos (puedes conectarlo a una base de datos real)
  useEffect(() => {
    const noticiasEjemplo: Noticia[] = [
      {
        id: '1',
        titulo: 'Nuevo evento de la comunidad',
        descripcion: 'Te invitamos al evento de recaudación de fondos este sábado a las 4:00 PM.',
        fecha: '2024-09-30',
      },
      {
        id: '2',
        titulo: 'Actualización de noticias y eventos',
        descripcion: 'Buscamos voluntarios para ayudar en la organización de nuestro próximo evento.',
        fecha: '2024-10-05',
      },
    ];
    setNoticias(noticiasEjemplo);
  }, []);

  return (
    <div>
      {/* Incluye el Navbar */}
      <Navbar />

      {/* Contenedor principal */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Título de la página */}
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3a6073', mb: 4 }}
          >
            Noticias y Eventos
          </Typography>

          {/* Mostrar un mensaje si no hay noticias */}
          {noticias.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              sx={{ color: '#888', fontStyle: 'italic', marginTop: 4 }}
            >
              No hay noticias disponibles en este momento.
            </Typography>
          ) : (
            <Grid
              container
              spacing={4}
              justifyContent="center" // Centrar horizontalmente
              alignItems="center" // Centrar verticalmente
            >
              {noticias.map((noticia, index) => (
                <Grid item key={noticia.id}>
                  <Card
                    sx={{
                      width: 300, // Ancho fijo para todas las tarjetas
                      height: 300, // Altura fija para todas las tarjetas
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={index === 0 ? '/crear-noticia' : `/detalle-noticia`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: 3,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {noticia.titulo}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          {noticia.descripcion}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default NotiviaEventos;
