import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RedesSocialesScreen() {
  const navigation = useNavigation();

  // Funciones para abrir las redes sociales en el navegador predeterminado
  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com'); // Cambia por el enlace correcto
  };

  const openTwitter = () => {
    Linking.openURL('https://www.twitter.com'); // Cambia por el enlace correcto
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com'); // Cambia por el enlace correcto
  };

  // Función para volver a la pantalla anterior
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Síguenos en Redes Sociales</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={openFacebook} style={styles.iconButton}>
          <FontAwesome name="facebook" size={40} color="#3b5998" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openTwitter} style={styles.iconButton}>
          <FontAwesome name="twitter" size={40} color="#00acee" />
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openInstagram} style={styles.iconButton}>
          <FontAwesome name="instagram" size={40} color="#C13584" />
          <Text style={styles.socialText}>Instagram</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <FontAwesome name="arrow-left" size={20} color="white" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f3f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  iconButton: {
    alignItems: 'center',
  },
  socialText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
