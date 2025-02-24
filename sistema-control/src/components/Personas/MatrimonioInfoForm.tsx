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

    // Validar los campos requeridos
    useEffect(() => {
        const isValid =
            newPerson.Ministro?.trim() &&
            newPerson.IglesiaActual?.trim() &&
            newPerson.CargoIglesia?.trim() &&
            newPerson.BautizadoAgua?.trim() &&
            newPerson.CasadoEclesiaticamnete?.trim() &&
            (newPerson.CasadoEclesiaticamnete === "NO" || 
             (newPerson.FechaMatrimonio?.trim() && newPerson.IglesiaMatrimonio?.trim()));

        setIsStepValid(!!isValid);
    }, [newPerson, setIsStepValid]);

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
                Información Matrimonio
            </Typography>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Casado Eclesiásticamente</InputLabel>
                        <Select
                            name="CasadoEclesiaticamnete"
                            value={newPerson.CasadoEclesiaticamnete || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="SI">SI</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {newPerson.CasadoEclesiaticamnete === "SI" && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Iglesia Matrimonio"
                                name="IglesiaMatrimonio"
                                value={newPerson.IglesiaMatrimonio || ''}
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
