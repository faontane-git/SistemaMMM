import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
    cedula: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'IniciarSesion/IniciarSesion'>;

export default function MenuScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const route = useRoute();
    const { nombres, apellidos, cedula, fechaNacimiento } = route.params as RouteParams;

    const [isBirthdayModalVisible, setIsBirthdayModalVisible] = useState(false);

    useEffect(() => {
        const today = new Date();
        const [year, month, day] = fechaNacimiento.split('-').map(Number);

        if (month === today.getMonth() + 1 && day === today.getDate()) {
            setIsBirthdayModalVisible(true);
        }
    }, [fechaNacimiento]);

    const handleCloseBirthdayModal = () => {
        setIsBirthdayModalVisible(false);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession'); // Elimina los datos de sesión
            navigation.navigate('Home/HomeScreen'); // Redirige a la pantalla de inicio de sesión
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleOptionPress = () => {
        navigation.navigate('Carnet/CarnetScreen', { cedula });
    };
    const handleOptionPress2 = () => {
        navigation.navigate('Carnet/CertificadoBautismo', { cedula });
    };
    const handleOptionPress3 = () => {
        navigation.navigate('Carnet/CertificadoMatrimonio', { cedula });
    };
    const handleValidateCertificatesPress = () => {
        navigation.navigate('Certificados/ValidarCertificados');
    };

    const handleCambioPress = () => {
        navigation.navigate('Cambio/CambioC', { cedula });
    };

    return (
        <View style={styles.container}>
            {/* Modal de cumpleaños */}
            <Modal
                visible={isBirthdayModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseBirthdayModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.birthdayModal}>
                        <Text style={styles.birthdayTitle}>¡Feliz cumpleaños!</Text>
                        <FontAwesome name="birthday-cake" size={80} color="#f39c12" style={styles.birthdayIcon} />
                        <Text style={styles.birthdayMessage}>
                            ¡Hoy es tu cumpleaños, {nombres}! Que tengas un gran día. 🥳
                        </Text>
                        <TouchableOpacity
                            style={styles.birthdayButton}
                            onPress={handleCloseBirthdayModal}
                        >
                            <Text style={styles.birthdayButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>
                <Text style={styles.headerText}>Bienvenido</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Bienvenida y opciones */}
            <View style={styles.body}>
                <Text style={styles.nameText}>{nombres}</Text>
                <Text style={styles.nameText}>{apellidos}</Text>
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
                    onPress={handleOptionPress2}
                >
                    <Text style={styles.optionText}>Certificado de Bautismo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleOptionPress3}
                >
                    <Text style={styles.optionText}>Certificado de Matrimonio</Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleValidateCertificatesPress}
                >
                    <Text style={styles.optionText}>Validar Certificados</Text>
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    birthdayModal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    birthdayTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#003580',
        textAlign: 'center',
        marginBottom: 20,
    },
    birthdayIcon: {
        marginBottom: 20,
    },
    birthdayMessage: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    birthdayButton: {
        backgroundColor: '#003580',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    birthdayButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    logoutButton: {
        flex: 0.2,
        alignItems: 'flex-end',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
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
        backgroundColor: '#003580',
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
