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
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { Platform, ActionSheetIOS } from 'react-native';

interface Persona {
  nombres: string;
  apellidos: string;
  cedula: string;
  foto: string;
  casadoEclesiasticamente: string;
  conyuge: string;
  fechaMatrimonio: string;
  pastor: string;
}

export default function CertificadoMatrimonio() {
  const certificateRef = useRef<View>(null);
  const [isViewReady, setIsViewReady] = useState(false);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { Nombres, Apellidos, NombreCoyuge, EstadoCivil, Pastor, Cedula, FechaMatrimonio } =
    route.params as { Nombres: string, Apellidos: string, EstadoCivil: string, NombreCoyuge: string, Pastor: string, Cedula: string, FechaMatrimonio: string };

  useEffect(() => {
    if (EstadoCivil !== 'CASADO') {
      Alert.alert("Aviso", "Estimado/a, no puede generar este certificado.");
      navigation.goBack(); // Vuelve a la pantalla anterior
    } else {
      setIsViewReady(true);
    }
  }, []);


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

      // 🔹 Mostrar opciones al usuario
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancelar', 'Guardar en Galería', 'Guardar como PDF'],
            cancelButtonIndex: 0,
          },
          async (buttonIndex) => {
            if (buttonIndex === 1) {
              await saveToGallery();
            } else if (buttonIndex === 2) {
              await saveToPDF();
            }
          }
        );
      } else {
        // 🔹 Opciones para Android
        Alert.alert(
          'Guardar Certificado',
          '¿Cómo quieres guardar el certificado?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Guardar en Galería', onPress: saveToGallery },
            { text: 'Guardar como PDF', onPress: saveToPDF },
          ]
        );
      }

    } catch (error) {
      console.error('Error guardando el certificado:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el certificado.');
    } finally {
      setLoading(false);
    }
  };

  // 📌 Función para guardar en la galería (JPG)
  const saveToGallery = async () => {
    try {
      // 📌 Verificar si la referencia existe
      if (!certificateRef.current) {
        Alert.alert('Error', 'No se pudo capturar el certificado.');
        return;
      }

      // 📌 Pedir permisos
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar en la galería sin permisos.');
        return;
      }

      // 📸 Capturar la imagen
      const uri = await captureRef(certificateRef.current, {
        format: 'jpg',
        quality: 1,
      });

      // 📂 Guardar la imagen en la galería
      const asset = await MediaLibrary.createAssetAsync(uri);
      let album = await MediaLibrary.getAlbumAsync('Certificados');

      if (!album) {
        album = await MediaLibrary.createAlbumAsync('Certificados', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert('Éxito', 'El certificado se ha guardado en la galería.');

    } catch (error) {
      console.error('Error guardando en galería:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen en la galería.');
    }
  };

  // 📌 Función para guardar como PDF
  const saveToPDF = async () => {
    try {
      // ✅ Verificar si `certificateRef.current` existe antes de capturar la imagen
      if (!certificateRef.current) {
        Alert.alert('Error', 'No se pudo capturar el certificado.');
        return;
      }

      // 📸 Capturar la imagen del certificado
      const uri = await captureRef(certificateRef.current, {
        format: 'jpg',
        quality: 1,
      });

      // 🖼️ Leer la imagen como Base64
      const imageBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 📝 Crear HTML para el PDF
      const imageSrc = `data:image/jpeg;base64,${imageBase64}`;
      const htmlContent = `
          <html>
              <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                  <div style="transform: rotate(-90deg); display: flex; justify-content: center; align-items: center;">
                      <img src="${imageSrc}" style="width: 120%; max-width: 1000px;" />
                  </div>
              </body>
          </html>
        `;

      // 🔍 Generar y abrir el PDF SIN GUARDARLO
      await Print.printAsync({ html: htmlContent });

    } catch (error) {
      console.error('Error al abrir el PDF:', error);
      Alert.alert('Error', 'No se pudo abrir el certificado como PDF.');
    }
  };

  const { width } = Dimensions.get('window');

  const qrData = JSON.stringify({
    tipoCertificado: "matrimonio",
    nombres: persona?.nombres || '',
    apellidos: persona?.apellidos || '',
    cedula: Cedula,
    conyuge: persona?.conyuge || '',
    fechaMatrimonio: persona?.fechaMatrimonio || '',
    pastor: persona?.pastor || '',
  });


  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrData)}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Certificado de Matrimonio</Text>
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
        <Image source={require('../../assets/images/Cmatrimonio.jpg')} style={styles.image} resizeMode="contain" />
        <Text style={[styles.text, { top: '48%', left: '17%' }]}>{Nombres} {Apellidos}</Text>
        <Text style={[styles.text, { top: '48%', left: '59%' }]}>{NombreCoyuge}</Text>
        <Text style={[styles.text, { top: '59%', left: '70%' }]}>{Pastor}</Text>
        <Text style={[styles.text, { top: '59%', left: '20%' }]}>{FechaMatrimonio}</Text>
        <Text style={[styles.text, { top: '63%', left: '15%' }]}>{Nombres} {Apellidos}</Text>
        <Text style={[styles.text, { top: '63%', left: '66%' }]}>{NombreCoyuge}</Text>
        <Image source={{ uri: qrUrl }} style={[styles.qrCode, { top: '35.5%', left: '80%' }]} />
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
    fontSize: 6,
    fontWeight: 'bold',
    color: '#000',
  },
  qrCode: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  saveButton: {
    marginTop: 20,
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
