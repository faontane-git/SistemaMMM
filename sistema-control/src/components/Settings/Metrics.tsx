import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './Metrics.css';
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importar Firestore
import { getStorage, ref, listAll, getMetadata } from "firebase/storage"; // Importar Firebase Storage

const Metrics: React.FC = () => {
    const [queryCount, setQueryCount] = useState<number>(0); // Estado para el número de documentos en Firestore
    const [storageMetrics, setStorageMetrics] = useState<number>(0); // Estado para uso de almacenamiento en MB
    const storageLimit = 1024; // Límite de almacenamiento en MB (1GB = 1024 MB)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Obtener el número de documentos en la colección "Usuarios"
                const db = getFirestore(); // Inicializar Firestore
                const querySnapshot = await getDocs(collection(db, "Usuarios"));
                setQueryCount(querySnapshot.size); // Guardar el número de documentos obtenidos

                // Calcular el uso de almacenamiento desde Firebase Storage
                const storage = getStorage(); // Inicializar Storage
                const storageRef = ref(storage); // Referencia a la raíz del almacenamiento

                // Listar todos los archivos en la raíz y calcular su tamaño total
                let totalSize = 0;
                const listResult = await listAll(storageRef);
                
                // Obtener metadatos de cada archivo
                for (const itemRef of listResult.items) {
                    const metadata = await getMetadata(itemRef);
                    totalSize += metadata.size; // Sumar el tamaño del archivo en bytes
                }

                // Convertir el tamaño total a MB
                const totalSizeInMB = totalSize / (1024 * 1024);
                setStorageMetrics(totalSizeInMB); // Almacenar el tamaño total en MB
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
                    <p>Tamaño total de almacenamiento: {storageMetrics.toFixed(2)} MB / {storageLimit} MB</p>
                    
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
