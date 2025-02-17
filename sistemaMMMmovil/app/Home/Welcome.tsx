import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';

interface BienvenidaData {
    Titulo: string;
    Mensaje: string;
}

export default function WelcomeScreen() {
    const navigation = useNavigation();
    const [bienvenida, setBienvenida] = useState<BienvenidaData>({ Titulo: '', Mensaje: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBienvenida = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Bienvenida'));
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as BienvenidaData; // 🔥 Se forzó el tipo aquí
                    setBienvenida(data);
                });
            } catch (error) {
                console.error('Error al obtener los datos de Bienvenida:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBienvenida();
    }, []);

    const handleContinue = () => {
        navigation.navigate('Home/HomeScreen' as never);
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../../assets/logo.png')} // Cambia esta ruta al logo correcto
                style={styles.logo}
            />

            {/* Muestra un loader mientras se carga la información */}
            {loading ? (
                <ActivityIndicator size="large" color="#1B4F72" />
            ) : (
                <>
                    {/* Título dinámico */}
                    <Text style={styles.title}>{bienvenida.Titulo}</Text>

                    {/* Mensaje dinámico */}
                    <Text style={styles.message}>{bienvenida.Mensaje}</Text>

                    {/* Botón */}
                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F4F8',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#34495E',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#1B4F72',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

