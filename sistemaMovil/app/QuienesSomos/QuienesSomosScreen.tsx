import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Asegúrate de importar correctamente tu configuración de Firebase

export default function QuienesSomosScreen() {
  const [contactos, setContactos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Contactos')); // Cambia 'Contactos' por tu colección en Firestore
        const contactosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContactos(contactosArray);
      } catch (error) {
        console.error('Error al obtener contactos:', error);
      } finally {
        setLoading(false);
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

  const callContact = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        <Text style={styles.headerText}>¿Quiénes somos?</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.contentSection}>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { textAlign: 'justify' }]}>
            Somos una organización sin fines de lucro llevamos el mensaje de Dios a las vidas necesitadas, y predicamos que la sangre de Cristo puede transformar las vidas y los hogares destruidos.
          </Text>
        </View>

        {/* Sección de Misión */}
        <Text style={styles.sectionTitle}>Misión</Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { textAlign: 'justify' }]}>
            Llevamos un enfoque en la pesca de almas para nuestro Señor Jesucristo, alcanzando jóvenes y familias destruidas por las redes del enemigo, proclamando el evangelio y llamando a nuevas personas a la fe en Cristo.
          </Text>
        </View>

        {/* Sección de Visión */}
        <Text style={styles.sectionTitle}>Visión</Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { textAlign: 'justify' }]}>
            Está enfocada en reflejar nuestros valores fundamentales, metas espirituales y facilitar una conexión con Dios. Queremos ser un lugar donde las personas puedan experimentar un cambio radical en sus vidas a través de la fe en Jesucristo.
          </Text>
        </View>

        {/* Sección de Contactos (cargada dinámicamente desde Firestore) */}
        <Text style={styles.sectionTitle}>Contactos</Text>
        {contactos.map((contacto) => (
          <View key={contacto.id} style={styles.contactCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: contacto.foto }} // Usamos la URL de la imagen desde Firestore
                style={styles.contactImage}
              />
            </View>
            <Text style={styles.contactName}>{contacto.nombre}</Text>
            <TouchableOpacity onPress={() => callContact(contacto.telefono)} style={styles.contactButton}>
              <FontAwesome name="phone" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Llamar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 30,
    backgroundColor: '#2c3e50',
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backIcon: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 50,
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  infoCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: '#2980b9',
    borderRadius: 50,
    padding: 5,
    marginBottom: 15,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '80%',
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
