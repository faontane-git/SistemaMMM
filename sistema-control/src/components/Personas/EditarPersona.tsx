import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import Navbar from '../Navbar';

interface PersonData {
    id: string;
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
                    setPerson(personData);
                    setPhoto(personData.foto || null);
                } else {
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
        if (person) {
            try {
                const db = getFirestore();
                const personDocRef = doc(db, 'Personas', person.id);
                await updateDoc(personDocRef, {
                    ...person,
                    foto: photo,
                });

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
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Nombres" name="nombres" value={person.nombres} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Apellidos" name="apellidos" value={person.apellidos} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Cédula" name="cedula" value={person.cedula} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={person.fechaNacimiento} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Sexo" name="sexo" value={person.sexo} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Estado Civil" name="estadoCivil" value={person.estadoCivil} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Cónyuge" name="conyuge" value={person.conyuge} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="País" name="pais" value={person.pais} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Ciudad de Residencia" name="ciudadResidencia" value={person.ciudadResidencia} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Dirección de Domicilio" name="direccionDomicilio" value={person.direccionDomicilio} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Correo" name="correo" value={person.correo} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Contacto Personal" name="contactoPersonal" value={person.contactoPersonal} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Contacto de Emergencia" name="contactoEmergencia" value={person.contactoEmergencia} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Iglesia Actual" name="iglesiaActual" value={person.iglesiaActual} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Cargo en la Iglesia" name="cargoIglesia" value={person.cargoIglesia} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Bautizado en Agua" name="bautizadoAgua" value={person.bautizadoAgua} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha de Bautizo" name="fechaBautizo" type="date" value={person.fechaBautizo} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Pastor" name="pastor" value={person.pastor} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Iglesia de Bautismo" name="iglesiaBautismo" value={person.iglesiaBautismo} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Bautizado en el Espíritu Santo" name="bautizadoEspirituSanto" value={person.bautizadoEspirituSanto} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Casado Eclesiásticamente" name="casadoEclesiasticamente" value={person.casadoEclesiasticamente} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha de Matrimonio" name="fechaMatrimonio" type="date" value={person.fechaMatrimonio} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Ministro" name="ministro" value={person.ministro} onChange={handleInputChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Iglesia de Matrimonio" name="iglesiaMatrimonio" value={person.iglesiaMatrimonio} onChange={handleInputChange} /></Grid>
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
