import React, { useState } from 'react';
import {
    Box, Grid, Typography, Button, SelectChangeEvent,
    Container, Stepper, Step, StepLabel, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import ChurchInfoForm from './ChurchInfoForm';
import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import Navbar from '../Navbar';
import BautismoInfoForm from './BautismoInfoForm';
import MatrimonioInfoForm from './MatrimonioInfoForm';

export interface Person {
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: string;
    Cedula: string;
    Password: string;
    Sexo: string;
    EstadoCivil: string;
    NombreCoyuge?: string;
    FechaMatrimonio?: string;
    País: string;
    CiudadResidencia: string;
    DireccionDomicilio: string;
    ContactoPersonal: string;
    ContactoEmergencia: string;
    Correo: string;
    Ministro: string;
    IglesiaActual: string;
    IglesiaMatrimonio: string;
    CargoIglesia: string;
    BautizadoAgua: string;
    FechaBaustismo?: string;
    Pastor: string;
    IglesiaBautismo: string;
    BautizadoEspirutoSanto: string;
    CasadoEclesiaticamnete: string;
    Activo: string;
    Funcion: string;
    Photo?: string;
}

const CrearPersonaForm: React.FC = () => {
    const [newPerson, setNewPerson] = useState<Person>({
        Nombres: '',
        Apellidos: '',
        FechaNacimiento: '',
        Cedula: '',
        Password: '',
        Sexo: '',
        EstadoCivil: '',
        NombreCoyuge: '',
        FechaMatrimonio: '',
        País: '',
        CiudadResidencia: '',
        DireccionDomicilio: '',
        ContactoPersonal: '',
        ContactoEmergencia: '',
        Correo: '',
        Ministro: '',
        IglesiaActual: '',
        IglesiaMatrimonio: '',
        CargoIglesia: '',
        BautizadoAgua: '',
        FechaBaustismo: '',
        Pastor: '',
        IglesiaBautismo: '',
        BautizadoEspirutoSanto: '',
        CasadoEclesiaticamnete: '',
        Activo: '',
        Funcion: '',
        Photo: '',
    });

    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const db = getFirestore();
    const [isStepValid, setIsStepValid] = useState(false);

    const validateForm = (step: number): boolean => {
        const errors: string[] = [];

        if (step === 0) {
            if (!newPerson.Nombres.trim()) errors.push('El campo "Nombres" es obligatorio.');
            if (!newPerson.Apellidos.trim()) errors.push('El campo "Apellidos" es obligatorio.');
            if (!newPerson.FechaNacimiento) errors.push('Debe seleccionar una "Fecha de Nacimiento".');
            if (newPerson.Cedula.length !== 10) errors.push('La "Cédula" debe tener 10 dígitos.');
            if (!newPerson.Sexo) errors.push('Debe seleccionar un "Sexo".');
            if (!newPerson.EstadoCivil) errors.push('Debe seleccionar un "Estado Civil".');
            if (!newPerson.Photo) errors.push('Debe subir una foto.');
        }

        if (step === 1) {
            //if (!newPerson.País.trim()) errors.push('El campo "País" es obligatorio.');
            //if (!newPerson.CiudadResidencia.trim()) errors.push('El campo "Ciudad de Residencia" es obligatorio.');
            //if (!newPerson.DireccionDomicilio.trim()) errors.push('El campo "Dirección Domicilio" es obligatorio.');
            //if (!newPerson.ContactoPersonal.trim()) errors.push('El campo "Contacto Personal" es obligatorio.');
            //if (!newPerson.ContactoEmergencia.trim()) errors.push('El campo "Contacto de Emergencia" es obligatorio.');
            //if (!newPerson.Correo.trim()) errors.push('El campo "Correo" es obligatorio.');
        }

        if (step === 2) {
            //if (!newPerson.Ministro.trim()) errors.push('El campo "Ministro" es obligatorio.');
            //if (!newPerson.IglesiaActual.trim()) errors.push('El campo "Iglesia Actual" es obligatorio.');
            //if (!newPerson.CargoIglesia.trim()) errors.push('El campo "Cargo en la Iglesia" es obligatorio.');
            //if (!newPerson.BautizadoAgua.trim()) errors.push('Debe indicar si fue "Bautizado en Agua".');
            //if (!newPerson.Pastor.trim()) errors.push('El campo "Pastor" es obligatorio.');
            //if (!newPerson.IglesiaBautismo.trim()) errors.push('El campo "Iglesia Bautismo" es obligatorio.');
            //if (!newPerson.BautizadoEspirutoSanto.trim()) errors.push('Debe indicar si fue "Bautizado en el Espíritu Santo".');
            //if (!newPerson.CasadoEclesiaticamnete.trim()) errors.push('Debe indicar si fue "Casado Eclesiásticamente".');
            //if (!newPerson.Activo.trim()) errors.push('Debe indicar si está "Activo".');
            //if (!newPerson.Funcion.trim()) errors.push('Debe indicar su "Función".');
        }

        if (errors.length > 0) {
            Swal.fire({
                title: 'Campos Incompletos',
                html: errors.join('<br>'),
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return false;
        }

        return true;
    };



    const handleNext = () => {
        if (validateForm(activeStep)) {
            setActiveStep((prev) => prev + 1);
            setIsStepValid(true);
        } else {
            setIsStepValid(false);
        }
    };



    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleCreatePerson = async () => {
        if (!validateForm(0) || !validateForm(1) || !validateForm(2)) return;

        try {
            console.log("Objeto a guardar:", newPerson);
            await addDoc(collection(db, 'Personas'), newPerson);
            Swal.fire('Éxito', 'Persona creada exitosamente.', 'success');
            navigate('/personas');
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Hubo un problema al crear la persona.', 'error');
        }
    };


    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Crear Nueva Persona
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {['Información Personal', 'Información de Contacto', 'Información Actual', 'Información Bautismo', 'Infomación Matrimonio'].map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box mt={3}>
                        {activeStep === 0 && (
                            <PersonalInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={(isValid) => setIsStepValid(isValid)}
                            />
                        )}
                        {activeStep === 1 && (
                            <ContactInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={(isValid) => setIsStepValid(isValid)}
                            />
                        )}
                        {activeStep === 2 && (
                            <ChurchInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={(isValid) => setIsStepValid(isValid)}
                            />
                        )}
                        {activeStep === 3 && (
                            <BautismoInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={(isValid) => setIsStepValid(isValid)}
                            />
                        )}
                        {activeStep === 4 && (
                            <MatrimonioInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={(isValid) => setIsStepValid(isValid)}
                            />
                        )}
                    </Box>


                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Atrás
                        </Button>
                        {activeStep === 4 ? (
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
