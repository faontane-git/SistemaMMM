import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

export default function CertificadoBautismo() {
  const certificateRef = useRef<View>(null); // Referencia para capturar la vista
  const [isViewReady, setIsViewReady] = useState(false); // Verificar si la vista está lista
  const [loading, setLoading] = useState(false); // Estado para mostrar el ActivityIndicator
  const navigation = useNavigation();

  useEffect(() => {
    // Marcar la vista como lista después de renderizar
    setIsViewReady(true);
  }, []);

  // Función para regresar a la pantalla anterior
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'No hay una pantalla anterior a la que regresar.');
    }
  };

  const saveCertificate = async () => {
    if (!certificateRef.current) {
      Alert.alert('Error', 'La referencia del certificado no está disponible.');
      return;
    }

    try {
      setLoading(true); // Mostrar indicador de carga
      // Solicitar permisos para guardar en la galería
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar en la galería sin permisos.');
        setLoading(false);
        return;
      }

      // Capturar la vista como imagen
      const uri = await captureRef(certificateRef.current, {
        format: 'jpg',
        quality: 1,
        result: 'tmpfile',
      });
      console.log('Captured URI:', uri);

      // Guardar la imagen en la galería
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log('Created Asset:', asset);

      await MediaLibrary.createAlbumAsync('Certificados', asset, false);

      Alert.alert('Éxito', 'Su certificado de Bautismo se ha guardado en la galería.');
    } catch (error) {
      console.error('Error guardando el certificado:', error);
      Alert.alert('Error', 'No se pudo guardar el certificado.');
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  const { width } = Dimensions.get('window'); // Obtener ancho de pantalla para diseño responsivo

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Certificado de Bautismo</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Certificado */}
      <View ref={certificateRef} style={[styles.certificate, { width: width * 0.9, height: (width * 0.9) * 1.5 }]}>
        <Image source={require('../../assets/images/Cbautismo.jpg')} style={styles.image} resizeMode="contain" />
        <Text style={[styles.text, { top: '52%', left: '27%' }]}>Juan Pérez</Text>
        <Text style={[styles.text, { top: '59.5%', left: '20%' }]}>01/01/2025</Text>
        <Text style={[styles.signature, { top: '63.5%', left: '30%' }]}>Pastor Smith</Text>
      </View>

      {/* Botón de Guardar */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveCertificate}
        disabled={loading || !isViewReady}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Guardar Certificado</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

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
  certificate: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 100, // Espacio entre el header y el certificado
    width: '90%',
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  signature: {
    position: 'absolute',
    fontSize: 12,
    fontStyle: 'italic',
    color: '#000',
  },
  saveButton: {
    marginTop: 20, // Espacio entre el botón y el certificado
    backgroundColor: '#003580',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center', // Centra el botón horizontalmente
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
