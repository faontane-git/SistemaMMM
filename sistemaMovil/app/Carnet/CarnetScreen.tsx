import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

// Ajustar el modelo para incluir apellidos y foto
interface Persona {
    nombres: string;
    apellidos: string;
    cedula: string;
    fechaMiembro: any; // Cambiar si tienes un tipo más específico
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
                    console.log(data);
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

    const formatFecha = (timestamp: any) => {
        if (timestamp && timestamp.toDate) {
            const date = timestamp.toDate();
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return "Desconocido";
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <FontAwesome name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.carnet}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${persona.foto}` }}
                    style={styles.profileImage}
                />

                <Text style={styles.title}>Carnet de Feligrés</Text>
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
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Miembro desde:</Text>
                    <Text style={styles.infoValue}>{formatFecha(persona.fechaMiembro)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    backButton: {
        backgroundColor: '#2c3e50',
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
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});
