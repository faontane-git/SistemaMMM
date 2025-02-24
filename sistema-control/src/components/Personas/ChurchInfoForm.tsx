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
            newPerson.Ministro.trim() &&
            newPerson.IglesiaActual.trim() &&
            newPerson.CargoIglesia.trim() &&
            newPerson.BautizadoAgua.trim() &&
            newPerson.FechaBaustismo &&
            newPerson.Pastor.trim() &&
            newPerson.IglesiaBautismo.trim();

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
                Información Actual
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Pastor"
                        name="Pastor"
                        value={newPerson.Pastor || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Iglesia Actual"
                        name="IglesiaActual"
                        value={newPerson.IglesiaActual || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Cargo en la Iglesia</InputLabel>
                        <Select
                            name="CargoIglesia"
                            value={newPerson.CargoIglesia || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="LÍDER">LÍDER</MenuItem>
                            <MenuItem value="PASTOR">PASTOR</MenuItem>
                            <MenuItem value="PASTORA">PASTORA</MenuItem>
                            <MenuItem value="CO-PASTOR">CO-PASTOR</MenuItem>
                            <MenuItem value="MIEMBRO ACTIVO">MIEMBRO ACTIVO</MenuItem>
                            <MenuItem value="MIEMBRO PASIVO">MIEMBRO PASIVO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Bautizado en el Espíritu Santo</InputLabel>
                        <Select
                            name="BautizadoEspirutoSanto"
                            value={newPerson.BautizadoEspirutoSanto || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="SI">SI</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Activo</InputLabel>
                        <Select
                            name="Activo"
                            value={newPerson.Activo || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="SI">SI</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Función</InputLabel>
                        <Select
                            name="Funcion"
                            value={newPerson.Funcion || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Administrador">Administrador</MenuItem>
                            <MenuItem value="Feligrés">Feligrés</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChurchInfoForm;
