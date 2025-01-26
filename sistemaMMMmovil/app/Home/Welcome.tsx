import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
export default function WelcomeScreen() {
    const navigation = useNavigation();
  

    const handleContinue = () => {
        // Enviar una notificación local como ejemplo
         navigation.navigate('Home/HomeScreen' as never);
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../../assets/logo.png')} // Cambia esta ruta al logo correcto
                style={styles.logo}
            />

            {/* Título */}
            <Text style={styles.title}>¡Bienvenido!</Text>

            {/* Mensaje */}
            <Text style={styles.message}>
                Conecta con la comunidad, accede a sermones inspiradores, noticias importantes y
                herramientas para fortalecer tu fe. ¡Estamos felices de tenerte aquí!
            </Text>

            {/* Botón */}
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Explorar la App</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F4F8', // Fondo suave azul celeste
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
        color: '#2C3E50', // Azul oscuro
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#34495E', // Gris azulado
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#1B4F72', // Azul oscuro
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
