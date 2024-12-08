import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export default function RutasScreen({ navigation }: any) {
    const [rutaData, setRutaData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home' as never);
        }
    };

    useEffect(() => {
        const fetchRutasData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'rutas'));
                const rutasArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Asumimos que la colección tiene un solo documento con la información
                if (rutasArray.length > 0) {
                    setRutaData(rutasArray[0]); // Usar el primer documento
                }
            } catch (error) {
                console.error('Error al obtener los datos de rutas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRutasData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2980b9" />
                <Text style={styles.loadingText}>Cargando información...</Text>
            </View>
        );
    }

    if (!rutaData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    No se encontraron datos para mostrar en rutas.
                </Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.retryButtonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const { buses, direccion, gpsLink, videoLink } = rutaData;

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Ruta local al logo
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>Rutas</Text>
                <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Información de buses */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Buses Disponibles:</Text>
                <Text style={styles.sectionText}>{buses}</Text>
            </View>

            {/* Dirección */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dirección:</Text>
                <Text style={styles.sectionText}>{direccion}</Text>
            </View>

            {/* Enlace GPS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ubicación en el Mapa:</Text>
                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => Linking.openURL(gpsLink)}
                >
                    <FontAwesome name="map-marker" size={20} color="white" />
                    <Text style={styles.linkButtonText}>Abrir en Google Maps</Text>
                </TouchableOpacity>
            </View>

            {/* Video */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Video Informativo:</Text>
                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => Linking.openURL(videoLink)}
                >
                    <FontAwesome name="video-camera" size={20} color="white" />
                    <Text style={styles.linkButtonText}>Ver en Facebook</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    retryButton: {
        marginTop: 20,
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
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
    backIcon: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 50,
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    sectionText: {
        fontSize: 16,
        color: '#555',
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 10,
    },
    linkButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});
