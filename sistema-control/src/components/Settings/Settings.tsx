import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Importamos el Navbar
import './Settings.css'; // Estilos específicos para la pantalla de configuración

const Settings: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar sesión, como eliminar un token
        console.log('Sesión cerrada');
        // Redirigir a la pantalla de login
        navigate('/');
    };

    const goToMetrics = () => {
        // Redirigir a la pantalla de métricas
        navigate('/metrics');
    };

    return (
        <div>
            <Navbar /> {/* Incluimos el Navbar */}
            <div className="settings-container">
                <h1 className="settings-title">Configuración de Usuario</h1>

                <div className="settings-options">
                    <div className="settings-item">
                        <h2>Métricas</h2>
                        <p>Mira las métricas de almacenamiento y consultas.</p>
                        <button className="settings-button" onClick={goToMetrics}>Ver métricas</button> {/* Redirige a métricas */}
                    </div>

                    <div className="settings-item">
                        <h2>Preferencias</h2>
                        <p>Configura tus preferencias de cuenta.</p>
                        <button className="settings-button">Modificar</button>
                    </div>

                    <div className="settings-item">
                        <h2>Cerrar Sesión</h2>
                        <p>Salir de la cuenta actual.</p>
                        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
