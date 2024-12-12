import React, { useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CertificadoBautismo() {
  const certificateRef = useRef<View>(null);
  const navigation = useNavigation();


  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // Regresa a la pantalla anterior
    } else {
      Alert.alert('Error', 'No hay una pantalla anterior a la que regresar.');
    }
  };

  const saveCertificate = async () => {
    try {
      if (certificateRef.current) {
        const uri = await captureRef(certificateRef.current, {
          format: 'jpg',
          quality: 1,
        });
        console.log('Certificado guardado:', uri);
      }
    } catch (error) {
      console.error('Error guardando el certificado:', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')} // Ruta local al logo
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Certificado de Bautismo</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View ref={certificateRef} style={styles.certificate}>
        {/* Imagen del certificado */}
        <Image
          source={require('../../assets/images/Cbautismo.jpg')} // Ruta de la imagen del certificado
          style={styles.image}
          resizeMode="contain"
        />
        {/* Texto genérico */}
        <Text style={[styles.text, { top: '52%', left: '27%' }]}>Juan Pérez</Text>
        <Text style={[styles.text, { top: '59.5%', left: '20%' }]}>01/01/2024</Text>
        {/* Texto de la firma */}
        <Text style={[styles.signature, { top: '63.5%', left: '30%' }]}>Pedro Gómez</Text>
      </View>
      {/* Botón para guardar */}
      <Button title="Guardar Certificado" onPress={saveCertificate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#003580',
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
  backIcon: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 50,
  },
  certificate: {
    width: 400,
    height: 600,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  signature: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'SignatureFont', // Usa el nombre de la fuente personalizada
    fontStyle: 'italic',
  },
});
