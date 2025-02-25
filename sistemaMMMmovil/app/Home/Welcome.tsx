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
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';
import * as Notifications from 'expo-notifications';

interface BienvenidaData {
    Titulo: string;
    Mensaje: string;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function scheduleDailyNotification() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "📢 Dios tiene un mensaje para ti. !Léelo ahora!",
                body: "Por favor, visualiza el mensaje del día.",
            },
            trigger: {
                hour: 12,
                minute: 0,
                repeats: true,
            },
        });
    } catch (error) {
        console.error("Error al programar notificación:", error);
    }
}

async function setupNotifications() {
    try {
        let { status } = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            status = newStatus;
        }

        if (status === "granted") {
            // Programar notificación diaria
            await scheduleDailyNotification();

            // Mostrar notificación inmediata usando el método actualizado
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "📢 Dios tiene un mensaje para ti. !Léelo ahora!",
                    body: "Por favor, visualiza el mensaje del día.",
                },
                trigger: null, // Se envía inmediatamente
            });
            
        } else {
            console.warn("⚠️ Permisos de notificaciones denegados");
        }
    } catch (error) {
        console.error("❌ Error en configuración de notificaciones:", error);
    }
}


export default function WelcomeScreen() {
    const navigation = useNavigation();
    const [bienvenida, setBienvenida] = useState<BienvenidaData>({ Titulo: '', Mensaje: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            try {
                // Obtener datos de Firebase
                const querySnapshot = await getDocs(collection(firestore, 'Bienvenida'));
                querySnapshot.forEach((doc) => {
                    setBienvenida(doc.data() as BienvenidaData);
                });
                
                // Configurar notificaciones
                await setupNotifications();
            } catch (error) {
                console.error('Error inicializando datos:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeData();

        // Configurar el listener de notificaciones
        const notificationSubscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notificación recibida:', notification);
        });

        return () => {
            notificationSubscription.remove();
        };
    }, []);

    const handleContinue = () => {
        navigation.navigate('Home/HomeScreen' as never);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#1B4F72" />
            ) : (
                <>
                    <Text style={styles.title}>{bienvenida.Titulo}</Text>
                    <Text style={styles.message}>{bienvenida.Mensaje}</Text>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

// Los estilos se mantienen igual que en la versión anterior
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
        paddingHorizontal: 15,
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
        letterSpacing: 0.5,
    },
});