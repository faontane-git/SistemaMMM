import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import LoginForm from './components/LoginForm/LoginForm';
import MainLayout from './components/MainLayout/MainLayout';
import PublishPage from './components/PublishPage/PublishPage';
import Settings from './components/Settings/Settings';
import Metrics from './components/Settings/Metrics';
import CrearNoticia from './components/CrearNoticia/CrearNoticia';
import DetalleNoticia from './components/DetalleNoticia/DetalleNoticia';
import Contactos from './components/Contactos/Contactos';
import Agenda from './components/Agenda/Agenda';
import RedesSociales from './components/RedesSociales/RedesSociales';
import Rutas from './components/Rutas/Rutas';
import SubirAudio from './components/SubirAudios/SubirAudios';
import DetalleAudio from './components/DetalleAudios/DetalleAudios';
import Personas from './components/Personas/Personas';
import CrearPersonaForm from './components/Personas/CrearPersonaForm';
import EditarPersona from './components/Personas/EditarPersona';
import Consultas from './components/Consultas/Consultas';
import EnviarNotificacion from './components/Sermones/EnviarNotificacion';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/menu" element={<MainLayout />} />
                    <Route path="/publicar" element={<PublishPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="/crear-noticia" element={<CrearNoticia />} />
                    <Route path="/detalle-noticia" element={<DetalleNoticia />} />
                    <Route path="/contactos" element={<Contactos />} />
                    <Route path="/subir-audio" element={<SubirAudio />} />
                    <Route path="/detalle-audio" element={<DetalleAudio />} />
                    <Route path="/rutas" element={<Rutas />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/redes-sociales" element={<RedesSociales />} />
                    <Route path="/personas" element={<Personas />} />
                    <Route path="/crear-persona" element={<CrearPersonaForm />} />
                    <Route path="/editar-persona/:id" element={<EditarPersona />} />
                    <Route path="/consultas" element={<Consultas />} />
                    <Route path="/enviarNotificacion" element={<EnviarNotificacion />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
