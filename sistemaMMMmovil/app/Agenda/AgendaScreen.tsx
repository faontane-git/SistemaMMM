import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ActividadesScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  const handleHorarioCultos = () => {
    navigation.navigate('Agenda/HorarioCultosScreen' as never); // Redirige a la pantalla "Horario Cultos"
  };

  const handleHorarioActividades = () => {
    navigation.navigate('Agenda/HorarioActividadesScreen' as never); // Redirige a la pantalla "Horario Actividades"
  };

  const handleOtros = () => {
    navigation.navigate('Agenda/HorarioOtrosScreen' as never); // Redirige a la pantalla "Otros"
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
        <Text style={styles.headerText}>Agenda</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={handleHorarioCultos}>
          <Text style={styles.buttonText}>Horario de Cultos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHorarioActividades}>
          <Text style={styles.buttonText}>Horario de Consejería Pastoral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOtros}>
          <Text style={styles.buttonText}>Otros</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10, // Espaciado entre botones
    width: '80%', // Ancho del botón relativo al contenedor
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
});
