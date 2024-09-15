import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Ruta local al logo genérico
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Bienvenidos al sistema MMV</Text>
        <TouchableOpacity style={styles.loginIcon}>
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Noticias y eventos */}
      <ScrollView style={styles.newsSection}>
        <Text style={styles.newsTitle}>Noticias y Eventos</Text>
        <View style={styles.newsItem}>
          <Text style={styles.newsItemTitle}>Evento de jóvenes</Text>
          <Text style={styles.newsItemDescription}>
            Ven y únete a nuestro próximo evento para jóvenes este fin de semana.
          </Text>
        </View>
        <View style={styles.newsItem}>
          <Text style={styles.newsItemTitle}>Estudio bíblico</Text>
          <Text style={styles.newsItemDescription}>
            Todos los miércoles a las 7 PM, estudio bíblico con el pastor.
          </Text>
        </View>
      </ScrollView>

      {/* Sección de sermones */}
      <View style={styles.sermons}>
        <Text style={styles.sermonsTitle}>Últimos Sermones</Text>
        <View style={styles.sermonItem}>
          <Text style={styles.sermonTitle}>Título del Sermón 1</Text>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome name="play" size={20} color="white" />
            <Text style={styles.playButtonText}>Reproducir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sermonItem}>
          <Text style={styles.sermonTitle}>Título del Sermón 2</Text>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome name="play" size={20} color="white" />
            <Text style={styles.playButtonText}>Reproducir</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de menú en la parte inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="home" size={24} color="white" />
          <Text style={styles.menuItemText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="calendar" size={24} color="white" />
          <Text style={styles.menuItemText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="book" size={24} color="white" />
          <Text style={styles.menuItemText}>Sermones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="cog" size={24} color="white" />
          <Text style={styles.menuItemText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20, // Añadir más espacio debajo del header
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40, // Ajusta el tamaño del logo según tu preferencia
  },
  headerText: {
    color: 'white',
    fontSize: 16, // Reducido el tamaño del texto
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center', // Alineación centrada para el título
  },
  loginIcon: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 50,
  },
  newsSection: {
    padding: 20,
  },
  newsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsItemDescription: {
    fontSize: 16,
    color: '#555',
  },
  sermons: {
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  sermonsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sermonItem: {
    marginBottom: 20,
  },
  sermonTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
