import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ValidarCertificados() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('Código QR Escaneado', `Datos: ${data}`, [
        { text: 'OK', onPress: () => setScanned(false) }
      ]);
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
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>

      {/* 🔹 Mensaje informativo */}
      <Text style={styles.scanText}>Escanea un código QR</Text>
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
    width: width * 0.8, // 📏 80% del ancho de la pantalla
    height: height * 0.5, // 📏 50% de la altura de la pantalla
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 80, // 📏 Margen para separarlo del header
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
});
