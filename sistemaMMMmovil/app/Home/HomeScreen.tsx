import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

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
                <Text style={styles.headerText}>IGLESIA MMM</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => handleOptionPress('IniciarSesion/IniciarSesion')}
                >
                    <FontAwesome name="user-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Noticias y eventos */}
            <ScrollView style={styles.newsSection}>
                <Text style={styles.newsTitle}>Noticias y Eventos</Text>
                {noticias.map((noticia) => (
                    <View key={noticia.id} style={styles.newsItem}>
                        <Text style={styles.newsItemTitle}>{noticia.titulo}</Text>
                        <Text style={styles.newsItemDescription}>{noticia.descripcion}</Text>
                        {noticia.fotoBase64 && (
                            <Image
                                source={{ uri: `${noticia.fotoBase64}` }}
                                style={styles.newsImage}
                            />
                        )}
                    </View>
                ))}

                {/* Sermones */}
                <View style={styles.sermons}>
                    <Text style={styles.sermonsTitle}>Últimos Sermones</Text>
                    {sermones.map((sermon) => (
                        <View key={sermon.id} style={styles.sermonItem}>
                            <Text style={styles.sermonTitle}>{sermon.name}</Text>
                            <Text style={styles.sermonDescription}>
                                Descripción: {sermon.description}
                            </Text>
                            <Text style={styles.sermonDate}>
                                Fecha de subida: {new Date(sermon.uploadedAt).toLocaleDateString()}
                            </Text>
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => Linking.openURL(sermon.url)}
                            >
                                <FontAwesome name="external-link" size={20} color="white" />
                                <Text style={styles.playButtonText}>Escuchar en Google Drive</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

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
    newsImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
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
    sermonDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    sermonDate: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
});
