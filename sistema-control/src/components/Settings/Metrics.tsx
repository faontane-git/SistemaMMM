import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './Metrics.css'; // Asegúrate de tener un archivo de estilos separado para las métricas
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importa Firestore

const Metrics: React.FC = () => {
    const [queryCount, setQueryCount] = useState<number>(0); // Estado para el número de consultas
    const [storageMetrics, setStorageMetrics] = useState<number>(0); // Estado para almacenamiento

    const storageLimit = 1024; // Límite de 1GB (1024 MB)

    useEffect(() => {
        // Función para obtener las métricas desde Firestore
        const fetchMetrics = async () => {
            try {
                const db = getFirestore(); // Inicializa Firestore
                const querySnapshot = await getDocs(collection(db, "DatosMMM")); // Cambia 'yourCollection' por tu colección
                setQueryCount(querySnapshot.size); // Almacena el número de documentos obtenidos

                // Simulación de uso de almacenamiento en MB
                setStorageMetrics(650); // Cambia esto por el valor que obtengas de Firebase Storage
            } catch (error) {
                console.error("Error fetching metrics: ", error);
            }
        };

        fetchMetrics();
    }, []); // Ejecuta una vez al montar el componente

    // Calcular porcentaje de uso de almacenamiento
    const storagePercentage = (storageMetrics / storageLimit) * 100;

    return (
        <div>
            <Navbar /> {/* Incluimos el Navbar */}
            <div className="metrics-container">
                <h1 className="metrics-title">Métricas de Firebase</h1>

                <div className="metrics-info">
                    <h2>Documentos en Firestore</h2>
                    <p>Número de documentos: {queryCount}</p>

                    <h2>Uso de Almacenamiento</h2>
                    <p>Tamaño total de almacenamiento: {storageMetrics} MB / {storageLimit} MB</p>
                    
                    {/* Barra de progreso */}
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${storagePercentage}%` }}
                        ></div>
                    </div>
                    <p>{storagePercentage.toFixed(2)}% utilizado</p>
                </div>
            </div>
        </div>
    );
};

export default Metrics;
