import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Clipboard, ToastAndroid, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Contacto {
  id: string;
  foto: string;
  nombre: string;
  telefono: string;
}

export default function ContactosScreen() {
  const navigation = useNavigation();
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const db = getFirestore();

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const contactosCollection = collection(db, 'Contactos');
        const querySnapshot = await getDocs(contactosCollection);
        const contactosArray: Contacto[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contacto[];
        setContactos(contactosArray);
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    obtenerContactos();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString('mmmfranciscoorellana@gmail.com');
    ToastAndroid.show('Correo copiado al portapapeles', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>¿Quiénes somos?</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
      ) : (
        <ScrollView style={styles.contentSection}>
          {/* Lista de contactos */}
          {contactos.map((contacto) => (
            <View key={contacto.id} style={styles.contactCard}>
              <Image source={{ uri: contacto.foto }} style={styles.contactImage} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contacto.nombre}</Text>
                <Text style={styles.contactPhone}>Teléfono: {contacto.telefono}</Text>
              </View>
            </View>
          ))}

          {/* Cuadro de correo electrónico al final */}
          <View style={styles.emailBox}>
            <MaterialIcons name="email" size={24} color="#ffffff" style={styles.emailIcon} />
            <Text style={styles.emailText} numberOfLines={1} ellipsizeMode="tail">
              mmmfranciscoorellana@gmail.com
            </Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyIcon}>
              <MaterialIcons name="content-copy" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
    backgroundColor: '#2c3e50',
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  contentSection: {
    padding: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#1abc9c',
  },
  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  contactPhone: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  emailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#3498db',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  emailIcon: {
    marginRight: 8,
  },
  emailText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  copyIcon: {
    padding: 5,
    borderRadius: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
