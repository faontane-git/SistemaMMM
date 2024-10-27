import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import Navbar from '../Navbar';

const Agenda: React.FC = () => {
    const diasCultos = [
        { dia: 'Martes', actividades: ['Ayuno, 9:00 am - 1:00 pm', 'Culto de Oración, 7:00 pm - 9:00 pm'] },
        { dia: 'Miércoles', actividades: ['Culto de Enseñanza, 7:00 pm - 9:00 pm'] },
        { dia: 'Jueves', actividades: ['Culto de Caballeros, 7:00 pm - 9:00 pm'] },
        { dia: 'Viernes', actividades: ['Culto de Damas, 7:00 pm - 9:00 pm'] },
        { dia: 'Sábado', actividades: ['Culto de Jóvenes, 5:00 pm - 7:00 pm'] },
        { dia: 'Domingo', actividades: ['Escuela Dominical, 9:30 am - 12:00 pm', 'Celebración Santa Cena (Último domingo de cada mes)'] },
    ];

    const diasConsejeria = [
        { dia: 'Martes', actividades: ['10:00 am - 12:00 pm'] },
        { dia: 'Miércoles', actividades: ['7:00 pm - 8:00 pm'] },
        { dia: 'Domingo', actividades: ['9:00 am - 10:00 am', '12:00 pm - 1:00 pm'] },
    ];

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Agenda de Horarios
                </Typography>

                {/* Sección de Horarios de Cultos */}
                <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: '#3a6073' }}>
                    Local: Horario de Cultos
                </Typography>
                <Grid container spacing={3}>
                    {diasCultos.map((dia, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                    },
                                    backgroundColor: '#f5faff',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                        {dia.dia}
                                    </Typography>
                                    {dia.actividades.map((actividad, idx) => (
                                        <Typography key={idx} variant="body2" sx={{ color: '#555' }}>
                                            {actividad}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Sección de Horarios de Consejería Pastoral */}
                <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: '#3a6073' }}>
                    Consejería Pastoral
                </Typography>
                <Grid container spacing={3}>
                    {diasConsejeria.map((dia, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                    },
                                    backgroundColor: '#f5faff',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                        {dia.dia}
                                    </Typography>
                                    {dia.actividades.map((actividad, idx) => (
                                        <Typography key={idx} variant="body2" sx={{ color: '#555' }}>
                                            {actividad}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Agenda;
