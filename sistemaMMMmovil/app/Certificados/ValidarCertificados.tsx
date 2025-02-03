import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface CertificadoData {
  tipoCertificado: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  conyuge?: string;
  pastor?: string;
  fechaBautizo?: string;
  fechaMatrimonio?: string;
}

export default function ValidarCertificados() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      try {
        const parsedData: CertificadoData = JSON.parse(data);
        if (['carnet', 'bautismo', 'matrimonio'].includes(parsedData.tipoCertificado)) {
          setCertificadoData(parsedData);
        } else {
          Alert.alert('Código QR no válido', 'El tipo de certificado no es válido.', [
            { text: 'OK', onPress: () => setScanned(false) }
          ]);
        }
      } catch (error) {
        Alert.alert('Error', 'El código QR no contiene datos válidos.', [
          { text: 'OK', onPress: () => setScanned(false) }
        ]);
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!permission) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }

  if (!permission.granted) {
    return <Text>Acceso a la cámara denegado</Text>;
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Header con logo, título y botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Certificado de Bautismo</Text>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      {/* 🔹 Contenedor de la cámara más pequeña */}
      {!certificadoData && (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </View>
      )}

      {/* 🔹 Datos del certificado */}
      {certificadoData && (
        <View style={styles.certificadoContainer}>
          {certificadoData.tipoCertificado === 'carnet' && (
            <>
              <Text style={styles.validText}>Carnet Válido</Text>
              <Text style={styles.certificadoText}>Nombres: {certificadoData.nombres}</Text>
              <Text style={styles.certificadoText}>Apellidos: {certificadoData.apellidos}</Text>
              <Text style={styles.certificadoText}>Cédula: {certificadoData.cedula}</Text>
            </>
          )}
          {certificadoData.tipoCertificado === 'bautismo' && (
            <>
              <Text style={styles.validText}>Certificado de Bautismo Válido</Text>
              <Text style={styles.certificadoText}>Nombres: {certificadoData.nombres}</Text>
              <Text style={styles.certificadoText}>Apellidos: {certificadoData.apellidos}</Text>
              <Text style={styles.certificadoText}>Cédula: {certificadoData.cedula}</Text>
              <Text style={styles.certificadoText}>Cónyuge: {certificadoData.conyuge}</Text>
              <Text style={styles.certificadoText}>Pastor: {certificadoData.pastor}</Text>
              <Text style={styles.certificadoText}>Fecha de Bautizo: {certificadoData.fechaBautizo}</Text>
            </>
          )}
          {certificadoData.tipoCertificado === 'matrimonio' && (
            <>
              <Text style={styles.validText}>Certificado de Matrimonio Válido</Text>
              <Text style={styles.certificadoText}>Nombres: {certificadoData.nombres}</Text>
              <Text style={styles.certificadoText}>Apellidos: {certificadoData.apellidos}</Text>
              <Text style={styles.certificadoText}>Cédula: {certificadoData.cedula}</Text>
              <Text style={styles.certificadoText}>Cónyuge: {certificadoData.conyuge}</Text>
              <Text style={styles.certificadoText}>Fecha de Matrimonio: {certificadoData.fechaMatrimonio}</Text>
              <Text style={styles.certificadoText}>Pastor: {certificadoData.pastor}</Text>
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={() => { setScanned(false); setCertificadoData(null); }}>
            <Text style={styles.buttonText}>Escanear otro QR</Text>
          </TouchableOpacity>
        </View>
      )}

      {!certificadoData && <Text style={styles.scanText}>Escanea un código QR</Text>}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#003580',
    width: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cameraContainer: {
    width: width * 0.8,
    height: height * 0.5,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 80,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  scanText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 10,
  },
  certificadoContainer: {
    marginTop: 100,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  validText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  certificadoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#003580',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
