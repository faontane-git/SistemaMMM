import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const handleOptionPress = (option: string) => {
        navigation.navigate(option as never);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Bienvenido</Text>
                <TouchableOpacity
                    onPress={() => handleOptionPress('IniciarSesion')}
                    style={styles.logoutButton}
                >
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Contenido */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>¡Bienvenido a la Iglesia MMM!</Text>

                {/* Botón Carnet */}
                <TouchableOpacity
                    style={styles.carnetButton}
                    onPress={() => handleOptionPress('Carnet/CarnetScreen')}
                >
                    <FontAwesome name="id-card" size={24} color="white" />
                    <Text style={styles.carnetButtonText}>Carnet</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    logoutButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
    },
    carnetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    carnetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
