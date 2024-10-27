// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm'; // Asegúrate de que la ruta al componente sea correcta
import MainLayout from './components/MainLayout/MainLayout';
import PublishPage from './components/PublishPage/PublishPage';
import Settings from './components/Settings/Settings';
import Metrics from './components/Settings/Metrics';
import NoticiaEventos from './components/NoticePage/NoticiaEventos';
import CrearNoticia from './components/CrearNoticia/CrearNoticia';
import DetalleNoticia from './components/DetalleNoticia/DetalleNoticia';
import Contactos from './components/Contactos/Contactos';
import Agenda from './components/Agenda/Agenda';
import RedesSociales from './components/RedesSociales/RedesSociales';
import Rutas from './components/Rutas/Rutas';
import Audios from './components/Audios/Audios';
import SubirAudio from './components/SubirAudios/SubirAudios';
import DetalleAudio from './components/DetalleAudios/DetalleAudios';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='/menu' element={<MainLayout />} />
        <Route path="/publicar" element={<PublishPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/noticia-eventos" element={<NoticiaEventos />} />
        <Route path="/crear-noticia" element={<CrearNoticia />} /> {/* Nueva ruta para crear noticia */}
        <Route path="/detalle-noticia" element={<DetalleNoticia />} /> {/* Nueva ruta para crear noticia */}
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/audios" element={<Audios/>} />
        <Route path="/subir-audio" element={<SubirAudio/>} />
        <Route path="/detalle-audio" element={<DetalleAudio/>} />
        <Route path="/rutas" element={<Rutas/>} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/redes-sociales' element={<RedesSociales />} />
      </Routes>
    </Router>
  );
};

export default App;
