import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

interface Persona {
    nombres: string;
    apellidos: string;
    cedula: string;
    foto: string; // Base64 de la imagen
}

export default function CarnetScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { cedula } = route.params as { cedula: string };
    const [persona, setPersona] = useState<Persona | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersona = async () => {
            try {
                const q = query(
                    collection(firestore, 'Personas'),
                    where('cedula', '==', cedula)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data() as Persona;
                    setPersona(data);
                } else {
                    console.error('No se encontraron datos para la cédula:', cedula);
                }
            } catch (error) {
                console.error('Error al buscar los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPersona();
    }, [cedula]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }

    if (!persona) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontraron datos para la cédula {cedula}</Text>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        JSON.stringify({
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            cedula: persona.cedula,
        })
    )}`;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <FontAwesome name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.carnet}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Reemplaza con la ruta al logo
                        style={styles.logo}
                    />
                    <Text style={styles.title}>IGLESIA MMM FCO. DE ORELLANA</Text>
                </View>

                {/* Foto */}
                <View style={styles.profileSection}>
                    {persona.foto ? (
                        <Image source={{ uri: persona.foto }} style={styles.profileImage} />
                    ) : (
                        <FontAwesome name="user-circle" size={100} color="#ccc" />
                    )}
                </View>

                {/* Información */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoValue}>{persona.nombres}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Apellidos:</Text>
                    <Text style={styles.infoValue}>{persona.apellidos}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Cédula:</Text>
                    <Text style={styles.infoValue}>{persona.cedula}</Text>
                </View>

                {/* Código QR */}
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Código QR:</Text>
                    <Image source={{ uri: qrUrl }} style={styles.qrImage} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003580', // Fondo azul
        padding: 20,
    },
    backButton: {
        backgroundColor: '#0056b3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    carnet: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003580',
        textAlign: 'center',
        marginTop: 5,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
    },
    qrContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    qrImage: {
        width: 200,
        height: 200,
    },
    errorText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
});
