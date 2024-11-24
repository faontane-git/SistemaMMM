import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ActividadesScreen() {
  const navigation = useNavigation();

  // Datos estáticos para actividades
  const actividades = [
    {
      id: '1',
      descripcion: 'Ayuno',
      tipo: 'Culto',
      horaInicio: '09:00 AM',
      horaFin: '01:00 PM',
      dias: ['Martes'],
    },
    {
      id: '2',
      descripcion: 'Culto de Oración',
      tipo: 'Oración',
      horaInicio: '07:00 PM',
      horaFin: '09:00 PM',
      dias: ['Martes'],
    },
    {
      id: '3',
      descripcion: 'Culto de Enseñanza',
      tipo: 'Enseñanza',
      horaInicio: '07:00 PM',
      horaFin: '09:00 PM',
      dias: ['Miércoles'],
    },
    {
      id: '4',
      descripcion: 'Culto de Caballeros',
      tipo: 'Culto',
      horaInicio: '07:00 PM',
      horaFin: '09:00 PM',
      dias: ['Jueves'],
    },
    {
      id: '5',
      descripcion: 'Culto de Jóvenes',
      tipo: 'Jóvenes',
      horaInicio: '05:00 PM',
      horaFin: '07:00 PM',
      dias: ['Sábado'],
    },
    {
      id: '6',
      descripcion: 'Escuela Dominical',
      tipo: 'Escuela',
      horaInicio: '09:30 AM',
      horaFin: '12:00 PM',
      dias: ['Domingo'],
    },
  ];

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
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
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentSection}>
        {actividades.map((actividad) => (
          <View key={actividad.id} style={styles.activityCard}>
            <Text style={styles.activityTitle}>{actividad.descripcion}</Text>
            <Text style={styles.activityText}>Tipo: {actividad.tipo}</Text>
            <Text style={styles.activityText}>
              Hora: {actividad.horaInicio} - {actividad.horaFin}
            </Text>
            <Text style={styles.activityText}>
              Días: {actividad.dias ? actividad.dias.join(', ') : 'No especificado'}
            </Text>
          </View>
        ))}
      </ScrollView>
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
    paddingTop: 30,
    backgroundColor: '#2c3e50',
    marginBottom: 20,
},
  headerText: {
    color: 'white',
    fontSize: 24,
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
  activityCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#1abc9c',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  }, logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }, logo: {
    width: 40,
    height: 40,
  }
});
