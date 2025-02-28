import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { firestore } from "../../firebase";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

const CrearAudio: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const audioToEdit = location.state?.audio || null;

    const [audioData, setAudioData] = useState({
        name: '',
        description: '',
        type: '',
        url: '',
        uploadedAt: '',
    });

    useEffect(() => {
        if (audioToEdit) {
            setAudioData({
                name: audioToEdit.name,
                description: audioToEdit.description,
                type: audioToEdit.type || '',
                url: audioToEdit.url,
                uploadedAt: audioToEdit.uploadedAt,
            });
        }
    }, [audioToEdit]);

    const handleSave = async () => {
        try {
            let docRef;
            if (audioToEdit) {
                // Actualizar audio existente
                docRef = doc(firestore, 'Audios', audioToEdit.id);
                await updateDoc(docRef, audioData);
                Swal.fire({
                    icon: 'success',
                    title: 'Audio actualizado',
                    text: 'El audio ha sido actualizado correctamente.',
                });
            } else {
                // Guardar nuevo audio
                docRef = await addDoc(collection(firestore, 'Audios'), audioData);
                Swal.fire({
                    icon: 'success',
                    title: 'Audio guardado',
                    text: `El audio se guardó con éxito.`,
                });
            }
            navigate(`/detalle-audio`);
        } catch (error) {
            console.error('Error al guardar en Firestore:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el audio. Inténtalo de nuevo.',
            });
        }
    };

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        {audioToEdit ? 'Editar Mensaje' : 'Crear Nuevo Mensaje'}
                    </Typography>
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="outlined"
                            margin="normal"
                            value={audioData.name}
                            onChange={(e) => setAudioData({ ...audioData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            variant="outlined"
                            margin="normal"
                            value={audioData.description}
                            onChange={(e) => setAudioData({ ...audioData, description: e.target.value })}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                value={audioData.type}
                                onChange={(e) => setAudioData({ ...audioData, type: e.target.value })}
                            >
                                <MenuItem value="Sermones">Sermones</MenuItem>
                                <MenuItem value="Música">Música</MenuItem>
                                <MenuItem value="Juventud Victoriosa">Juventud Victoriosa</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="URL"
                            variant="outlined"
                            margin="normal"
                            value={audioData.url}
                            onChange={(e) => setAudioData({ ...audioData, url: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Fecha"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            value={audioData.uploadedAt}
                            onChange={(e) => setAudioData({ ...audioData, uploadedAt: e.target.value })}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                                Regresar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                {audioToEdit ? 'Actualizar' : 'Guardar'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </div>
    );
};

export default CrearAudio;
