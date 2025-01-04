import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Clipboard,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Contacto {
  id: string;
  foto: string;
  nombre: string;
  telefono: string;
}

const { width: screenWidth } = Dimensions.get('window');

export default function ContactosScreen() {
  const navigation = useNavigation();
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);
  const [galeria, setGaleria] = useState<number[]>([
    require('../../assets/images/galeria1.jpeg'),
    require('../../assets/images/galeria2.jpeg'),
    require('../../assets/images/galeria3.jpeg'),
    require('../../assets/images/galeria4.jpeg'),
    require('../../assets/images/galeria5.jpeg'),
    require('../../assets/images/galeria6.jpeg'),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const copyToClipboard = () => {
    Clipboard.setString('mmmfranciscoorellana@gmail.com');
    ToastAndroid.show('Correo copiado al portapapeles', ToastAndroid.SHORT);
  };

  const renderItem = (item: number) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.carouselImage} resizeMode="cover" />
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {galeria.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index ? styles.paginationDotActive : {},
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>¿Quiénes somos?</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.contentSection}>
        <View style={styles.introSection}>
          <Text style={styles.title}>
            Iglesia Cristiana Pentecostés Movimiento Misionero Mundial
          </Text>
          <Text style={styles.subtitle}>Francisco de Orellana-Vergeles</Text>
          <Image source={require('../../assets/images/logo-MMM.png')} style={styles.logoCuerpo} />
          <Text style={styles.description}>
            Somos una organización sin fines de lucro, llevamos el mensaje de Dios a las vidas necesitadas,
            y predicamos que la sangre de Cristo puede transformar las vidas y los hogares destruidos.
          </Text>
          <Text style={styles.missionTitle}>Misión:</Text>
          <Text style={styles.description}>
            Llevamos un enfoque en la pesca de almas para nuestro Señor Jesucristo, alcanzar jóvenes y
            familias destruidas por las redes del enemigo, proclamar el evangelio llamando a nuevas
            personas a la fe en Cristo.
          </Text>
          <Text style={styles.visionTitle}>Visión:</Text>
          <Text style={styles.description}>
            Está enfocada en reflejar nuestros valores fundamentales, metas espirituales y facilitar una
            conexión con Dios, ser un lugar donde las personas puedan experimentar un cambio radical
            en sus vidas a través de la fe en Jesucristo.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
        ) : (
          <View>
            <Text style={styles.contactHeader}>Contactos</Text>
            {contactos.map((contacto) => (
              <View key={contacto.id} style={styles.contactCard}>
                <Image source={{ uri: contacto.foto }} style={styles.contactImage} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contacto.nombre}</Text>
                  <Text style={styles.contactPhone}>Teléfono: {contacto.telefono}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.emailBox}>
          <MaterialIcons name="email" size={24} color="#ffffff" style={styles.emailIcon} />
          <Text style={styles.emailText} numberOfLines={1} ellipsizeMode="tail">
            mmmfranciscoorellana@gmail.com
          </Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyIcon}>
            <MaterialIcons name="content-copy" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.gallerySection}>
          <Text style={styles.galleryHeader}>Galería</Text>
          <Carousel
            width={screenWidth * 0.8}
            height={200}
            data={galeria}
            renderItem={({ item }) => renderItem(item)}
            loop
            autoPlay
            autoPlayInterval={3000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            style={{ alignSelf: 'center' }}
          />
          {renderPagination()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  headerText: { color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center', flex: 1 },
  logo: { width: 40, height: 40, borderRadius: 5 },
  logoCuerpo: { width: 150, height: 150, alignSelf: 'center' },
  contentSection: { flexGrow: 1, padding: 15, backgroundColor: '#f9f9f9' },
  introSection: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dcdcdc', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '700', color: '#2c3e50', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#7f8c8d', textAlign: 'center', marginBottom: 15 },
  description: { fontSize: 14, color: '#555', lineHeight: 22, textAlign: 'justify' },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 15,
    marginBottom: 5,
  },
  visionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1abc9c',
    marginTop: 15,
    marginBottom: 5,
  },
  contactHeader: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 10 },
  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15 },
  contactImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 18, fontWeight: 'bold', color: '#34495e' },
  contactPhone: { fontSize: 14, color: '#7f8c8d' },
  emailBox: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#3498db', borderRadius: 10, marginTop: 20 },
  emailIcon: { marginRight: 8 },
  emailText: { flex: 1, fontSize: 16, color: 'white' },
  copyIcon: { padding: 8, backgroundColor: '#1abc9c', borderRadius: 5 },
  loadingIndicator: { marginVertical: 20 },
  gallerySection: { marginTop: 20, paddingBottom: 20 },
  galleryHeader: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 10 },
  carouselItem: { justifyContent: 'center', alignItems: 'center' },
  carouselImage: { width: '100%', height: 200, borderRadius: 8 },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#3498db',
  },
});
