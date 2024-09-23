import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function QuienesSomosScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never); // Redirige a la pantalla 'Home' si no puede ir hacia atrás
    }
  };

  // Funciones para llamar y enviar correos electrónicos
  const callContact = (phone: any) => {
    Linking.openURL(`tel:${phone}`);
  };

  const emailContact = (email: any) => {
    Linking.openURL(`mailto:${email}`);
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
        <Text style={styles.headerText}>¿Quiénes somos?
        </Text>
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

        {/* Sección de Contactos */}
        <Text style={styles.sectionTitle}>Contactos</Text>

        {/* Contacto Pastor Víctor Escobar */}
        <View style={styles.contactCard}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/victorEscobar.jpeg')} // Ruta a la imagen local
              style={styles.contactImage} // Agrega un estilo para la imagen
            />
          </View>
          <Text style={styles.contactName}>Pastor, Víctor Escobar</Text>
          <TouchableOpacity onPress={() => callContact('0986463987')} style={styles.contactButton}>
            <FontAwesome name="phone" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Llamar</Text>
          </TouchableOpacity>
        </View>


        {/* Contacto Pastora Rosa Landázuri */}
        <View style={styles.contactCard}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/rosaLandazuri.jpeg')} // Ruta a la imagen local de Rosa Landázuri
              style={styles.contactImage} // Estilo para la imagen
            />
          </View>
          <Text style={styles.contactName}>Pastora, Rosa Landázuri</Text>
          <TouchableOpacity onPress={() => callContact('0998231349')} style={styles.contactButton}>
            <FontAwesome name="phone" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>Llamar</Text>
          </TouchableOpacity>
        </View>


        {/* Contacto Co-Pastor David García */}
        <View style={styles.contactCard}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/davidGarcia.jpeg')} // Ruta a la imagen local de David García
              style={styles.contactImage} // Estilo para la imagen
            />
          </View>
          <Text style={styles.contactName}>Co-Pastor, David García</Text>
          <TouchableOpacity onPress={() => callContact('0991831447')} style={styles.contactButton}>
            <FontAwesome name="phone" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Llamar</Text>
          </TouchableOpacity>
        </View>


        {/* Contacto Correo */}
        <View style={styles.contactCard}>
          <Text style={styles.contactName}>Correo</Text>
          <TouchableOpacity onPress={() => emailContact('mmmfranciscoorellana@gmail.com')} style={styles.contactButton}>
            <FontAwesome name="envelope" size={20} color="#fff" />
            <Text style={[styles.contactButtonText, styles.smallEmailText]}>
              mmmfranciscoorellana@gmail.com
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

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
    borderRadius: 20,  // Borde más redondeado
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Mayor elevación para dar sensación de "flotante"
    alignItems: 'center', // Centrar contenido en la tarjeta
  },
  imageContainer: {
    borderWidth: 3,   // Añadir borde a la imagen
    borderColor: '#2980b9', // Color del borde de la imagen
    borderRadius: 50,
    padding: 5,
    marginBottom: 15, // Añadir separación entre la imagen y el texto
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,  // Imagen redonda
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',  // Centrar el texto
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrar el contenido del botón
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '80%', // Hacer el botón más ancho
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallEmailText: {
    fontSize: 10,  // Tamaño más pequeño para el texto del correo
  },
});

