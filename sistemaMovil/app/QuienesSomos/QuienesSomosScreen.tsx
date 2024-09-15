import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Icono para el botón

export default function QuienesSomosScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Función para llamar a un contacto
  const callContact = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // Función para enviar correo a un contacto
  const emailContact = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¿Quiénes somos?</Text>
      </View>
      <Text style={styles.paragraph}>
        Bienvenidos a la iglesia MMV, una comunidad que busca crecer en la fe y en el servicio
        a Dios. Nuestra iglesia ha sido un refugio espiritual para cientos de familias desde
        su fundación. A través de la oración, el servicio y el compañerismo, buscamos ayudar a
        las personas a encontrar su propósito en Cristo.
      </Text>
      <Text style={styles.paragraph}>
        Nos dedicamos a difundir el evangelio de Jesús y ofrecer un espacio donde todos sean
        bienvenidos, independientemente de su trasfondo o situación actual. Creemos en la
        importancia de la familia, la comunidad y el crecimiento espiritual constante.
      </Text>
      <Text style={styles.paragraph}>
        Te invitamos a ser parte de nuestras actividades, donde podrás crecer en la fe y en
        el conocimiento de la Palabra de Dios. Únete a nosotros y sé parte de esta gran familia.
      </Text>

      {/* Sección de Contactos */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Nuestros Contactos</Text>

        {/* Tarjeta de contacto 1 */}
        <View style={styles.contactCard}>
          <Text style={styles.contactName}>Juan Pérez</Text>
          <Text style={styles.contactRole}>Pastor Principal</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity onPress={() => callContact('+123456789')} style={styles.contactButton}>
              <FontAwesome name="phone" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => emailContact('juanperez@iglesiammv.com')} style={styles.contactButton}>
              <FontAwesome name="envelope" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tarjeta de contacto 2 */}
        <View style={styles.contactCard}>
          <Text style={styles.contactName}>María González</Text>
          <Text style={styles.contactRole}>Coordinadora de Jóvenes</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity onPress={() => callContact('+987654321')} style={styles.contactButton}>
              <FontAwesome name="phone" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => emailContact('mariagonzalez@iglesiammv.com')} style={styles.contactButton}>
              <FontAwesome name="envelope" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Más tarjetas de contacto pueden añadirse aquí */}
      </View>

      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <FontAwesome name="arrow-left" size={20} color="white" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f3f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'justify',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contactSection: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  contactRole: {
    fontSize: 16,
    marginBottom: 15,
    color: '#7f8c8d',
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 30,
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
