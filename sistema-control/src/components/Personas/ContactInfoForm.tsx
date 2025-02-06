import React, { useEffect, useState } from 'react';
import {
    Box,
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

interface ContactInfoFormProps {
    newPerson: Person;
    setNewPerson: React.Dispatch<React.SetStateAction<Person>>;
    setIsStepValid: (isValid: boolean) => void;
}

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ newPerson, setNewPerson, setIsStepValid }) => {
    const [emailError, setEmailError] = useState('');

    // Validación de correo electrónico
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Manejo de cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        setNewPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    };

    // Manejo de cambios en el correo con validación
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e);
        const email = e.target.value;
        setEmailError(email && !validateEmail(email) ? 'Correo electrónico no válido' : '');
    };

    // Validación del formulario
    useEffect(() => {
        const isValid = !!(
            newPerson.País &&
            newPerson.CiudadResidencia &&
            newPerson.DireccionDomicilio &&
            newPerson.ContactoPersonal &&
            newPerson.ContactoEmergencia &&
            newPerson.Correo &&
            emailError.length === 0 // ✅ Verifica que emailError esté vacío
        );
    
        setIsStepValid(isValid);
    }, [newPerson, emailError, setIsStepValid]);
    

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Información de Contacto
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                            name="País"
                            value={newPerson.País || ''}
                            onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
                        >
                            {countries.map((country, idx) => (
                                <MenuItem key={idx} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {["CiudadResidencia", "DireccionDomicilio", "ContactoPersonal", "ContactoEmergencia"].map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <TextField
                            fullWidth
                            label={field.replace(/([A-Z])/g, ' $1').trim()} // Convierte camelCase a texto legible
                            name={field}
                            value={newPerson[field as keyof Person] || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Correo"
                        name="Correo"
                        value={newPerson.Correo || ''}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactInfoForm;
