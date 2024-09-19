import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Icono para el botón

export default function DoctrinaScreen() {
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
        <Text style={styles.headerText}>Doctrina</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido de la doctrina */}
      <ScrollView style={styles.contentSection}>
        <Text style={styles.paragraph}>
          Nuestras bases bíblicas se asocian firmemente a las doctrinas fundamentales, reveladas en la Santa Biblia. Cabe mencionar que el Señor Jesucristo establece que las vidas recientemente convertidas sean adoctrinadas y enseñadas.
        </Text>
        <Text style={styles.paragraph}>
          Luego de haber tomado la mejor decisión de su vida; el reconocer a Jesucristo como su Señor y Salvador por medio de la fe y por consiguiente haber nacido de nuevo, el creyente debe recibir “Instrucciones Bíblicas” con la intención de aprender acerca de su nueva vida en Cristo, así como también las doctrinas, normas y reglas bíblicas que serán el sello en su profesión cristiana. El Movimiento Misionero Mundial se adhiere a las doctrinas fundamentales de las Sagrada Escritura.
        </Text>
        <Text style={styles.paragraph}>
          El libro de instrucciones bíblicas puede adquirirlo en su iglesia más cercana del Movimiento Misionero Mundial, el cual contiene 27 clases:
        </Text>

        {/* Lista de doctrinas */}
        <Text style={styles.listTitle}>Clases Doctrinales</Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>1. Objetivos de la Iglesia Cristiana</Text>
          <Text style={styles.listItem}>2. La Iglesia de Cristo</Text>
          <Text style={styles.listItem}>3. La Biblia</Text>
          <Text style={styles.listItem}>4. El único Dios</Text>
          <Text style={styles.listItem}>5. La Salvación</Text>
          <Text style={styles.listItem}>6. La Santidad</Text>
          <Text style={styles.listItem}>7. La Oración</Text>
          <Text style={styles.listItem}>8. El Ayuno Bíblico</Text>
          <Text style={styles.listItem}>9. La Tentación</Text>
          <Text style={styles.listItem}>10. El Bautismo en el Espíritu Santo</Text>
          <Text style={styles.listItem}>11. La salvación del alma, el bautismo en el Espíritu Santo y Levantamiento de la Iglesia</Text>
          <Text style={styles.listItem}>12. Los Dones del Espíritu Santo</Text>
          <Text style={styles.listItem}>13. La Sanidad Divina</Text>
          <Text style={styles.listItem}>14. La Segunda Venida</Text>
          <Text style={styles.listItem}>15. El Milenio</Text>
          <Text style={styles.listItem}>16. La Condenación Eterna</Text>
          <Text style={styles.listItem}>17. Sacramentos y Ceremonias</Text>
          <Text style={styles.listItem}>18. El Bautismo en Agua</Text>
          <Text style={styles.listItem}>19. Los Miembros</Text>
          <Text style={styles.listItem}>20. La Iglesia Local</Text>
          <Text style={styles.listItem}>21. Colaboradores</Text>
          <Text style={styles.listItem}>22. La Disciplina</Text>
          <Text style={styles.listItem}>23. Actividades Locales</Text>
          <Text style={styles.listItem}>24. La Reverencia en la casa de Dios</Text>
          <Text style={styles.listItem}>25. El Hogar</Text>
          <Text style={styles.listItem}>26. El Culto Familiar</Text>
          <Text style={styles.listItem}>27. El Servicio Militar</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5',
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
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'justify',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  listContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#34495e',
  },
});
