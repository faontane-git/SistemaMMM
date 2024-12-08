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
            {/* Imagen de la credencial */}
            <View style={styles.cardContainer}>
                <Image
                    source={require('../../assets/images/credencial.jpg')}
                    style={styles.cardImage}
                />

                {/* Contenido superpuesto */}
                <View style={styles.overlay}>
                    {/* Título */}
                    <Text style={styles.title}>IGLESIA MMM</Text>
                    <Text style={styles.subtitle}>FCO. DE ORELLANA</Text>

                    {/* Foto de perfil */}
                    <View style={styles.profileSection}>
                        {persona.foto ? (
                            <Image source={{ uri: persona.foto }} style={styles.profileImage} />
                        ) : (
                            <FontAwesome name="user-circle" size={100} color="#ccc" />
                        )}
                    </View>

                    {/* Información personal */}
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoValue}>{persona.nombres}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoValue}>{persona.apellidos}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoValue}>{persona.cedula}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoValue}>MIEMBRO ACTIVO</Text>
                    </View>

                    {/* Código QR */}
                    <View style={styles.qrContainer}>
                        <Image source={{ uri: qrUrl }} style={styles.qrImage} />
                    </View>
                </View>
            </View>

            {/* Barra de menú inferior */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuButton} onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                    <Text style={styles.menuButtonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003580',
    },
    cardContainer: {
        width: '90%', // Reducimos el ancho del carnet
        height: '82%', // Reducimos la altura del carnet
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10, // Ajustamos el padding para adaptarlo al nuevo tamaño
    },
    title: {
        top: 70,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 80, // Ajustamos para que el título no se superponga
        textAlign: 'center',
    },
    subtitle: {
        top: 0,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 15, // Ajustamos para que el título no se superponga
        textAlign: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 100, // Reducimos el tamaño de la foto
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        paddingVertical: 8, // Reducimos el padding
        paddingHorizontal: 10,
        marginVertical: 3,
    },
    infoValue: {
        fontSize: 16, // Reducimos el tamaño de la fuente
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    qrContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    qrImage: {
        width: 120, // Reducimos el tamaño del QR
        height: 120,
    },
    loadingText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#0056b3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignSelf: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomMenu: {
        width: '100%',
        height: 60,
        backgroundColor: '#0056b3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
});
