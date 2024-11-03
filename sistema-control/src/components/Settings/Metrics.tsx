import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Box,
  Typography,
  Card,
  Container,
  LinearProgress,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Metrics: React.FC = () => {
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [estimatedStorageUsageKB, setEstimatedStorageUsageKB] = useState<number>(0);
  const documentLimit = 10000;
  const avgDocSizeKB = 5;
  const storageLimitKB = 1024 * 1024;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const db = getFirestore();
        let documentCount = 0;
        const collectionNames = ['Usuarios', 'RedesSociales', 'Noticias', 'Horarios', 'Contactos'];
        for (const name of collectionNames) {
          const querySnapshot = await getDocs(collection(db, name));
          documentCount += querySnapshot.size;
        }
        setTotalDocuments(documentCount);
        const estimatedStorage = documentCount * avgDocSizeKB;
        setEstimatedStorageUsageKB(estimatedStorage);
      } catch (error) {
        console.error('Error fetching metrics: ', error);
      }
    };
    fetchMetrics();
  }, []);

  const documentPercentage = (totalDocuments / documentLimit) * 100;
  const storagePercentage = (estimatedStorageUsageKB / storageLimitKB) * 100;

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f4f6f8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 3,
          pt: 6,
        }}
      >
        <Container maxWidth="sm">
          {/* Botón de Regresar */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ color: '#3a6073', borderColor: '#3a6073' }}
            >
              Regresar
            </Button>
          </Box>

          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3a6073', mb: 3, fontSize: '18px' }}
          >
            Métricas de Firebase
          </Typography>

          {/* Tarjeta para Documentos */}
          <Card
            sx={{
              mb: 3,
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#ffffff',
              '&:hover': {
                boxShadow: 5,
                transform: 'scale(1.01)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#1565c0', mb: 1, fontSize: '16px' }}>
                Documentos en Firestore
              </Typography>
              <Typography variant="body2" sx={{ color: '#424242', mb: 1 }}>
                Total de documentos: {totalDocuments} / {documentLimit} (Límite estimado)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" sx={{ color: '#616161', mb: 1 }}>
                {documentPercentage.toFixed(2)}% del límite de documentos utilizado
              </Typography>
              <LinearProgress
                variant="determinate"
                value={documentPercentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: documentPercentage > 75 ? '#d32f2f' : '#4caf50',
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Tarjeta para Almacenamiento */}
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#ffffff',
              '&:hover': {
                boxShadow: 5,
                transform: 'scale(1.01)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#1565c0', mb: 1, fontSize: '16px' }}>
                Uso de Almacenamiento en Firestore
              </Typography>
              <Typography variant="body2" sx={{ color: '#424242', mb: 1 }}>
                Almacenamiento estimado: {estimatedStorageUsageKB.toFixed(2)} KB / {storageLimitKB.toLocaleString()} KB (1 GB)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" sx={{ color: '#616161', mb: 1 }}>
                {storagePercentage.toFixed(2)}% del límite de almacenamiento utilizado
              </Typography>
              <LinearProgress
                variant="determinate"
                value={storagePercentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: storagePercentage > 75 ? '#d32f2f' : '#4caf50',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default Metrics;