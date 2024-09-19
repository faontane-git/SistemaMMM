import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Icono para el botón

export default function AgendaScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never); // Redirige a la pantalla 'Home' si no puede ir hacia atrás
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Agenda</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentSection}>
        {/* Sección de Horario de Cultos */}
        <Text style={styles.sectionTitle}>Local: Horario de Cultos</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Martes: Ayuno, 9:00am-13:00pm; Culto de Oración, 7:00-9:00 pm.</Text>
          <Text style={styles.infoText}>Miércoles: Culto de Enseñanza, 7:00-9:00 pm.</Text>
          <Text style={styles.infoText}>Jueves: Culto de Caballeros, 7:00-9:00 pm.</Text>
          <Text style={styles.infoText}>Viernes: Culto de Damas, 7:00-9:00 pm.</Text>
          <Text style={styles.infoText}>Sábados: Culto de Jóvenes, 5:00-7:00 pm.</Text>
          <Text style={styles.infoText}>Domingos: Escuela Dominical, 9:30-12:00 am.</Text>
          <Text style={styles.infoText}>*Celebración Santa Cena, último domingo de cada mes.</Text>
        </View>

        {/* Sección de Consejería Pastoral */}
        <Text style={styles.sectionTitle}>Consejería Pastoral</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Martes: 10:00-12:00 am</Text>
          <Text style={styles.infoText}>Miércoles: 7:00-8:00 pm</Text>
          <Text style={styles.infoText}>Domingos: 9:00-10:00 am, 12:00-13:00 pm</Text>
        </View>

        {/* Sección de Planificación Nacional */}
        <Text style={styles.sectionTitle}>Nacional: Planificación Anual</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Convención de Jóvenes: Ambato, viernes 22 al domingo 24 de marzo</Text>
          <Text style={styles.infoText}>Reunión de Pastores: Quito, jueves 16 y viernes 17 de mayo</Text>
          <Text style={styles.infoText}>Convención Nacional: Guayaquil, jueves 22 al domingo 25 de agosto en el Estadio Yeya Uraga</Text>
          <Text style={styles.infoText}>Día de las Misiones: Domingo 29 de septiembre</Text>
          <Text style={styles.infoText}>Convención de Damas y Caballeros: Santo Domingo, viernes 15 al domingo 17 de noviembre</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // Fondo más suave
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
    borderBottomLeftRadius: 15, // Bordes redondeados inferiores para el header
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 22, // Tamaño del texto un poco más grande
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e', // Color de título más oscuro
    borderBottomWidth: 1, // Línea sutil debajo del título
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  infoCard: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12, // Bordes más redondeados
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10, // Sombra más pronunciada
    elevation: 4, // Elevación para que la tarjeta parezca levantada
    borderLeftWidth: 5, // Borde colorido en el lado izquierdo de la tarjeta
    borderLeftColor: '#3498db', // Color distintivo para el borde izquierdo
  },
  infoText: {
    fontSize: 17, // Texto más grande
    color: '#2c3e50',
    lineHeight: 26, // Mejora la legibilidad
    marginBottom: 5,
  },
});
