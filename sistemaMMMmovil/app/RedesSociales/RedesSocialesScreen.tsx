import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Asegúrate de importar correctamente tu configuración de Firebase

export default function RedesSocialesScreen() {
  const [redes, setRedes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerRedes = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'RedesSociales')); // Cambia 'RedesSociales' por tu colección en Firestore
        const redesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRedes(redesArray);
      } catch (error) {
        console.error('Error al obtener redes sociales:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerRedes();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        <Text style={styles.headerText}>Redes Sociales</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico de redes sociales */}
      <ScrollView style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Redes Sociales</Text>
        {redes.map((red) => (
          <View key={red.id} style={styles.socialCard}>
            <Text style={styles.socialName}>{red.nombre}</Text>
            <Text style={styles.userName}>{red.usuario}</Text>
            <TouchableOpacity
              onPress={() => openLink(red.url)}
              style={[styles.socialButton, red.tipo === 'Facebook' ? styles.facebookButton : styles.instagramButton]}
            >
              <FontAwesome
                name={red.tipo === 'Facebook' ? 'facebook' : 'instagram'}
                size={20}
                color="#fff"
              />
              <Text style={styles.socialButtonText}>Visitar {red.tipo}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: '#555',
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
    backgroundColor: '#3b5998',
  },
  instagramButton: {
    backgroundColor: '#E1306C',
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
