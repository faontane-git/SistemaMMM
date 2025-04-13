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
import ProtectedRoute from './components/ProtectedRoute';
import CrearAudio from './components/DetalleAudios/CrearAudio';
import FormularioNotificacion from './components/Sermones/FormularioNotificacion';
import BienvenidaPage from './components/Bienvenida/Bienvenida';
import QuienesSomos from './components/QuienesSomos/QuienesSomos';
import Doctrina from './components/Doctrina/Doctrina';
import FormularioActividad from './components/Agenda/FormularioActividad';
import HorarioOtros from './components/Agenda/HorarioOtros';
import HorarioConsojeria from './components/Agenda/HorarioConsejeria';
import HorarioCultos from './components/Agenda/HorarioCultos';
import PaginaNotificaciones from './components/Notificaciones/Notificaciones';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/menu" element={<PublishPage />} />
                        <Route path="/publicar" element={<PublishPage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/metrics" element={<Metrics />} />
                        <Route path="/crear-noticia" element={<CrearNoticia />} />
                        <Route path="/detalle-noticia" element={<DetalleNoticia />} />
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
                        <Route path="/crear-notificacion" element={<FormularioNotificacion />} />
                        <Route path="/crear-audio" element={<CrearAudio />} />
                        <Route path='/bienvenida' element={<BienvenidaPage />} />
                        <Route path='/quienes-somos' element={<QuienesSomos />} />
                        <Route path='/doctrina' element={<Doctrina />} />
                        <Route path='/horario-otros' element={<HorarioOtros/>}/>
                        <Route path='/horario-consejeria' element={<HorarioConsojeria/>}/>
                        <Route path='/horario-cultos' element={<HorarioCultos/>}/>
                        <Route path="/notificaciones" element={<PaginaNotificaciones />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
