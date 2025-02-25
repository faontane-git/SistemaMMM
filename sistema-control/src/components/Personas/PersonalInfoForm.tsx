import React, { useEffect } from 'react';
import {
    Box,
    Avatar,
    Button,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';

// Importa la interfaz Person
import { Person } from './CrearPersonaForm';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import imageCompression from "browser-image-compression";

interface PersonalInfoFormProps {
    newPerson: Person;
    setNewPerson: React.Dispatch<React.SetStateAction<Person>>;
    setIsStepValid: (isValid: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
    newPerson,
    setNewPerson,
    setIsStepValid,
}) => {

    // Manejar cambios en los campos
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
    
        setNewPerson((prevPerson) => {
            const updatedPerson = {
                ...prevPerson,
                [name]: value,
                Password: name === 'Cedula' ? value : prevPerson.Password, // Sincroniza Password con Cedula
            };
    
            // Si el estado civil cambia y NO es "CASADO", eliminar los datos del cónyuge
            if (name === 'EstadoCivil' && value !== 'CASADO') {
                updatedPerson.NombreCoyuge="";
                updatedPerson.FechaMatrimonio="";
            }
    
            return updatedPerson;
        });
    };

    const handleCedulaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        
        if (numericValue.length <= 10) {
            handleInputChange({
                target: { name: 'Cedula', value: numericValue },
            } as React.ChangeEvent<HTMLInputElement>);
    
            handleInputChange({
                target: { name: 'Password', value: numericValue },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    
        // 🔍 Si la cédula tiene 10 dígitos, validar en Firestore
        if (numericValue.length === 10) {
            const db = getFirestore();
            const personasCollection = collection(db, 'Personas');
            const q = query(personasCollection, where('Cedula', '==', numericValue));
    
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                Swal.fire({
                    title: 'Cédula Duplicada',
                    text: 'La cédula ingresada ya existe en la base de datos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
    
                // ❌ Si la cédula ya existe, la eliminamos del input
                handleInputChange({
                    target: { name: 'Cedula', value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
    
                handleInputChange({
                    target: { name: 'Password', value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
            }
        }
    };

    // Manejar cambio de foto y actualizar en newPerson
    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.1, // Tamaño máximo en MB (100KB)
                    maxWidthOrHeight: 300, // Redimensiona manteniendo proporción
                    useWebWorker: true, // Usa WebWorker para mejor rendimiento
                };
    
                const compressedFile = await imageCompression(file, options);
                const compressedBase64 = await imageCompression.getDataUrlFromFile(compressedFile);
    
                setNewPerson((prevPerson) => ({
                    ...prevPerson,
                    Photo: compressedBase64,
                }));
            } catch (error) {
                console.error("Error al comprimir la imagen:", error);
                Swal.fire("Error", "No se pudo procesar la imagen", "error");
            }
        }
    };

    // Validación del formulario
    useEffect(() => {
        const isValid =
            newPerson.Nombres.trim() &&
            newPerson.Apellidos.trim() &&
            newPerson.FechaNacimiento &&
            newPerson.Cedula.length === 10 &&
            newPerson.Sexo &&
            newPerson.EstadoCivil &&
            newPerson.Photo;

        setIsStepValid(!!isValid);
    }, [newPerson, setIsStepValid]);

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Información Personal
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                {newPerson.Photo ? (
                    <Avatar src={newPerson.Photo} alt="Foto" sx={{ width: 150, height: 150, mb: 2 }} />
                ) : (
                    <Avatar sx={{ width: 150, height: 150, mb: 2 }}>N/A</Avatar>
                )}
                <Button variant="contained" component="label">
                    Subir Foto
                    <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                </Button>
            </Box>
            <Grid container spacing={2}>
                {['Nombres', 'Apellidos'].map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <TextField
                            fullWidth
                            label={field}
                            name={field}
                            value={newPerson[field as keyof Person] || ''}
                            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                            required
                        />
                    </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Fecha de Nacimiento"
                        name="FechaNacimiento"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={newPerson.FechaNacimiento || ''}
                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Cédula"
                        name="Cedula"
                        value={newPerson.Cedula || ''}
                        onChange={handleCedulaChange}
                        inputProps={{ maxLength: 10 }}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            name="Sexo"
                            value={newPerson.Sexo || ''}
                            onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
                        >
                            <MenuItem value="MASCULINO">MASCULINO</MenuItem>
                            <MenuItem value="FEMENINO">FEMENINO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Estado Civil</InputLabel>
                        <Select
                            name="EstadoCivil"
                            value={newPerson.EstadoCivil || ''}
                            onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
                        >
                            <MenuItem value="SOLTERO">SOLTERO</MenuItem>
                            <MenuItem value="CASADO">CASADO</MenuItem>
                            <MenuItem value="DIVORCIADO">DIVORCIADO</MenuItem>
                            <MenuItem value="VIUDO">VIUDO</MenuItem>
                            <MenuItem value="UNIÓN LIBRE">UNIÓN LIBRE</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfoForm;
