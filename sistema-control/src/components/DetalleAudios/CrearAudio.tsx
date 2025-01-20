import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import Navbar from '../Navbar';

const CrearAudio: React.FC = () => {
    const location = useLocation();
    const audioToEdit = location.state?.audio || null;

    const [audioData, setAudioData] = useState({
        name: '',
        description: '',
        url: '',
        uploadedAt: '',
    });

    useEffect(() => {
        if (audioToEdit) {
            setAudioData({
                name: audioToEdit.name,
                description: audioToEdit.description,
                url: audioToEdit.url,
                uploadedAt: audioToEdit.uploadedAt,
            });
        }
    }, [audioToEdit]);

    const handleSave = () => {
        if (audioToEdit) {
            console.log('Actualizando audio:', audioData);
        } else {
            console.log('Creando nuevo audio:', audioData);
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
                        {audioToEdit ? 'Editar Audio' : 'Crear Nuevo Audio'}
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                            >
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
