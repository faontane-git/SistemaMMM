import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, SelectChangeEvent, Container, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import ChurchInfoForm from './ChurchInfoForm';
import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import Navbar from '../Navbar';


interface ContactInfoFormProps {
    newPerson: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
    setIsStepValid: (isValid: boolean) => void;
}

const CrearPersonaForm: React.FC = () => {
    const [newPerson, setNewPerson] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);
    const [photo, setPhoto] = useState<string | null>(null);
    const navigate = useNavigate();
    const db = getFirestore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (isStepValid) {
            setActiveStep((prev) => prev + 1);
        } else {
            Swal.fire('Error', 'Por favor complete todos los campos antes de continuar.', 'error');
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleCreatePerson = async () => {
        if (isStepValid) {
            try {
                await addDoc(collection(db, 'Personas'), { ...newPerson, photo });
                Swal.fire('Éxito', 'Persona creada exitosamente.', 'success');
                navigate('/personas');
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al crear la persona.', 'error');
            }
        }
    };

    return (
        <div>
            <Navbar/>
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Crear Nueva Persona
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {['Información Personal', 'Información de Contacto', 'Información Eclesiástica'].map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box mt={3}>
                        {activeStep === 0 && (
                            <PersonalInfoForm
                                newPerson={newPerson}
                                handleInputChange={handleInputChange}
                                photo={photo}
                                handlePhotoChange={handlePhotoChange}
                                setIsStepValid={setIsStepValid}
                            />
                        )}
                        {activeStep === 1 && (
                            <ContactInfoForm
                                newPerson={newPerson}
                                handleInputChange={handleInputChange}
                                setIsStepValid={setIsStepValid}
                            />
                        )}
                        {activeStep === 2 && (
                            <ChurchInfoForm
                                newPerson={newPerson}
                                handleInputChange={handleInputChange}
                                setIsStepValid={setIsStepValid}
                            />
                        )}
                    </Box>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Atrás
                        </Button>
                        {activeStep === 2 ? (
                            <Button variant="contained" color="primary" onClick={handleCreatePerson}>
                                Crear Persona
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Siguiente
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Container>
        </div>

    );
};

export default CrearPersonaForm;
