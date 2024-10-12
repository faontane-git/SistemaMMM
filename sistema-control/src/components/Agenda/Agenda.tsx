import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip, SelectChangeEvent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

interface Actividad {
    id: string;
    dias: string[];
    descripcion: string;
    horaInicio: string;
    horaFin: string;
}

interface Horario {
    id: string;
    tipo: string;
    actividades: Actividad[];
}

const Agenda: React.FC = () => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [open, setOpen] = useState(false);
    const [nuevoHorario, setNuevoHorario] = useState<Horario>({
        id: '',
        tipo: '',
        actividades: [{ id: Date.now().toString(), dias: [], descripcion: '', horaInicio: '', horaFin: '' }]
    });
    const [editar, setEditar] = useState<boolean>(false);
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    useEffect(() => {
        const obtenerHorarios = async () => {
            try {
                const db = getFirestore();
                const horariosCollection = collection(db, 'Horarios');
                const querySnapshot = await getDocs(horariosCollection);
                const horariosArray = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as Horario[];
                setHorarios(horariosArray);
            } catch (error) {
                console.error('Error al obtener horarios:', error);
            }
        };

        obtenerHorarios();
    }, []);

    const handleOpenModal = (horario?: Horario) => {
        if (horario) {
            setNuevoHorario(horario);
            setEditar(true);
        } else {
            setNuevoHorario({ id: '', tipo: '', actividades: [{ id: Date.now().toString(), dias: [], descripcion: '', horaInicio: '', horaFin: '' }] });
            setEditar(false);
        }
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setNuevoHorario({ id: '', tipo: '', actividades: [{ id: Date.now().toString(), dias: [], descripcion: '', horaInicio: '', horaFin: '' }] });
    };

    // Función para manejar los cambios en las actividades (aceptando tanto HTMLInputElement como HTMLTextAreaElement)
    const handleChangeActividad = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const updatedActividades = [...nuevoHorario.actividades];
        updatedActividades[index] = { ...updatedActividades[index], [name]: value };
        setNuevoHorario({ ...nuevoHorario, actividades: updatedActividades });
    };

    const handleChangeDias = (e: SelectChangeEvent<string[]>, index: number) => {
        const updatedActividades = [...nuevoHorario.actividades];
        updatedActividades[index] = { ...updatedActividades[index], dias: e.target.value as string[] };
        setNuevoHorario({ ...nuevoHorario, actividades: updatedActividades });
    };

    const handleAddActividad = () => {
        setNuevoHorario({
            ...nuevoHorario,
            actividades: [...nuevoHorario.actividades, { id: Date.now().toString(), dias: [], descripcion: '', horaInicio: '', horaFin: '' }],
        });
    };

    const handleGuardarHorario = async () => {
        const db = getFirestore();
        if (nuevoHorario.tipo && nuevoHorario.actividades.every((act) => act.dias.length && act.descripcion && act.horaInicio && act.horaFin)) {
            if (editar) {
                try {
                    const horarioRef = doc(db, 'Horarios', nuevoHorario.id);
                    await updateDoc(horarioRef, {
                        tipo: nuevoHorario.tipo,
                        actividades: nuevoHorario.actividades,
                    });

                    setHorarios(horarios.map((horario) => (horario.id === nuevoHorario.id ? nuevoHorario : horario)));
                    Swal.fire('Actualizado', 'El horario ha sido actualizado exitosamente', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Hubo un problema al actualizar el horario. Intenta de nuevo.', 'error');
                }
            } else {
                try {
                    const docRef = await addDoc(collection(db, 'Horarios'), {
                        tipo: nuevoHorario.tipo,
                        actividades: nuevoHorario.actividades,
                    });

                    setHorarios([...horarios, { ...nuevoHorario, id: docRef.id }]);
                    Swal.fire('Agregado', 'El nuevo horario ha sido agregado exitosamente', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Hubo un problema al agregar el horario. Intenta de nuevo.', 'error');
                }
            }

            handleCloseModal();
        } else {
            Swal.fire('Campos incompletos', 'Por favor, completa todos los campos', 'warning');
        }
    };

    const handleEliminarHorario = async (id: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el horario de manera permanente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const db = getFirestore();
                    await deleteDoc(doc(db, 'Horarios', id));

                    setHorarios(horarios.filter((horario) => horario.id !== id));
                    Swal.fire('Eliminado', 'El horario ha sido eliminado', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Hubo un problema al eliminar el horario. Intenta de nuevo.', 'error');
                }
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Agenda de Horarios
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                        Agregar Horario
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {horarios.map((horario) => (
                        <Card key={horario.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{horario.tipo}</Typography>
                                {horario.actividades.map((actividad) => (
                                    <Typography key={actividad.id} variant="body1">
                                        {actividad.dias && actividad.dias.length > 0 ? actividad.dias.join(', ') : 'Sin días asignados'}: {actividad.descripcion} - {actividad.horaInicio} a {actividad.horaFin}
                                    </Typography>
                                ))}
                            </CardContent>
                            <Box>
                                <IconButton color="primary" onClick={() => handleOpenModal(horario)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleEliminarHorario(horario.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    ))}
                </Box>

                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>{editar ? 'Editar Horario' : 'Agregar Nuevo Horario'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Tipo (Culto o Consejería Pastoral)"
                            select
                            name="tipo"
                            fullWidth
                            value={nuevoHorario.tipo}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, tipo: e.target.value as string })}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="Culto">Culto</MenuItem>
                            <MenuItem value="Consejería Pastoral">Consejería Pastoral</MenuItem>
                        </TextField>

                        {nuevoHorario.actividades.map((actividad, index) => (
                            <Box key={actividad.id} sx={{ mb: 2 }}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="dias-label">Días</InputLabel>
                                    <Select
                                        labelId="dias-label"
                                        multiple
                                        value={actividad.dias}
                                        onChange={(e) => handleChangeDias(e as SelectChangeEvent<string[]>, index)}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {(selected as string[]).map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {diasSemana.map((dia) => (
                                            <MenuItem key={dia} value={dia}>
                                                {dia}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    margin="dense"
                                    label="Descripción"
                                    name="descripcion"
                                    fullWidth
                                    value={actividad.descripcion}
                                    onChange={(e) => handleChangeActividad(e, index)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="dense"
                                    label="Hora de Inicio"
                                    name="horaInicio"
                                    type="time"
                                    fullWidth
                                    value={actividad.horaInicio}
                                    onChange={(e) => handleChangeActividad(e, index)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="dense"
                                    label="Hora de Fin"
                                    name="horaFin"
                                    type="time"
                                    fullWidth
                                    value={actividad.horaFin}
                                    onChange={(e) => handleChangeActividad(e, index)}
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                        ))}
                        <Button onClick={handleAddActividad} variant="contained" color="primary">
                            Agregar Actividad
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleGuardarHorario} color="primary">
                            {editar ? 'Actualizar' : 'Crear'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
};

export default Agenda;
