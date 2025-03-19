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
import { SafeAreaView } from 'react-native';

// Definir la interfaz Persona
interface Persona {
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  FechaNacimiento: string;
  Activo: string;
  BautizadoAgua: string;
  BautizadoEspirutoSanto: string;
  CargoIglesia: string;
  CasadoEclesiaticamnete: string;
  CiudadResidencia: string;
  ContactoEmergencia: string;
  ContactoPersonal: string;
  Correo: string;
  DireccionDomicilio: string;
  EstadoCivil: string;
  FechaBaustismo: string;
  FechaMatrimonio: string;
  Funcion: string;
  IglesiaActual: string;
  IglesiaBautismo: string;
  IglesiaMatrimonio: string;
  Ministro: string;
  NombreCoyuge: string;
  Password: string;
  Pastor: string;
  País: string;
  Photo: string;
  Sexo: string;
}


const { width: screenWidth } = Dimensions.get('window');

export default function ContactosScreen() {
  const navigation = useNavigation();
  const [contactos, setContactos] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [galeria, setGaleria] = useState<string[]>([]);
  const [iglesias, setIglesias] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const db = getFirestore();

  useEffect(() => {
    const fetchIglesias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'iglesia'));
        if (!querySnapshot.empty) {
          const iglesiaData = querySnapshot.docs[0].data();

          setIglesias([iglesiaData]);

          if (iglesiaData.galeria && Array.isArray(iglesiaData.galeria)) {
            setGaleria(iglesiaData.galeria);
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos de la iglesia:', error);
      }
    };

    fetchIglesias();
  }, []);


  useEffect(() => {
    const obtenerContactos = async (db: any, setContactos: (data: Persona[]) => void, setLoading: (loading: boolean) => void) => {
      try {
        const contactosCollection = collection(db, 'Personas');
        const querySnapshot = await getDocs(contactosCollection);

        const contactosArray: Persona[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            Nombres: data.Nombres || '',
            Apellidos: data.Apellidos || '',
            Cedula: data.Cedula || '',
            FechaNacimiento: data.FechaNacimiento || '',
            Activo: data.Activo || '',
            BautizadoAgua: data.BautizadoAgua || '',
            BautizadoEspirutoSanto: data.BautizadoEspirutoSanto || '',
            CargoIglesia: data.CargoIglesia || '',
            CasadoEclesiaticamnete: data.CasadoEclesiaticamnete || '',
            CiudadResidencia: data.CiudadResidencia || '',
            ContactoEmergencia: data.ContactoEmergencia || '',
            ContactoPersonal: data.ContactoPersonal || '',
            Correo: data.Correo || '',
            DireccionDomicilio: data.DireccionDomicilio || '',
            EstadoCivil: data.EstadoCivil || '',
            FechaBaustismo: data.FechaBaustismo || '',
            FechaMatrimonio: data.FechaMatrimonio || '',
            Funcion: data.Funcion || '',
            IglesiaActual: data.IglesiaActual || '',
            IglesiaBautismo: data.IglesiaBautismo || '',
            IglesiaMatrimonio: data.IglesiaMatrimonio || '',
            Ministro: data.Ministro || '',
            NombreCoyuge: data.NombreCoyuge || '',
            Password: data.Password || '',
            Pastor: data.Pastor || '',
            País: data.País || '',
            Photo: data.Photo || '',
            Sexo: data.Sexo || '',
          };
        });

        setContactos(contactosArray); // 🔹 Se almacenan los datos en el estado
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
        ToastAndroid.show('Error al cargar contactos', ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    };


    obtenerContactos(db, setContactos, setLoading); // 🔥 Ahora se llama correctamente
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

  const renderItem = (item: string) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.startsWith("data:image") ? item : `data:image/jpeg;base64,${item}` }}
        style={styles.carouselImage}
        resizeMode="cover" />
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

  const ContactCard = ({ contacto }: { contacto: Persona }) => {
    const primerNombre = contacto.Nombres ? contacto.Nombres.split(" ")[0] : contacto.Nombres;
    const primerApellido = contacto.Apellidos ? contacto.Apellidos.split(" ")[0] : contacto.Apellidos;

    return (
      <View style={styles.contactCard}>
        <Image source={{ uri: contacto.Photo }} style={styles.contactImage} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>
            {contacto.CargoIglesia} {primerNombre} {primerApellido}
          </Text>
          <Text style={styles.contactPhone}>Teléfono: {contacto.ContactoPersonal}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              {iglesias[0]?.nombreIglesia}
            </Text>
            <Image source={require('../../assets/images/logo-MMM.png')} style={styles.logoCuerpo} />
            <Text style={styles.description}>
              {iglesias[0]?.descripcion}
            </Text>
            <Text style={styles.missionTitle}>Misión:</Text>
            <Text style={styles.description}>
              {iglesias[0]?.mision}
            </Text>
            <Text style={styles.visionTitle}>Visión:</Text>
            <Text style={styles.description}>
              {iglesias[0]?.vision}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
          ) : (
            <View>
              <Text style={styles.contactHeader}>Contactos</Text>
              {contactos
                .filter((contacto) =>
                  ["PASTOR", "PASTORA", "CO-PASTOR"].includes(contacto.CargoIglesia)
                ) // 🔥 Filtra solo los cargos especificados
                .sort((a, b) => {
                  const order = { PASTOR: 1, PASTORA: 2, "CO-PASTOR": 3 }; // 📌 Orden deseado
                  return (
                    (order[a.CargoIglesia as keyof typeof order] || 99) -
                    (order[b.CargoIglesia as keyof typeof order] || 99)
                  );
                }) // 🔥 Ordena los cargos según la prioridad definida
                .map((contacto) => (
                  <ContactCard key={contacto.Cedula} contacto={contacto} />
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
    </SafeAreaView>
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
  contactName: { fontSize: 14, fontWeight: 'bold', color: '#34495e' },
  contactPhone: { fontSize: 14, color: '#7f8c8d' },
  emailBox: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#3498db', borderRadius: 10, marginTop: 20 },
  emailIcon: { marginRight: 8 },
  emailText: { flex: 1, fontSize: 14, color: 'white' },
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
