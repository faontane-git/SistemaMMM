import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

type CarouselItem = {
  title: string;
  content: string;
};

const CULTOS_DATA: CarouselItem[] = [
  { title: "Martes", content: "Ayuno, 9:00am-13:00pm\nCulto de Oración, 7:00-9:00 pm" },
  { title: "Miércoles", content: "Culto de Enseñanza, 7:00-9:00 pm" },
  { title: "Jueves", content: "Culto de Caballeros, 7:00-9:00 pm" },
  { title: "Viernes", content: "Culto de Damas, 7:00-9:00 pm" },
  { title: "Sábados", content: "Culto de Jóvenes, 5:00-7:00 pm" },
  { title: "Domingos", content: "Escuela Dominical, 9:30-12:00 am\n*Celebración Santa Cena, último domingo de cada mes" },
];

const CONSEJERIA_DATA: CarouselItem[] = [
  { title: "Martes", content: "10:00-12:00 am" },
  { title: "Miércoles", content: "7:00-8:00 pm" },
  { title: "Domingos", content: "9:00-10:00 am, 12:00-13:00 pm" },
];

const PLANNING_DATA: CarouselItem[] = [
  { title: "Convención de Jóvenes", content: "Ambato, viernes 22 al domingo 24 de marzo" },
  { title: "Reunión de Pastores", content: "Quito, jueves 16 y viernes 17 de mayo" },
  { title: "Convención Nacional", content: "Guayaquil, jueves 22 al domingo 25 de agosto Estadio Yeya Uraga" },
  { title: "Día de las Misiones", content: "Domingo 29 de septiembre" },
  { title: "Convención de Damas y Caballeros", content: "Santo Domingo, viernes 15 al domingo 17 de noviembre" },
];

export default function AgendaScreen() {
  const navigation = useNavigation();
  const [cultosIndex, setCultosIndex] = useState(0);
  const [consejeriaIndex, setConsejeriaIndex] = useState(0);
  const [planningIndex, setPlanningIndex] = useState(0);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.infoText}>{item.content}</Text>
    </View>
  );

  const renderPagination = (dataLength: number, currentIndex: number) => (
    <View style={styles.pagination}>
      {Array.from({ length: dataLength }).map((_, index) => (
        <View
          key={index}
          style={[styles.paginationDot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Agenda</Text>
        <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Cultos Carousel */}
      <View style={styles.sectionContainer}>
        <Text style={styles.carouselTitle}>Local: Horario de Cultos</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={350}
            height={200}
            data={CULTOS_DATA}
            renderItem={renderItem}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCultosIndex(index)}
          />
        </View>
        {renderPagination(CULTOS_DATA.length, cultosIndex)}
      </View>

      {/* Consejería Carousel */}
      <View style={styles.sectionContainer}>
        <Text style={styles.carouselTitle}>Consejería Pastoral</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={350}
            height={200}
            data={CONSEJERIA_DATA}
            renderItem={renderItem}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setConsejeriaIndex(index)}
          />
        </View>
      </View>

      {/* Planificación Carousel */}
      <View style={styles.sectionContainer}>
        <Text style={styles.carouselTitle}>Nacional: Planificación Anual</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={350}
            height={200}
            data={PLANNING_DATA}
            renderItem={renderItem}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setPlanningIndex(index)}
          />
        </View>
        {renderPagination(PLANNING_DATA.length, planningIndex)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  infoCard: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecf0f1',
    width: '90%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#34495e',
  },
  infoText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: '#1abc9c',
  },
  inactiveDot: {
    backgroundColor: '#bdc3c7',
  }, sectionContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
