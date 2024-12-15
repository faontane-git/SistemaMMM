import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../../firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';

interface Persona {
  nombres: string;
  apellidos: string;
  cedula: string;
  foto: string;
  casadoEclesiasticamente: string;
  conyuge: string;
  pastor:string;
}

export default function CertificadoMatrimonio() {
  const certificateRef = useRef<View>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { cedula } = route.params as { cedula: string };
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const q = query(
          collection(firestore, 'Personas'),
          where('cedula', '==', cedula)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as Persona;
          setPersona(data);
        } else {
          Alert.alert('Error', 'No se encontró información para la cédula proporcionada.');
        }
      } catch (error) {
        console.error('Error al buscar los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [cedula]);

  // Función para regresar a la pantalla anterior
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'No hay una pantalla anterior a la que regresar.');
    }
  };

  // Función para guardar el certificado como imagen
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

  // Mostrar indicador de carga mientras se obtiene la información
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#003580" />
      </View>
    );
  }

  // Mostrar mensaje si no se encontró la persona
  if (!persona) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 16, color: 'red' }}>No se encontró información para la cédula proporcionada.</Text>
        <Button title="Volver" onPress={handleGoBack} />
      </View>
    );
  }

  // Mostrar pantalla si no está casado eclesiásticamente
  if (persona.casadoEclesiasticamente.toLowerCase() === 'no') {
    return (
      <View style={styles.container}>
        <Text style={styles.noCertificateText}>
          Estimado/a {persona.nombres} {persona.apellidos}, usted no posee certificado de matrimonio debido a que no se ha casado eclesiásticamente.
        </Text>
        <Button title="Volver" onPress={handleGoBack} />
      </View>
    );
  }

  // Generar datos del QR
  const qrData = JSON.stringify({
    name: `${persona.nombres} ${persona.apellidos}`,
    date: new Date().toLocaleDateString(),
    issuer: 'Organización',
    certificateId: `CERT-${cedula}`,
  });

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrData)}`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Certificado de Matrimonio</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Certificado */}
      <View ref={certificateRef} style={styles.certificate}>
        <Image source={require('../../assets/images/Cmatrimonio.jpg')} style={styles.image} resizeMode="contain" />
        <Text style={[styles.text, { top: '48%', left: '10%' }]}>{persona.nombres} {persona.apellidos}</Text>
        <Text style={[styles.text, { top: '48%', left: '55%' }]}>{persona.conyuge}</Text>
        <Text style={[styles.text, { top: '58%', left: '70%' }]}>{persona.pastor}</Text>
        <Text style={[styles.text, { top: '58%', left: '20%' }]}>01/01/2024</Text>
        <Text style={[styles.text, { top: '61.5%', left: '10%' }]}>{persona.nombres} {persona.apellidos}</Text>
        <Text style={[styles.text, { top: '61.5%', left: '60%' }]}>{persona.conyuge}</Text>
        <Image source={{ uri: qrUrl }} style={[styles.qrCode, { top: '35.5%', left: '80%' }]} />
      </View>

      {/* Botón para guardar */}
      <Button title="Guardar Certificado" onPress={saveCertificate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  noCertificateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
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
    fontSize: 7,
    fontWeight: 'bold',
    color: '#000',
  },
  signature: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '400',
    color: '#000',
    fontStyle: 'italic',
  },
  qrCode: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
});
