import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Avatar,
} from '@mui/material';
import Navbar from '../Navbar';

interface PersonData {
    nombres: string;
    apellidos: string;
    cedula: string;
    fechaNacimiento: string;
    sexo: string;
    estadoCivil: string;
    conyuge: string;
    pais: string;
    ciudadResidencia: string;
    direccionDomicilio: string;
    correo: string;
    contactoPersonal: string;
    contactoEmergencia: string;
    iglesiaActual: string;
    cargoIglesia: string;
    bautizadoAgua: string;
    fechaBautizo: string;
    pastor: string;
    iglesiaBautismo: string;
    bautizadoEspirituSanto: string;
    casadoEclesiasticamente: string;
    fechaMatrimonio: string;
    ministro: string;
    iglesiaMatrimonio: string;
    fotoUrl?: string | null;
}

const CrearPersonaForm: React.FC = () => {
    const [newPerson, setNewPerson] = useState<PersonData>({
        nombres: '',
        apellidos: '',
        cedula: '',
        fechaNacimiento: '',
        sexo: '',
        estadoCivil: '',
        conyuge: '',
        pais: '',
        ciudadResidencia: '',
        direccionDomicilio: '',
        correo: '',
        contactoPersonal: '',
        contactoEmergencia: '',
        iglesiaActual: '',
        cargoIglesia: '',
        bautizadoAgua: '',
        fechaBautizo: '',
        pastor: '',
        iglesiaBautismo: '',
        bautizadoEspirituSanto: '',
        casadoEclesiasticamente: '',
        fechaMatrimonio: '',
        ministro: '',
        iglesiaMatrimonio: '',
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (photo) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(photo);
        } else {
            setPreview(null);
        }
    }, [photo]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPhoto(file);
    };

    const handleCreatePerson = () => {
        console.log('Datos de la persona:', newPerson, 'Foto:', photo);
        navigate('/'); // Redirige a la página principal después de crear la persona
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Botón de "Regresar" fuera del formulario */}
                <Box mb={2} display="flex" justifyContent="flex-start">
                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                        Regresar
                    </Button>
                </Box>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Crear Nueva Persona
                    </Typography>
                    <Grid container spacing={3} alignItems="flex-start">
                        {/* Columna de foto y campos alineados verticalmente */}
                        <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                src={preview || "https://via.placeholder.com/150"}
                                alt="Preview"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mb: 2,
                                    borderRadius: 0, // Esto hace que la imagen sea cuadrada
                                }}
                            />
                            <Button variant="contained" component="label" sx={{ mb: 2 }}>
                                Subir Foto
                                <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                            </Button>
                            
                            {/* Campos debajo de la foto */}
                            <TextField
                                label="Ciudad Residencia"
                                fullWidth
                                margin="dense"
                                size="small"
                                variant="outlined"
                                value={newPerson.ciudadResidencia}
                                onChange={(e) =>
                                    setNewPerson((prev) => ({ ...prev, ciudadResidencia: e.target.value }))
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Dirección Domicilio"
                                fullWidth
                                margin="dense"
                                size="small"
                                variant="outlined"
                                value={newPerson.direccionDomicilio}
                                onChange={(e) =>
                                    setNewPerson((prev) => ({ ...prev, direccionDomicilio: e.target.value }))
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Correo"
                                fullWidth
                                margin="dense"
                                size="small"
                                variant="outlined"
                                value={newPerson.correo}
                                onChange={(e) =>
                                    setNewPerson((prev) => ({ ...prev, correo: e.target.value }))
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Contacto Emergencia"
                                fullWidth
                                margin="dense"
                                size="small"
                                variant="outlined"
                                value={newPerson.contactoEmergencia}
                                onChange={(e) =>
                                    setNewPerson((prev) => ({ ...prev, contactoEmergencia: e.target.value }))
                                }
                            />
                        </Grid>

                        {/* Campos en dos columnas a la derecha */}
                        <Grid item xs={12} sm={8}>
                            <Grid container spacing={2}>
                                {["nombres", "apellidos", "cedula", "fechaNacimiento", "sexo", "estadoCivil", "conyuge", "pais", "contactoPersonal", "iglesiaActual"].map((field) => (
                                    <Grid item xs={12} sm={6} key={field}>
                                        <TextField
                                            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            variant="outlined"
                                            value={newPerson[field as keyof PersonData]}
                                            onChange={(e) =>
                                                setNewPerson((prev) => ({ ...prev, [field]: e.target.value }))
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Botón de "Crear Persona" */}
                    <Box mt={4} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleCreatePerson}>
                            Crear Persona
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default CrearPersonaForm;
