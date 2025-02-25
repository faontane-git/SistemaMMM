import React, { useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';

// Importa la interfaz Person
import { Person } from './CrearPersonaForm';

interface ChurchInfoFormProps {
    newPerson: Person;
    setNewPerson: React.Dispatch<React.SetStateAction<Person>>;
    setIsStepValid: (isValid: boolean) => void;
}

const ChurchInfoForm: React.FC<ChurchInfoFormProps> = ({ newPerson, setNewPerson, setIsStepValid }) => {

    // Manejo de cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        setNewPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    };

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Información de Baustismo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Bautizado en Agua</InputLabel>
                        <Select
                            name="BautizadoAgua"
                            value={newPerson.BautizadoAgua || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="SI">SI</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {newPerson.BautizadoAgua === "SI" && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Bautizo"
                                name="FechaBaustismo"
                                InputLabelProps={{ shrink: true }}
                                value={newPerson.FechaBaustismo || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Pastor de bautizmo"
                                name="PastorBautismo"
                                value={newPerson.Pastor || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Iglesia de Bautismo"
                                name="IglesiaBautismo"
                                value={newPerson.IglesiaBautismo || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default ChurchInfoForm;
