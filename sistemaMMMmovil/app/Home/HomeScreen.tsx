import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import Noticias from './Noticias';
import Sermones from './Sermones';

export default function HomeScreen() {
    const [noticias, setNoticias] = useState<any[]>([]);
    const [sermones, setSermones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noticiasSnapshot = await getDocs(collection(firestore, 'Noticias'));
                const noticiasArray = noticiasSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNoticias(noticiasArray);

                const sermonesSnapshot = await getDocs(collection(firestore, 'Audios'));
                const sermonesArray = sermonesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSermones(sermonesArray);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOptionPress = (option: string) => {
        navigation.navigate(option as never);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2980b9" />
                <Text style={styles.loadingText}>Cargando información...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>
                <Text style={styles.headerText}>MI IGLESIA MMM</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => handleOptionPress('IniciarSesion/IniciarSesion')}
                >
                    <FontAwesome name="user-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Contenido principal con ScrollView */}
            <ScrollView style={styles.mainContent}>
                {/* Noticias */}
                {noticias.length > 0 ? (
                    <Noticias noticias={noticias} handleOptionPress={handleOptionPress} />
                ) : (
                    <Text style={styles.noDataText}>No hay noticias disponibles.</Text>
                )}

                {/* Sermones */}
                {sermones.length > 0 ? (
                    <Sermones sermones={sermones} handleMoreSermonsPress={() => { }} />
                ) : (
                    <Text style={styles.noDataText}>No hay sermones disponibles.</Text>
                )}

                {/* Botón de Ver Doctrina */}
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

            {/* Barra de menú inferior */}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#555',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#2c3e50',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    loginButton: {
        marginLeft: 10,
    },
    mainContent: {
        flex: 1,
        padding: 10,
    },
    doctrinaSection: {
        marginVertical: 0,
        alignItems: 'center',
    },
    doctrinaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 15,
        borderRadius: 50,
        width: '80%',
        justifyContent: 'center',
    },
    doctrinaButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#34495e',
    },
    menuItem: {
        alignItems: 'center',
    },
    menuItemText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    noDataText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginVertical: 10,
    },
});
