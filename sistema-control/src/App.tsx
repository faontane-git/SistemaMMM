// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm'; // Asegúrate de que la ruta al componente sea correcta
import MainLayout from './components/MainLayout/MainLayout';
import PublishPage from './components/PublishPage/PublishPage';
import CreatePost from './components/PublishPage/CreatePost';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='/menu' element={<MainLayout/>}/>
        <Route path="/publicar" element={<PublishPage />} />
        <Route path="/crear-publicacion" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;
