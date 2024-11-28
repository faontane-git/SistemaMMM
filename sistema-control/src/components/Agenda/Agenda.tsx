import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent } from '@mui/material';
import Navbar from '../Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos para cada actividad

const Agenda: React.FC = () => {
    const navigate = useNavigate();

    // Estado para determinar qué horario mostrar
    const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false); // Estado para controlar el diálogo
    const [newActividad, setNewActividad] = useState({ descripcion: '', startTime: '', endTime: '' });
    const [otrasActividades, setOtrasActividades] = useState<Array<{ id: string; descripcion: string; startTime: string; endTime: string }>>([]);

    // Función para abrir el diálogo de agregar actividad
    const handleOpenDialog = () => setOpenDialog(true);

    // Función para cerrar el diálogo de agregar actividad
    const handleCloseDialog = () => setOpenDialog(false);

    // Función para agregar actividad
    const handleAddActividad = () => {
        const nuevaActividad = { ...newActividad, id: uuidv4() }; // Generar un ID único para cada actividad
        setOtrasActividades([...otrasActividades, nuevaActividad]); // Agregar la actividad a la lista
        setNewActividad({ descripcion: '', startTime: '', endTime: '' }); // Limpiar el formulario
        handleCloseDialog(); // Cerrar el diálogo
    };

    if (selectedHorario === null) {
        // Pantalla de selección de horario
        return (
            <div>
                <Navbar />
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Seleccione el tipo de horario
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
                        <Button
                            variant="contained"
                            onClick={() => setSelectedHorario('cultos')}
                            sx={{
                                width: '50%',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#145ca0' },
                            }}
                        >
                            Horario de Cultos
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setSelectedHorario('consejeria')}
                            sx={{
                                width: '50%',
                                backgroundColor: '#4caf50',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#388e3c' },
                            }}
                        >
                            Horario de Consejería Pastoral
                        </Button>
                        {/* Botón adicional "Otros" */}
                        <Button
                            variant="contained"
                            onClick={() => setSelectedHorario('otros')}
                            sx={{
                                width: '50%',
                                backgroundColor: '#f39c12',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#e67e22' },
                            }}
                        >
                            Otros
                        </Button>
                    </Box>
                </Container>
            </div>
        );
    }

    // Mostrar la pantalla de "Otros Horarios"
    if (selectedHorario === 'otros') {
        return (
            <div>
                <Navbar />
                <Container maxWidth="lg" sx={{ mt: 5 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="flex-start" mb={2}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => setSelectedHorario(null)} // Volver a la pantalla de selección
                                sx={{
                                    color: '#1976d2',
                                    borderColor: '#1976d2',
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                            >
                                Regresar
                            </Button>
                            {/* Botón "Agregar Actividad" */}
                            <Button
                                variant="contained"
                                onClick={handleOpenDialog}
                                sx={{
                                    color: '#fff',
                                    backgroundColor: '#28a745',
                                    '&:hover': { backgroundColor: '#218838' },
                                    marginLeft: 'auto',
                                }}
                            >
                                Agregar Actividad
                            </Button>
                        </Box>

                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: '#f39c12', // Color para la sección de "Otros Horarios"
                            }}
                        >
                            Otros Horarios
                        </Typography>

                        {/* Mostrar las actividades en tarjetas */}
                        <Box display="flex" flexDirection="column" gap={2}>
                            {otrasActividades.map((actividad) => (
                                <Card key={actividad.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">{actividad.descripcion}</Typography>
                                        <Typography variant="body2">{actividad.startTime} - {actividad.endTime}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Container>

                {/* Diálogo para agregar una nueva actividad */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Descripción"
                            fullWidth
                            variant="outlined"
                            value={newActividad.descripcion}
                            onChange={(e) => setNewActividad({ ...newActividad, descripcion: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Hora de Inicio"
                            fullWidth
                            type="time"
                            value={newActividad.startTime}
                            onChange={(e) => setNewActividad({ ...newActividad, startTime: e.target.value })}
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Hora de Finalización"
                            fullWidth
                            type="time"
                            value={newActividad.endTime}
                            onChange={(e) => setNewActividad({ ...newActividad, endTime: e.target.value })}
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleAddActividad} color="primary">
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    // Aquí manejarías otras secciones (como Cultos o Consejería) si fuera necesario.
    return <div>Seleccione una opción válida</div>;
};

export default Agenda;
