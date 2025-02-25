import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Typography, Button,
    Container, Stepper, Step, StepLabel, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import ChurchInfoForm from './ChurchInfoForm';
import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import Navbar from '../Navbar';

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
    PastorBautismo:string;
    IglesiaBautismo: string;
    BautizadoEspirutoSanto: string;
    CasadoEclesiaticamnete: string;
    Activo: string;
    Funcion: string;
    Photo?: string;
}

const EditarPersona: React.FC = () => {
    const { id } = useParams(); // Obtener el ID de la persona desde la URL
    const navigate = useNavigate();
    const db = getFirestore();
    const [activeStep, setActiveStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);

    // Inicialización de `newPerson` para evitar errores
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
        PastorBautismo: '',
        IglesiaBautismo: '',
        BautizadoEspirutoSanto: '',
        CasadoEclesiaticamnete: '',
        Activo: '',
        Funcion: '',
        Photo: '',
    });

    // 🚀 Cargar datos de la persona desde Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const personDocRef = doc(db, 'Personas', id);
                const personSnapshot = await getDoc(personDocRef);

                if (personSnapshot.exists()) {
                    setNewPerson({ ...newPerson, ...personSnapshot.data() } as Person);
                } else {
                    Swal.fire('Error', 'Persona no encontrada', 'error');
                    navigate('/personas');
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                Swal.fire('Error', 'No se pudo cargar la información de la persona', 'error');
            }
        };

        fetchData();
    }, [id, db, navigate]);

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

    const handleUpdatePerson = async () => {
        if (!validateForm(0) || !validateForm(1) || !validateForm(2)) return;

        try {
            const personDocRef = doc(db, 'Personas', id as string);

            // ✅ Convertimos el objeto a Partial<Person> para evitar problemas con Firestore
            await updateDoc(personDocRef, { ...newPerson } as Partial<Person>);

            Swal.fire('Éxito', 'Persona actualizada correctamente', 'success');
            navigate('/personas');
        } catch (error) {
            console.error('Error al actualizar la persona:', error);
            Swal.fire('Error', 'No se pudo actualizar la persona', 'error');
        }
    };


    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Editar Persona
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
                    </Box>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Atrás
                        </Button>
                        {activeStep === 2 ? (
                            <Button variant="contained" color="primary" onClick={handleUpdatePerson}>
                                Guardar Cambios
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

export default EditarPersona;
