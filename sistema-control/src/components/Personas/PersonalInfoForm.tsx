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

        setNewPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
            Password: name === 'Cedula' ? value : prevPerson.Password, // Sincroniza Password con Cedula
            NombreCoyuge: name === 'EstadoCivil' && value !== 'CASADO' ? '' : prevPerson.NombreCoyuge,
            FechaMatrimonio: name === 'EstadoCivil' && value !== 'CASADO' ? '' : prevPerson.FechaMatrimonio,
        }));
    };

    // Manejar cambio de foto y actualizar en newPerson
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPerson((prevPerson) => ({
                    ...prevPerson,
                    Photo: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
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
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            if (numericValue.length <= 10) {
                                handleInputChange({
                                    target: { name: 'Cedula', value: numericValue },
                                } as React.ChangeEvent<HTMLInputElement>);

                                handleInputChange({
                                    target: { name: 'Password', value: numericValue },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }
                        }}
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

                {newPerson.EstadoCivil === 'CASADO' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre del Cónyuge"
                                name="NombreCoyuge"
                                value={newPerson.NombreCoyuge || ''}
                                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Matrimonio"
                                name="FechaMatrimonio"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={newPerson.FechaMatrimonio || ''}
                                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                                required
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default PersonalInfoForm;
