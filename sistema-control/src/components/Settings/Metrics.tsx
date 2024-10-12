import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import {
  Box,
  Typography,
  Card,
  Container,
  LinearProgress,
  CardContent,
  Divider,
} from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Metrics: React.FC = () => {
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [estimatedStorageUsageKB, setEstimatedStorageUsageKB] = useState<number>(0);
  const documentLimit = 10000; // Límite estimado para el número de documentos
  const avgDocSizeKB = 5; // Tamaño estimado de cada documento en KB
  const storageLimitKB = 1024 * 1024; // Límite de almacenamiento de 1GB en KB (1GB = 1,048,576 KB)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const db = getFirestore();
        let documentCount = 0;

        // Definir manualmente las colecciones que quieres sumar
        const collectionNames = ['Usuarios', 'RedesSociales', 'Noticias', 'Horarios', 'Contactos']; // Aquí defines las colecciones

        for (const name of collectionNames) {
          const querySnapshot = await getDocs(collection(db, name));
          documentCount += querySnapshot.size;
        }

        setTotalDocuments(documentCount);

        // Estimación del tamaño total de almacenamiento en KB
        const estimatedStorage = documentCount * avgDocSizeKB;
        setEstimatedStorageUsageKB(estimatedStorage);
      } catch (error) {
        console.error('Error fetching metrics: ', error);
      }
    };

    fetchMetrics();
  }, []);

  // Calcular porcentaje de documentos consumidos
  const documentPercentage = (totalDocuments / documentLimit) * 100;

  // Calcular porcentaje de almacenamiento consumido en relación a 1GB
  const storagePercentage = (estimatedStorageUsageKB / storageLimitKB) * 100;

  return (
    <div>
      <Navbar /> {/* Incluimos el Navbar */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#ffffff', // Fondo blanco
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
          pt: 8,
        }}
      >
        {/* Contenedor Principal */}
        <Container maxWidth="md">
          {/* Título Principal */}
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3a6073', mb: 4 }}
          >
            Métricas de Firebase
          </Typography>

          {/* Tarjeta para Métricas de Firestore */}
          <Card sx={{ mb: 4, padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Documentos en Firestore
              </Typography>
              <Typography variant="h6" sx={{ color: '#3a6073' }}>
                Número total de documentos: {totalDocuments} / {documentLimit} (Límite estimado)
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" gutterBottom>
                {documentPercentage.toFixed(2)}% del límite de documentos utilizado
              </Typography>
              {/* Barra de Progreso para documentos */}
              <LinearProgress
                variant="determinate"
                value={documentPercentage}
                sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0' }}
              />
            </CardContent>
          </Card>

          {/* Tarjeta para Estimación de Uso de Almacenamiento */}
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Estimación de Uso de Almacenamiento en Firestore
              </Typography>
              <Typography variant="h6" sx={{ color: '#3a6073' }}>
                Tamaño total estimado de almacenamiento: {estimatedStorageUsageKB.toFixed(2)} KB / {storageLimitKB.toLocaleString()} KB (1 GB)
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" gutterBottom>
                {storagePercentage.toFixed(2)}% del límite de almacenamiento utilizado
              </Typography>
              {/* Barra de Progreso para almacenamiento */}
              <LinearProgress
                variant="determinate"
                value={storagePercentage}
                sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0' }}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default Metrics;
