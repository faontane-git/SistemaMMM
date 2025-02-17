import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
    navigation.navigate('Agenda/HorarioCultosScreen' as never);
  };

  const handleHorarioActividades = () => {
    navigation.navigate('Agenda/HorarioActividadesScreen' as never);
  };

  const handleOtros = () => {
    navigation.navigate('Agenda/HorarioOtrosScreen' as never);
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
        <Text style={styles.headerText}>Agenda</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Botones más grandes y con colores de la bandera de Ecuador */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={[styles.buttonCultos, styles.buttonYellow]} onPress={handleHorarioCultos}>
          <Text style={styles.buttonText}>Horario de Cultos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={handleHorarioActividades}>
          <Text style={styles.buttonText}>Horario de Consejería Pastoral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={handleOtros}>
          <Text style={styles.buttonText}>Actividades Nacionales</Text>
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
  buttonSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonCultos: {
    fontSize: 20, // 📌 Botón más grande
    fontWeight: 'bold',
    paddingHorizontal: 20, // 📌 Más ancho
    paddingVertical: 70, // 📌 Más alto
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 15, // 📌 Más espacio entre botones
    width: '85%', // 📌 Botón más ancho
    alignItems: 'center',
  },
  button: {
    fontSize: 20, // 📌 Botón más grande
    fontWeight: 'bold',
    paddingHorizontal: 20, // 📌 Más ancho
    paddingVertical: 50, // 📌 Más alto
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 15, // 📌 Más espacio entre botones
    width: '85%', // 📌 Botón más ancho
    alignItems: 'center',
  },
  buttonYellow: {
    backgroundColor: '#FFC107', // 📌 Amarillo
  },
  buttonBlue: {
    backgroundColor: '#0033A0', // 📌 Azul
  },
  buttonRed: {
    backgroundColor: '#D52B1E', // 📌 Rojo
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // 📌 Texto más grande
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50, // 📌 Logo más grande
    height: 50,
  },
});

