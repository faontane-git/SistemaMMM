import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Icono para el botón

export default function RedesSocialesScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never); // Redirige a la pantalla 'Home' si no puede ir hacia atrás
    }
  };

  // Funciones para abrir enlaces
  const openLink = (url: any) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')} // Ruta local al logo genérico
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Redes Sociales</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido de redes sociales */}
      <ScrollView style={styles.contentSection}>
        {/* Páginas de Facebook */}
        <Text style={styles.sectionTitle}>Páginas de Facebook</Text>

        <View style={styles.socialCard}>
          <Text style={styles.socialName}>MMM Francisco de Orellana</Text>
          <TouchableOpacity
            onPress={() => openLink('https://www.facebook.com/mmmfranciscodeorellana/')}
            style={[styles.socialButton, styles.facebookButton]}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Visitar Página</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialCard}>
          <Text style={styles.socialName}>Juventud Victoriosa</Text>
          <TouchableOpacity
            onPress={() => openLink('https://www.facebook.com/JuventudVictoriosaS8')}
            style={[styles.socialButton, styles.facebookButton]}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Visitar Página</Text>
          </TouchableOpacity>
        </View>

        {/* Instagram */}
        <Text style={styles.sectionTitle}>Instagram</Text>
        <View style={styles.socialCard}>
          <Text style={styles.socialName}>@juventudvictoriosas8</Text>
          <TouchableOpacity
            onPress={() => openLink('https://www.instagram.com/juventudvictoriosas8/')}
            style={[styles.socialButton, styles.instagramButton]}>
            <FontAwesome name="instagram" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Visitar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Transmisión en vivo */}
        <Text style={styles.sectionTitle}>Transmisión en vivo</Text>
        <View style={styles.infoCard}>
          <Text style={styles.liveBroadcastText}>
            Días Domingos 10 AM (En la página de Facebook oficial de la iglesia)
          </Text>
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
    paddingTop: 30, // Espacio adicional en la parte superior
    backgroundColor: '#2c3e50',
    marginBottom: 20,
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
  socialCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  socialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  facebookButton: {
    backgroundColor: '#3b5998', // Color de Facebook
  },
  instagramButton: {
    backgroundColor: '#E1306C', // Color de Instagram
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
  liveBroadcastText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 26,
  },
   logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  }
});