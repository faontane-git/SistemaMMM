import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Asegúrate de ajustar la ruta según tu proyecto

type Actividad = {
    dia_num: string;
    materia: string;
    hora_inicio: string;
    hora_final: string;
    color: string;
};

type DiaActividades = {
    dia: string;
    actividades: Actividad[];
};

export default function HorarioActividadesScreen({ navigation }: any) {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'actividades'));
                const actividadesData: Actividad[] = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as Actividad[];
                setActividades(actividadesData);
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);


    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const actividadesAgrupadas = actividades.reduce<Record<string, Actividad[]>>((acc, actividad) => {
        const diaNombre = diasSemana[parseInt(actividad.dia_num, 10)];
        if (!acc[diaNombre]) {
            acc[diaNombre] = [];
        }
        acc[diaNombre].push(actividad);
        return acc;
    }, {});

    const datos: DiaActividades[] = Object.keys(actividadesAgrupadas).map((dia) => ({
        dia,
        actividades: actividadesAgrupadas[dia],
    }));

    const renderItem = ({ item }: { item: DiaActividades }) => (
        <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{item.dia}</Text>
            {item.actividades.map((actividad, index) => (
                <View key={index} style={[styles.activityCard, { backgroundColor: actividad.color }]}>
                    <Text style={styles.activityText}>{actividad.materia}</Text>
                    <Text style={styles.activityText}>
                        {actividad.hora_inicio} - {actividad.hora_final}
                    </Text>
                </View>
            ))}
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
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.headerText}>IGLESIA MMM</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => handleOptionPress('IniciarSesion/IniciarSesion')}
                >
                    <FontAwesome name="user-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Lista de actividades */}
            <FlatList
                data={datos}
                renderItem={renderItem}
                keyExtractor={(item) => item.dia}
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
        flex: 1,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginButton: {
        padding: 10,
    },
    dayContainer: {
        marginBottom: 20,
    },
    dayText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10,
    },
    activityCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    activityText: {
        color: 'white',
        fontSize: 16,
    },
});
