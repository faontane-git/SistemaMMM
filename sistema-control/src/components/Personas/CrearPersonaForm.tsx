import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';

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
    foto?: string;
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
        bautizadoAgua: 'no',
        fechaBautizo: '',
        pastor: '',
        iglesiaBautismo: '',
        bautizadoEspirituSanto: 'no', // Default como false
        casadoEclesiasticamente: 'no',
        fechaMatrimonio: '',
        ministro: '',
        iglesiaMatrimonio: '',
    });
    const [photo, setPhoto] = useState<string | null>(null);
    const navigate = useNavigate();
    const db = getFirestore();

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Configuración de compresión
                const options = {
                    maxSizeMB: 1, // Limitar el tamaño a 1MB
                    maxWidthOrHeight: 800, // Limitar el tamaño a 800px de ancho o alto
                    useWebWorker: true,
                };
    
                // Comprimir la imagen
                const compressedFile = await imageCompression(file, options);
    
                // Convertir a Base64 para guardar en Firestore
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhoto(reader.result as string); // Guardar la cadena Base64 en el estado
                };
                reader.readAsDataURL(compressedFile); // Convertir el archivo comprimido a Base64
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
                Swal.fire('Error', 'Hubo un problema al comprimir la foto.', 'error');
            }
        }
    };
    

    const handleSelectChange = (name: string, value: string) => {
        setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    };

    const handleCreatePerson = async () => {
        if (!photo) {
            Swal.fire('Error', 'Debe subir una foto antes de guardar.', 'error');
            return;
        }

        try {
            await addDoc(collection(db, 'Personas'), {
                ...newPerson,
                foto: photo, // Aquí se incluye la imagen en Base64
                estado: 'activo', // Estado inicial
            });

            Swal.fire('Creado', 'La persona ha sido creada exitosamente.', 'success');
            navigate('/personas'); // Redirige a la lista de personas
        } catch (error) {
            console.error('Error al crear persona:', error);
            Swal.fire('Error', 'Hubo un problema al crear la persona.', 'error');
        }
    };

    const handleGoBack = () => {
        navigate('/personas');
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Crear Nueva Persona
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {photo ? (
                        <Avatar src={photo} alt="Preview" sx={{ width: 150, height: 150, mb: 2, borderRadius: 0 }} />
                    ) : (
                        <Avatar sx={{ width: 150, height: 150, mb: 2 }}>N/A</Avatar>
                    )}
                    <Button variant="contained" component="label">
                        Subir Foto
                        <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                    </Button>
                </Box>

                <Box mt={3}>
                    <Grid container spacing={2}>
                        {[
                            { label: 'Nombres', name: 'nombres' },
                            { label: 'Apellidos', name: 'apellidos' },
                            { label: 'Cédula', name: 'cedula' },
                            { label: 'Fecha de Nacimiento', name: 'fechaNacimiento', type: 'date' },
                            { label: 'Sexo', name: 'sexo', type: 'select', options: ['Masculino', 'Femenino'] },
                            {
                                label: 'Estado Civil',
                                name: 'estadoCivil',
                                type: 'select',
                                options: ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión de hecho'],
                            },
                            { label: 'Cónyuge', name: 'conyuge' },
                            { label: 'País', name: 'pais' },
                            { label: 'Ciudad de Residencia', name: 'ciudadResidencia' },
                            { label: 'Dirección de Domicilio', name: 'direccionDomicilio' },
                            { label: 'Correo', name: 'correo' },
                            { label: 'Contacto Personal', name: 'contactoPersonal' },
                            { label: 'Contacto de Emergencia', name: 'contactoEmergencia' },
                            { label: 'Iglesia Actual', name: 'iglesiaActual' },
                            {
                                label: 'Cargo en la Iglesia',
                                name: 'cargoIglesia',
                                type: 'select',
                                options: ['CO-PASTOR', 'LÍDER', 'MIEMBRO ACTIVO', 'MIEMBRO PASIVO', 'PASTOR', 'PASTORA'],
                            }, {
                                label: 'Bautizado en Agua',
                                name: 'bautizadoAgua',
                                type: 'select',
                                options: ['si', 'no'],
                            },
                            { label: 'Fecha de Bautizo', name: 'fechaBautizo', type: 'date' },
                            { label: 'Pastor', name: 'pastor' },
                            { label: 'Iglesia de Bautismo', name: 'iglesiaBautismo' },
                            {
                                label: 'Bautizado en el Espíritu Santo',
                                name: 'bautizadoEspirituSanto',
                                type: 'select',
                                options: ['si', 'no'],
                            },
                            {
                                label: 'Casado Eclesiásticamente',
                                name: 'casadoEclesiasticamente',
                                type: 'select',
                                options: ['si', 'no'],
                            },
                            { label: 'Fecha de Matrimonio', name: 'fechaMatrimonio', type: 'date' },
                            { label: 'Ministro', name: 'ministro' },
                            { label: 'Iglesia de Matrimonio', name: 'iglesiaMatrimonio' },
                        ].map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                {field.type === 'select' ? (
                                    <FormControl fullWidth>
                                        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                        <Select
                                            labelId={`${field.name}-label`}
                                            value={(newPerson as any)[field.name]}
                                            onChange={(e) => handleSelectChange(field.name, e.target.value)}
                                        >
                                            {field.options?.map((option, i) => (
                                                <MenuItem key={i} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        type={field.type || 'text'}
                                        value={(newPerson as any)[field.name]}
                                        onChange={handleInputChange}
                                        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleCreatePerson}>
                        Crear Persona
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleGoBack}>
                        Regresar
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default CrearPersonaForm;
