import React, { useRef } from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { PermissionsAndroid, Platform } from 'react-native';
 
export default function  CertificadoBautismo () {
  const certificateRef = useRef<View>(null);

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
        <Text style={[styles.text, { top: '63.5%', left: '30%' }]}>Pedro Gómez</Text>
      </View>
      {/* Botón para guardar */}
      <Button title="Guardar Certificado" onPress={saveCertificate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

 