import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Box, IconButton } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Agenda: React.FC = () => {
    const navigate = useNavigate();
    const [diasCultos, setDiasCultos] = useState([
        { dia: 'Martes', actividades: ['Ayuno, 9:00 am - 1:00 pm', 'Culto de Oración, 7:00 pm - 9:00 pm', 'Consejería Pastoral, 10:00 am - 12:00 pm'] },
        { dia: 'Miércoles', actividades: ['Culto de Enseñanza, 7:00 pm - 9:00 pm', 'Consejería Pastoral, 7:00 pm - 8:00 pm'] },
        { dia: 'Jueves', actividades: ['Culto de Caballeros, 7:00 pm - 9:00 pm'] },
        { dia: 'Viernes', actividades: ['Culto de Damas, 7:00 pm - 9:00 pm'] },
        { dia: 'Sábado', actividades: ['Culto de Jóvenes, 5:00 pm - 7:00 pm'] },
        { dia: 'Domingo', actividades: ['Escuela Dominical, 9:30 am - 12:00 pm', '*Celebración Santa Cena (último domingo de cada mes)', 'Consejería Pastoral, 9:00 am - 10:00 am', 'Consejería Pastoral, 12:00 pm - 1:00 pm'] },
    ]);

    const handleAddSchedule = () => {
        const nuevoHorario = { dia: 'Nuevo Día', actividades: ['Nueva Actividad, Hora'] };
        setDiasCultos([...diasCultos, nuevoHorario]);
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                {/* Botón de Regresar */}
                <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Regresar
                    </Button>
                </Box>

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#3a6073', fontSize: '24px' }}
                >
                    Agenda de Horarios
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSchedule}
                        sx={{
                            backgroundColor: '#3a6073',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#2e4e5e' },
                        }}
                    >
                        Agregar Nuevo Horario
                    </Button>
                </Box>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, color: '#3a6073' }}>
                    Local: Horario de Cultos y Consejería Pastoral
                </Typography>
                <Grid container spacing={3}>
                    {diasCultos.map((dia, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 3,
                                    border: '2px solid #3a6073',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                                    },
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                                        {dia.dia}
                                    </Typography>
                                    <Box sx={{ borderTop: '1px solid #ddd', pt: 1 }}>
                                        {dia.actividades.map((actividad, idx) => (
                                            <Typography key={idx} variant="body2" sx={{ color: '#555', mt: 1 }}>
                                                {actividad}
                                            </Typography>
                                        ))}
                                    </Box>
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