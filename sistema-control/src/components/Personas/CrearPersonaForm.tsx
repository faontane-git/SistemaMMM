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

// Definición de la interfaz para newPerson
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
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore();

    // Manejo de cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        setNewPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
            Password: name === 'Cedula' ? value : prevPerson.Password,
            // Corregir lógica de NombreCoyuge y FechaMatrimonio
            NombreCoyuge: name === 'EstadoCivil' && value !== 'CASADO' ? '' : prevPerson.NombreCoyuge,
            FechaMatrimonio: name === 'EstadoCivil' && value !== 'CASADO' ? '' : prevPerson.FechaMatrimonio,
        }));
    };

    // Manejo de cambio de foto
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

    const validateForm = () => {
        const errors = [];
    
        if (!newPerson.Nombres.trim()) errors.push('El campo "Nombres" es obligatorio.');
        if (!newPerson.Apellidos.trim()) errors.push('El campo "Apellidos" es obligatorio.');
        if (!newPerson.FechaNacimiento) errors.push('Debe seleccionar una "Fecha de Nacimiento".');
        if (newPerson.Cedula.length !== 10) errors.push('La "Cédula" debe tener 10 dígitos.');
        if (!newPerson.Sexo) errors.push('Debe seleccionar un "Sexo".');
        if (!newPerson.EstadoCivil) errors.push('Debe seleccionar un "Estado Civil".');
        if (!newPerson.Photo) errors.push('Debe subir una foto.');
    
        // Validación de cónyuge solo si el estado civil es "CASADO"
        if (newPerson.EstadoCivil === 'CASADO') {
            if (!newPerson.NombreCoyuge || !newPerson.NombreCoyuge.trim()) {
                errors.push('Debe ingresar el "Nombre del Cónyuge".');
            }
            if (!newPerson.FechaMatrimonio) {
                errors.push('Debe seleccionar una "Fecha de Matrimonio".');
            }
        }
    
        if (errors.length > 0) {
            Swal.fire({
                title: 'Campos Incompletos',
                html: errors.join('<br>'), // Mostrar errores en línea
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return false;
        }
    
        return true;
    };
    
    

    const handleNext = () => {
        if (validateForm()) {
            setIsStepValid(true); // Permitir avanzar
            setActiveStep((prev) => prev + 1);
        } else {
            setIsStepValid(false); // No permitir avanzar
        }
    };
    
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleCreatePerson = async () => {
        if (isStepValid) {
            try {
                console.log("Objeto a guardar:", newPerson); // Para depuración
                await addDoc(collection(db, 'Personas'), newPerson);
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
                                setNewPerson={setNewPerson} // Pasamos la función para modificar el estado
                                setIsStepValid={setIsStepValid}
                            />
                        )}
                        {activeStep === 1 && (
                            <ContactInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
                                setIsStepValid={setIsStepValid}
                            />
                        )}
                        {activeStep === 2 && (
                            <ChurchInfoForm
                                newPerson={newPerson}
                                setNewPerson={setNewPerson}
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
