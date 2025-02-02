import React, { useEffect, useState } from 'react';
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
    OutlinedInput,
} from '@mui/material';

interface PersonalInfoFormProps {
    newPerson: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
    photo: string | null;
    handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsStepValid: (isValid: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
    newPerson,
    handleInputChange,
    photo,
    handlePhotoChange,
    setIsStepValid,
}) => {
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid =
            newPerson.nombres?.trim() &&
            newPerson.apellidos?.trim() &&
            newPerson.fechaNacimiento &&
            newPerson.cedula?.length === 10 &&
            newPerson.sexo &&
            newPerson.estadoCivil &&
            photo;
        setFormValid(!!isValid);
        setIsStepValid(!!isValid);
    }, [newPerson, photo, setIsStepValid]);

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Información Personal
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                {photo ? (
                    <Avatar src={photo} alt="Foto" sx={{ width: 150, height: 150, mb: 2 }} />
                ) : (
                    <Avatar sx={{ width: 150, height: 150, mb: 2 }}>N/A</Avatar>
                )}
                <Button variant="contained" component="label">
                    Subir Foto
                    <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                </Button>
            </Box>
            <Grid container spacing={2}>
                {['nombres', 'apellidos'].map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <TextField
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={newPerson[field] || ''}
                            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                            required
                        />
                    </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Fecha de Nacimiento"
                        name="fechaNacimiento"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={newPerson.fechaNacimiento || ''}
                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Cédula"
                        name="cedula"
                        value={newPerson.cedula || ''}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            if (numericValue.length <= 10) {
                                handleInputChange({
                                    target: { name: 'cedula', value: numericValue },
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
                            name="sexo"
                            value={newPerson.sexo || ''}
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
                            name="estadoCivil"
                            value={newPerson.estadoCivil || ''}
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

                {newPerson.estadoCivil === 'CASADO' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre del Cónyuge"
                                name="conyuge"
                                value={newPerson.conyuge || ''}
                                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Matrimonio"
                                name="fechaMatrimonio"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={newPerson.fechaMatrimonio || ''}
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
