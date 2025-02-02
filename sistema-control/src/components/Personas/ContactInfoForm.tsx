import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface ContactInfoFormProps {
    newPerson: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
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

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ newPerson, handleInputChange, setIsStepValid }) => {
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e);
        const email = e.target.value;
        if (email && !validateEmail(email)) {
            setEmailError('Correo electrónico no válido');
        } else {
            setEmailError('');
        }
    };

    return (
        <Box mt={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                            name="pais"
                            value={newPerson.pais || ''}
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

                {["ciudadResidencia", "direccionDomicilio", "contactoPersonal", "contactoEmergencia"].map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <TextField
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={newPerson[field]}
                            onChange={handleInputChange}
                        />
                    </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Correo"
                        name="correo"
                        value={newPerson.correo || ''}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactInfoForm;
