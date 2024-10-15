import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import Navbar from '../Navbar';

const Agenda: React.FC = () => {
    const diasCultos = [
        { dia: 'Martes', actividades: ['Ayuno, 9:00am-13:00pm', 'Culto de Oración, 7:00-9:00 pm'] },
        { dia: 'Miércoles', actividades: ['Culto de Enseñanza, 7:00-9:00 pm'] },
        { dia: 'Jueves', actividades: ['Culto de Caballeros, 7:00-9:00 pm'] },
        { dia: 'Viernes', actividades: ['Culto de Damas, 7:00-9:00 pm'] },
        { dia: 'Sábado', actividades: ['Culto de Jóvenes, 5:00-7:00 pm'] },
        { dia: 'Domingo', actividades: ['Escuela Dominical, 9:30-12:00 am', 'Celebración Santa Cena (Último domingo de cada mes)'] },
    ];

    const diasConsejeria = [
        { dia: 'Martes', actividades: ['10:00-12:00 am'] },
        { dia: 'Miércoles', actividades: ['7:00-8:00 pm'] },
        { dia: 'Domingo', actividades: ['9:00-10:00 am', '12:00-13:00 pm'] },
    ];

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Agenda de Horarios
                </Typography>

                {/* Tarjeta para los Horarios de Cultos */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Local: Horario de Cultos
                        </Typography>
                        <Grid container spacing={2}>
                            {diasCultos.map((dia, index) => (
                                <Grid item xs={12} key={index}>
                                    <Typography variant="h6">{dia.dia}</Typography>
                                    {dia.actividades.map((actividad, idx) => (
                                        <Typography key={idx} variant="body1">
                                            {actividad}
                                        </Typography>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {/* Tarjeta para los Horarios de Consejería Pastoral */}
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Consejería Pastoral
                        </Typography>
                        <Grid container spacing={2}>
                            {diasConsejeria.map((dia, index) => (
                                <Grid item xs={12} key={index}>
                                    <Typography variant="h6">{dia.dia}</Typography>
                                    {dia.actividades.map((actividad, idx) => (
                                        <Typography key={idx} variant="body1">
                                            {actividad}
                                        </Typography>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Agenda;
