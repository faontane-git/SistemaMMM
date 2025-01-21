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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { firestore } from '../../firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';

interface Persona {
  nombres: string;
  apellidos: string;
  cedula: string;
  foto: string;
  casadoEclesiasticamente: string;
  conyuge: string;
  pastor: string;
  fechaBautizo: string;
}

export default function CertificadoBautismo() {
  const certificateRef = useRef<View>(null);
  const [isViewReady, setIsViewReady] = useState(false);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { cedula } = route.params as { cedula: string };

  useEffect(() => {
    setIsViewReady(true);
  }, []);

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
      setLoading(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar en la galería sin permisos.');
        setLoading(false);
        return;
      }

      const uri = await captureRef(certificateRef.current, {
        format: 'jpg',
        quality: 1,
        result: 'tmpfile',
      });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Certificados', asset, false);

      Alert.alert('Éxito', 'Su certificado de Bautismo se ha guardado en la galería.');
    } catch (error) {
      console.error('Error guardando el certificado:', error);
      Alert.alert('Error', 'No se pudo guardar el certificado.');
    } finally {
      setLoading(false);
    }
  };

  const { width } = Dimensions.get('window');

  const qrData = JSON.stringify({
    nombres: persona?.nombres || '',
    apellidos: persona?.apellidos || '',
    cedula: cedula || '',
    conyuge: persona?.conyuge || '',
    pastor: persona?.pastor || '',
    fechaBautizo: persona?.fechaBautizo || '',
  });

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Certificado de Bautismo</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <View
        ref={certificateRef}
        style={[
          styles.certificate,
          {
            width: width * 1.1,
            height: (width * 1.1) * 1.3, // 🔹 REDUCIMOS un poco la altura
            transform: [{ rotate: '-90deg' }, { scale: 1.1 }],
          }
        ]}
      >
        <Image source={require('../../assets/images/Cbautismo.jpg')} style={styles.image} resizeMode="contain" />
        <Text style={[styles.text, { top: '53%', left: '27%' }]}>{persona?.nombres} {persona?.apellidos}</Text>
        <Text style={[styles.text, { top: '62%', left: '20%' }]}>{persona?.fechaBautizo}</Text>
        <Text style={[styles.signature, { top: '67%', left: '30%' }]}>{persona?.pastor}</Text>
        <Image source={{ uri: qrUrl }} style={[styles.qrCode, { top: '26.5%', left: '75%' }]} />
      </View>


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
    marginTop: 100,
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
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  signature: {
    position: 'absolute',
    fontSize: 8,
    fontStyle: 'italic',
    color: '#000',
  },
  qrCode: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  saveButton: {
    marginTop: 10, // 🔹 Reduce el espacio arriba del botón (antes estaba en 20)
    backgroundColor: '#003580',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },

  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
