import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

interface Horario {
    id: string;
    dia: string;
    tipo: string; // Local: Culto o Consejería Pastoral
    descripcion: string;
    hora: string;
}

const Agenda: React.FC = () => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [open, setOpen] = useState(false);
    const [nuevoHorario, setNuevoHorario] = useState<Horario>({ id: '', dia: '', tipo: '', descripcion: '', hora: '' });
    const [editar, setEditar] = useState<boolean>(false);

    // Obtener horarios desde Firestore
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

    // Función para abrir el modal de creación/edición
    const handleOpenModal = (horario?: Horario) => {
        if (horario) {
            setNuevoHorario(horario);
            setEditar(true);
        } else {
            setNuevoHorario({ id: '', dia: '', tipo: '', descripcion: '', hora: '' });
            setEditar(false);
        }
        setOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpen(false);
        setNuevoHorario({ id: '', dia: '', tipo: '', descripcion: '', hora: '' });
    };

    // Función para manejar los cambios en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNuevoHorario({
            ...nuevoHorario,
            [e.target.name]: e.target.value,
        });
    };

    // Función para agregar o editar un horario en Firestore
    const handleGuardarHorario = async () => {
        const db = getFirestore();
        if (nuevoHorario.dia && nuevoHorario.tipo && nuevoHorario.descripcion && nuevoHorario.hora) {
            if (editar) {
                try {
                    const horarioRef = doc(db, 'Horarios', nuevoHorario.id);
                    await updateDoc(horarioRef, {
                        dia: nuevoHorario.dia,
                        tipo: nuevoHorario.tipo,
                        descripcion: nuevoHorario.descripcion,
                        hora: nuevoHorario.hora,
                    });

                    setHorarios(horarios.map((horario) => (horario.id === nuevoHorario.id ? nuevoHorario : horario)));
                    Swal.fire('Actualizado', 'El horario ha sido actualizado exitosamente', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Hubo un problema al actualizar el horario. Intenta de nuevo.', 'error');
                }
            } else {
                try {
                    const docRef = await addDoc(collection(db, 'Horarios'), {
                        dia: nuevoHorario.dia,
                        tipo: nuevoHorario.tipo,
                        descripcion: nuevoHorario.descripcion,
                        hora: nuevoHorario.hora,
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

    // Función para eliminar un horario de Firestore
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
                <Typography variant="body1" align="center" gutterBottom>
                    Aquí puedes gestionar los horarios de cultos y consejería pastoral.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                        Agregar Horario
                    </Button>
                </Box>

                {/* Lista de horarios */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {horarios.map((horario) => (
                        <Card key={horario.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{horario.dia}</Typography>
                                <Typography variant="body1">{horario.tipo}: {horario.descripcion} - {horario.hora}</Typography>
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

                {/* Modal para agregar/editar horarios */}
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>{editar ? 'Editar Horario' : 'Agregar Nuevo Horario'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Día"
                            name="dia"
                            fullWidth
                            value={nuevoHorario.dia}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Tipo (Culto o Consejería Pastoral)"
                            name="tipo"
                            fullWidth
                            value={nuevoHorario.tipo}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Descripción"
                            name="descripcion"
                            fullWidth
                            value={nuevoHorario.descripcion}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Hora"
                            name="hora"
                            fullWidth
                            value={nuevoHorario.hora}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
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
