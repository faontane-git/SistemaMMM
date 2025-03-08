import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons'; // Para los iconos

// Definición de tipos
type ActividadOtros = {
    fechas: string;
    lugar: string;
    nombre: string;
};

export default function HorarioOtrosScreen({ navigation }: any) {
    const [actividades, setActividades] = useState<ActividadOtros[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home' as never);
        }
    };

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'actividades_otros'));
                const actividadesData: ActividadOtros[] = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as ActividadOtros[];
    
                // Función para convertir "DD/MM/YYYY" a un objeto Date
                const parseFecha = (fechaStr: string) => {
                    const [dia, mes, año] = fechaStr.split('/').map(num => parseInt(num, 10));
                    return new Date(año, mes - 1, dia); // mes - 1 porque en JavaScript los meses van de 0 a 11
                };
    
                // Ordenar actividades por fecha
                actividadesData.sort((a, b) => parseFecha(a.fechas).getTime() - parseFecha(b.fechas).getTime());
    
                setActividades(actividadesData);
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchActividades();
    }, []);
    
    

    const renderItem = ({ item }: { item: ActividadOtros }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.cardText}>Fechas: {item.fechas}</Text>
            <Text style={styles.cardText}>Lugar: {item.lugar}</Text>
        </View>
    );

    const handleOptionPress = (route: string) => {
        navigation.navigate(route);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1B4F72" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')} // Ajusta esta ruta al logo correcto
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>Actividades Nacionales</Text>
                <TouchableOpacity onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Lista de actividades */}
            <FlatList
                data={actividades}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.dayContainer}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 10,
        backgroundColor: '#2c3e50',
        marginBottom: 10,
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
    loginButton: {
        padding: 10,
    },
    card: {
        backgroundColor: '#1B4F72',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cardTitle: {
        color: 'white',
        fontSize: 14,
    },
    dayContainer: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cardText: {
        fontSize: 14,
        color: '#fff',
    },
});
