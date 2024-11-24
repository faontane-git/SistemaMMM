import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack(); // Regresa a la pantalla anterior
        } else {
            Alert.alert('Error', 'No hay una pantalla anterior a la que regresar.');
        }
    };

    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor complete todos los campos.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las nuevas contraseñas no coinciden.');
            return;
        }
        Alert.alert('Éxito', 'La contraseña ha sido cambiada correctamente.');
        // Aquí puedes añadir la lógica para cambiar la contraseña en tu base de datos
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Ruta local al logo
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>Cambiar Contraseña</Text>
                <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
                <Text style={styles.label}>Antigua contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Ingrese su contraseña actual"
                    placeholderTextColor="#aaa"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />

                <Text style={styles.label}>Nueva Contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Ingrese su nueva contraseña"
                    placeholderTextColor="#aaa"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <Text style={styles.label}>Repita Su contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Repita su nueva contraseña"
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {/* Botón */}
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 30,
        backgroundColor: '#2c3e50',
        marginBottom: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    backIcon: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 50,
    },
    form: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        backgroundColor: '#0000aa', // Azul oscuro
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
