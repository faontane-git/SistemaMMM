import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';

export default function ActividadesScreen() {
  const navigation = useNavigation();
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const db = getFirestore(); // Firestore ya está configurado en firebaseConfig
        const querySnapshot = await getDocs(collection(db, 'Horarios')); // Usamos la colección 'Horarios'

        const actividadesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setActividades(actividadesArray);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerActividades();
  }, []); // Se ejecuta una sola vez al montar el componente

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Indicador de carga visual */}
        <ActivityIndicator size="large" color="#0000ff" />
        {/* Texto de cargando */}
        <Text style={styles.loadingText}>Cargando actividades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Actividades</Text>
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
  loadingContainer: {
    flex: 1, // Ocupar toda la pantalla
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    backgroundColor: '#f5f5f5', // Color de fondo
  },
  loadingText: {
    marginTop: 20, // Espaciado entre el indicador y el texto
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Color del texto
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 30,
    backgroundColor: '#1abc9c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});
