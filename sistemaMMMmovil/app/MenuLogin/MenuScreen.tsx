import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: string;
    Activo: string;
    BautizadoAgua: string;
    BautizadoEspirutoSanto: string;
    CargoIglesia: string;
    CasadoEclesiaticamnete: string;
    CiudadResidencia: string;
    ContactoEmergencia: string;
    ContactoPersonal: string;
    Correo: string;
    DireccionDomicilio: string;
    EstadoCivil: string;
    FechaBaustismo: string;
    FechaMatrimonio: string;
    Funcion: string;
    IglesiaActual: string;
    IglesiaBautismo: string;
    IglesiaMatrimonio: string;
    Ministro: string;
    NombreCoyuge: string;
    Password: string;
    Pastor: string;
    PastorBautismo:string;
    País: string;
    Photo: string;
    Sexo: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'IniciarSesion/IniciarSesion'>;

export default function MenuScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const route = useRoute();
    const { Nombres, Apellidos, Cedula, FechaNacimiento, Activo, BautizadoAgua, BautizadoEspirutoSanto
        , CargoIglesia, CasadoEclesiaticamnete, CiudadResidencia, ContactoEmergencia, ContactoPersonal,
        Correo, DireccionDomicilio, EstadoCivil, FechaBaustismo, FechaMatrimonio, Funcion, IglesiaActual,
        IglesiaBautismo, IglesiaMatrimonio, Ministro, NombreCoyuge, Password, Pastor, PastorBautismo,País, Photo, Sexo } = route.params as RouteParams;

    const [isBirthdayModalVisible, setIsBirthdayModalVisible] = useState(false);

    useEffect(() => {
        const today = new Date();
        const [year, month, day] = FechaNacimiento.split('-').map(Number);

        if (month === today.getMonth() + 1 && day === today.getDate()) {
            setIsBirthdayModalVisible(true);
        }
    }, [FechaNacimiento]);

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
        navigation.navigate('Carnet/CarnetScreen', { Nombres, Apellidos, Cedula, Photo, IglesiaActual, CargoIglesia });
    };
    const handleOptionPress2 = () => {
        navigation.navigate('Carnet/CertificadoBautismo', { Nombres, Apellidos, Cedula, IglesiaBautismo,PastorBautismo, FechaBaustismo });
    };
    const handleOptionPress3 = () => {
        navigation.navigate('Carnet/CertificadoMatrimonio', { Nombres, Apellidos, EstadoCivil, NombreCoyuge, IglesiaMatrimonio,Ministro, Cedula, FechaMatrimonio });
    };
    const handleValidateCertificatesPress = () => {
        navigation.navigate('Certificados/ValidarCertificados');
    };

    const handleCambioPress = () => {
        navigation.navigate('Cambio/CambioC', { Password, Cedula });
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
                            ¡Hoy es tu cumpleaños, {Nombres}! Que tengas un gran día. 🥳
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
                <Text style={styles.nameText}>{Nombres}</Text>
                <Text style={styles.nameText}>{Apellidos}</Text>

                {/* Foto debajo del nombre */}
                {Photo ? (
                    <Image source={{ uri: Photo }} style={styles.profilePhoto} />
                ) : (
                    <FontAwesome name="user-circle" size={80} color="#ccc" style={styles.profilePhotoPlaceholder} />
                )}

                <Text style={styles.subtitle}>Seleccione una opción</Text>

                {/* Opciones */}
                <TouchableOpacity style={styles.optionButton} onPress={handleOptionPress}>
                    <FontAwesome name="id-card" size={20} color="white" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Ver Carnet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={handleOptionPress2}>
                    <FontAwesome name="certificate" size={20} color="white" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Certificado de Bautismo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={handleOptionPress3}>
                    <FontAwesome name="heart" size={20} color="white" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Certificado de Matrimonio</Text>
                </TouchableOpacity>

                {Funcion === "Administrador" && (
                    <TouchableOpacity style={styles.optionButton} onPress={handleValidateCertificatesPress}>
                        <FontAwesome name="check-circle" size={20} color="white" style={styles.optionIcon} />
                        <Text style={styles.optionText}>Validar Certificados</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.optionButton} onPress={handleCambioPress}>
                    <FontAwesome name="lock" size={20} color="white" style={styles.optionIcon} />
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
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#003580',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionIcon: {
        marginRight: 10,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
    },

    profilePhotoPlaceholder: {
        marginVertical: 10,
    },

});
