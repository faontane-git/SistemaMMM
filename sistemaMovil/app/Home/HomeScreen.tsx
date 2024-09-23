import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación

export default function HomeScreen() {
    const navigation = useNavigation(); // Usa el hook para obtener el objeto navigation

    const handleOptionPress = (option: string) => {
        navigation.navigate(option as never); // Navegar a la ruta proporcionada
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Ruta local al logo genérico
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>Movimiento MMM</Text>
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

                {/* Botón de Doctrina */}
                <View style={styles.doctrinaSection}>
                    <TouchableOpacity
                        style={styles.doctrinaButton}
                        onPress={() => handleOptionPress('Doctrina/DoctrinaScreen')}
                    >
                        <FontAwesome name="book" size={20} color="white" />
                        <Text style={styles.doctrinaButtonText}>Ver Doctrina</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Barra de menú en la parte inferior */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('QuienesSomos/QuienesSomosScreen')}
                >
                    <FontAwesome name="info-circle" size={24} color="white" />
                    <Text style={styles.menuItemText}>¿Quiénes somos?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('Rutas/RutasScreen')}
                >
                    <FontAwesome name="map-marker" size={24} color="white" />
                    <Text style={styles.menuItemText}>Rutas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('Agenda/AgendaScreen')}
                >
                    <FontAwesome name="calendar" size={24} color="white" />
                    <Text style={styles.menuItemText}>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('RedesSociales/RedesSocialesScreen')}
                >
                    <FontAwesome name="share-alt" size={24} color="white" />
                    <Text style={styles.menuItemText}>Redes Sociales</Text>
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
    doctrinaSection: {
        marginVertical: 20,
        alignItems: 'center',
    },
    doctrinaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 15,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    doctrinaButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
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
        textAlign: 'center',
    },
});
