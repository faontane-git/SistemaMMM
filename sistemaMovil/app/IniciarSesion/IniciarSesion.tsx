import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout'



type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'IniciarSesion/IniciarSesion'>;

export default function LoginScreen() {
    const [cedula, setCedula] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async () => {
        if (cedula.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }
    
        try {
            const q = query(
                collection(firestore, 'Feligreses'),
                where('cedula', '==', cedula),
                where('contraseña', '==', password)
            );
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                console.log('Cédula encontrada:', cedula);
                navigation.navigate('Carnet/CarnetScreen', { cedula });
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Cédula"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                autoCapitalize="none"
                value={cedula}
                onChangeText={setCedula}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
