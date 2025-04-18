import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, updateDoc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(); // Inicializa Firestore

export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { Password, Cedula } = route.params as { Password: string; Cedula: string }; // Parámetro recibido de la navegación

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack(); // Regresa a la pantalla anterior
        } else {
            Alert.alert('Error', 'No hay una pantalla anterior a la que regresar.');
        }
    };

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor complete todos los campos.');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las nuevas contraseñas no coinciden.');
            return;
        }
    
        if (oldPassword !== Password) {
            Alert.alert('Error', 'La antigua contraseña no es correcta.');
            return;
        }
    
        try {
            // Consultar Firestore para encontrar el documento con la cédula proporcionada
            const personasRef = collection(db, 'Personas');
            const q = query(personasRef, where('Cedula', '==', Cedula));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                Alert.alert('Error', `No se encontró un usuario con la cédula: ${Cedula}`);
                return;
            }
    
            // Solo debería haber un documento con esa cédula
            const userDoc = querySnapshot.docs[0].ref;
    
            // Actualizar la contraseña en Firestore
            await updateDoc(userDoc, { Password: newPassword });
    
            Alert.alert('Éxito', 'La contraseña ha sido cambiada correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            Alert.alert('Error', 'No se pudo cambiar la contraseña. Intente nuevamente.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                    <TouchableOpacity onPress={handleGoBack}>
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
        </SafeAreaView>
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
        backgroundColor: '#003580',
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
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    form: {
        paddingHorizontal: 20,
        marginTop: 20,
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
        backgroundColor: '#003580',
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
