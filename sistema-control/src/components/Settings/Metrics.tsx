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
import { getStorage, ref, listAll, getMetadata } from 'firebase/storage';

const Metrics: React.FC = () => {
  const [queryCount, setQueryCount] = useState<number>(0);
  const [storageMetrics, setStorageMetrics] = useState<number>(0);
  const storageLimit = 1024; // Límite de almacenamiento en MB (1GB = 1024 MB)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Obtener el número de documentos en la colección "Usuarios"
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'Usuarios'));
        setQueryCount(querySnapshot.size);

        // Calcular el uso de almacenamiento desde Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage);

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
        setStorageMetrics(totalSizeInMB);
      } catch (error) {
        console.error('Error fetching metrics: ', error);
      }
    };

    fetchMetrics();
  }, []);

  // Calcular porcentaje de uso de almacenamiento
  const storagePercentage = (storageMetrics / storageLimit) * 100;

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
                Número de documentos: {queryCount}
              </Typography>
            </CardContent>
          </Card>

          {/* Tarjeta para Métricas de Almacenamiento */}
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Uso de Almacenamiento
              </Typography>
              <Typography variant="h6" sx={{ color: '#3a6073' }}>
                Tamaño total de almacenamiento: {storageMetrics.toFixed(2)} MB / {storageLimit} MB
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" gutterBottom>
                {storagePercentage.toFixed(2)}% utilizado
              </Typography>

              {/* Barra de Progreso */}
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
