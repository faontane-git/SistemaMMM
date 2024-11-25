import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout'

type RouteParams = {
    cedula: string;
    nombres: string;
    apellidos: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'IniciarSesion/IniciarSesion'>;

export default function MenuScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const route = useRoute();
    const { nombres, apellidos, cedula } = route.params as RouteParams;

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    onPress: () => {
                    },
                },
            ]
        );
    };

    const handleOptionPress = () => {
        navigation.navigate('Carnet/CarnetScreen', { cedula });
    };
    const handleCambioPress = () => {
        navigation.navigate('Cambio/CambioC', { cedula });
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Ruta de tu logo
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>IGLESIA MMM</Text>
                {/* Botón de cerrar sesión */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Bienvenida y opciones */}
            <View style={styles.body}>
                <Text style={styles.welcomeText}>Bienvenido</Text>
                <Text style={styles.nameText}>
                    {nombres}
                </Text>
                <Text style={styles.nameText}>
                    {apellidos}
                </Text>
                <Text style={styles.subtitle}>Seleccione una opción</Text>

                {/* Opciones */}
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleOptionPress}
                >
                    <Text style={styles.optionText}>Ver Carnet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => Alert.alert('Certificados', 'Esta opción aún no está implementada.')}
                >
                    <Text style={styles.optionText}>Certificados</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleCambioPress}
                >
                    <Text style={styles.optionText}>Cambiar Contraseña</Text>
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
        width: '100%',
        height: 80,
        backgroundColor: '#003580', // Azul oscuro
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    headerText: {
        flex: 0.6,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logoutButton: {
        flex: 0.2,
        alignItems: 'flex-end',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    nameText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#0000aa', // Azul oscuro
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
