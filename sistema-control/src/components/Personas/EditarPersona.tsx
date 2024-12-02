import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import Navbar from '../Navbar';

interface PersonData {
    id?: string;  // Agrega el campo id como opcional
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

const EditarPersona: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<PersonData | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const db = getFirestore();
                const personDocRef = doc(db, 'Personas', id as string);
                const personDoc = await getDoc(personDocRef);

                if (personDoc.exists()) {
                    const personData = personDoc.data() as PersonData;
                    setPerson({ ...personData, id: personDoc.id }); // Agrega el id del documento
                    setPhoto(personData.foto || null);
                }
                else {
                    Swal.fire('Error', 'No se encontró la persona especificada.', 'error');
                    navigate('/'); // Redirige si no se encuentra la persona
                }
            } catch (error) {
                console.error('Error fetching person:', error);
                Swal.fire('Error', 'Hubo un problema al cargar los datos.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id, navigate]);

    
    const handleSelectChange = (name: string, value: string) => {
        setPerson((prevPerson) => 
            prevPerson ? { ...prevPerson, [name]: value || '' } : null
        );
    };
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPerson((prevPerson) => prevPerson ? { ...prevPerson, [name]: value } : prevPerson);
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhoto(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
                Swal.fire('Error', 'No se pudo procesar la imagen. Intenta con otra.', 'error');
            }
        }
    };

    const handleSaveChanges = async () => {
        if (person && person.id) { // Verifica que person y person.id existan
            try {
                const personToSave = {
                    nombres: person.nombres || '',
                    apellidos: person.apellidos || '',
                    cedula: person.cedula || '',
                    fechaNacimiento: person.fechaNacimiento || '',
                    sexo: person.sexo || '',
                    estadoCivil: person.estadoCivil || '',
                    conyuge: person.conyuge || '',
                    pais: person.pais || '',
                    ciudadResidencia: person.ciudadResidencia || '',
                    direccionDomicilio: person.direccionDomicilio || '',
                    correo: person.correo || '',
                    contactoPersonal: person.contactoPersonal || '',
                    contactoEmergencia: person.contactoEmergencia || '',
                    iglesiaActual: person.iglesiaActual || '',
                    cargoIglesia: person.cargoIglesia || '',
                    bautizadoAgua: person.bautizadoAgua || '',
                    fechaBautizo: person.fechaBautizo || '',
                    pastor: person.pastor || '',
                    iglesiaBautismo: person.iglesiaBautismo || '',
                    bautizadoEspirituSanto: person.bautizadoEspirituSanto || '',
                    casadoEclesiasticamente: person.casadoEclesiasticamente || '',
                    fechaMatrimonio: person.fechaMatrimonio || '',
                    ministro: person.ministro || '',
                    iglesiaMatrimonio: person.iglesiaMatrimonio || '',
                    foto: person.foto || ''
                };
    
                const db = getFirestore();
                const personDocRef = doc(db, 'Personas', person.id); // Usar person.id
                await updateDoc(personDocRef, personToSave);
    
                Swal.fire('Guardado', 'Los cambios han sido guardados.', 'success');
                navigate('/personas'); // Redirige a la lista de personas
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
            }
        }
    };
    
    

    const handleGoBack = () => {
        navigate('/personas'); // Redirige a la lista de personas
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography variant="h6">Cargando...</Typography>
            </Box>
        );
    }

    if (!person) {
        return null; // O muestra un mensaje de error si prefieres
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Editar Persona
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {photo ? (
                        <Avatar src={photo} alt="Preview" sx={{ width: 150, height: 150, mb: 2, borderRadius: 0 }} />
                    ) : (
                        <Avatar sx={{ width: 150, height: 150, mb: 2 }}>{person.nombres.charAt(0)}</Avatar>
                    )}
                    <Button variant="contained" component="label">
                        Cambiar Foto
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
                                            value={(person as any)[field.name]}
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
                                        value={(person as any)[field.name]}
                                        onChange={handleInputChange}
                                        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleGoBack}>
                        Regresar
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default EditarPersona;
