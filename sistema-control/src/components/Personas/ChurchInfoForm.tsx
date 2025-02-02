import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface ChurchInfoFormProps {
    newPerson: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
    setIsStepValid: (isValid: boolean) => void;
}

const ChurchInfoForm: React.FC<ChurchInfoFormProps> = ({ newPerson, handleInputChange, setIsStepValid }) => {
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid =
            newPerson.ministro?.trim() &&
            newPerson.iglesiaActual?.trim() &&
            newPerson.cargoIglesia?.trim() &&
            newPerson.bautizadoAgua?.trim() &&
            newPerson.fechaBautizo?.trim() &&
            newPerson.pastor?.trim() &&
            newPerson.iglesiaBautismo?.trim();
        setFormValid(!!isValid);
        setIsStepValid(!!isValid);
    }, [newPerson, setIsStepValid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        handleInputChange(e);
    };

    return (
        <Box mt={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Ministro"
                        name="ministro"
                        value={newPerson.ministro || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Iglesia Actual"
                        name="iglesiaActual"
                        value={newPerson.iglesiaActual || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Cargo en la Iglesia</InputLabel>
                        <Select
                            name="cargoIglesia"
                            value={newPerson.cargoIglesia || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="CO-PASTOR">CO-PASTOR</MenuItem>
                            <MenuItem value="LÍDER">LÍDER</MenuItem>
                            <MenuItem value="MIEMBRO ACTIVO">MIEMBRO ACTIVO</MenuItem>
                            <MenuItem value="MIEMBRO PASIVO">MIEMBRO PASIVO</MenuItem>
                            <MenuItem value="PASTOR">PASTOR</MenuItem>
                            <MenuItem value="PASTORA">PASTORA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Bautizado en Agua</InputLabel>
                        <Select
                            name="bautizadoAgua"
                            value={newPerson.bautizadoAgua || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="SI">SI</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Fecha de Bautizo"
                        name="fechaBautizo"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={newPerson.fechaBautizo || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Pastor"
                        name="pastor"
                        value={newPerson.pastor || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Iglesia de Bautismo"
                        name="iglesiaBautismo"
                        value={newPerson.iglesiaBautismo || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Bautizado en el Espíritu Santo</InputLabel>
                        <Select
                            name="bautizadoEspirituSanto"
                            value={newPerson.bautizadoEspirituSanto || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="si">SI</MenuItem>
                            <MenuItem value="no">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Casado Eclesiásticamente</InputLabel>
                        <Select
                            name="casadoEclesiasticamente"
                            value={newPerson.casadoEclesiasticamente || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="si">SI</MenuItem>
                            <MenuItem value="no">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Activo</InputLabel>
                        <Select
                            name="activo"
                            value={newPerson.activo || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="si">SI</MenuItem>
                            <MenuItem value="no">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Función</InputLabel>
                        <Select
                            name="funcion"
                            value={newPerson.funcion || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="Administrador">Administrador</MenuItem>
                            <MenuItem value="Feligrés">Feligrés</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {!formValid && (
                <Typography color="error" variant="body2" mt={2}>
                    Por favor, complete todos los campos antes de continuar.
                </Typography>
            )}
        </Box>
    );
};

export default ChurchInfoForm;
