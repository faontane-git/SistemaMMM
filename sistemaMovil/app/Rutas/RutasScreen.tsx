import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RutasScreen() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home' as never); // Redirigir a la pantalla de inicio si no hay una pantalla anterior
        }
    };

    const openLink = (url: string) => {
        Linking.openURL(url);
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
                <Text style={styles.headerText}>Rutas</Text>
                <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Contenido de Rutas */}
            <ScrollView style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Estamos ubicados en:</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>
                        Cdla. Vergeles, Av. Francisco de Orellana y Callejón 23 (Alado de Urgentito)
                    </Text>
                </View>

                {/* Ubicación GPS */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>Ubicación GPS (Google Maps)</Text>
                    <TouchableHighlight
                        style={styles.linkButton}
                        onPress={() => openLink('https://maps.app.goo.gl/5T8qgD1newABiDHQ9')}
                        underlayColor="#21618C"
                    >
                        <View style={styles.linkButtonInner}>
                            <FontAwesome name="map-marker" size={20} color="white" />
                            <Text style={styles.linkButtonText}>Abrir en Google Maps</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {/* Video de cómo llegar */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>Video de cómo llegar</Text>
                    <TouchableHighlight
                        style={styles.linkButton}
                        onPress={() => openLink('https://fb.watch/uilFjkFkEn/')}
                        underlayColor="#21618C"
                    >
                        <View style={styles.linkButtonInner}>
                            <FontAwesome name="video-camera" size={20} color="white" />
                            <Text style={styles.linkButtonText}>Ver Video</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {/* Buses */}
                <Text style={styles.sectionTitle}>Buses que pasan por la zona:</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>64B, 63A, 85, 131, 143</Text>
                </View>
            </ScrollView>

            {/* Barra de menú en la parte inferior */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleGoBack}
                    activeOpacity={0.7}
                >
                    <FontAwesome name="arrow-left" size={24} color="white" />
                    <Text style={styles.menuItemText}>Volver</Text>
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
    contentSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoCard: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#34495e',
    },
    linkButton: {
        backgroundColor: '#2980b9',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 10,
    },
    linkButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        paddingVertical: 15,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuItemText: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
});
