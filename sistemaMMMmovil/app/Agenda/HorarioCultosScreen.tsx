import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Asegúrate de ajustar la ruta según tu proyecto

type Actividad = {
    dia_num: string; // Día de la semana (0-6)
    materia: string;
    hora_inicio: string;
    hora_final: string;
    color: string;
};

type DiaActividades = {
    dia: string;
    actividades: Actividad[];
};

export default function HorarioCultosScreen({ navigation }: any) {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [datos, setDatos] = useState<DiaActividades[]>([]); // Nuevo estado para las actividades agrupadas
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
                const querySnapshot = await getDocs(collection(firestore, 'cultos'));
                const actividadesData: Actividad[] = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as Actividad[];

                setActividades(actividadesData);

                // Obtener el día actual
                const diaActual = new Date().getDay();

                // Agrupar actividades por día
                const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const actividadesAgrupadas = actividadesData.reduce<Record<string, Actividad[]>>((acc, actividad) => {
                    const diaNombre = diasSemana[parseInt(actividad.dia_num, 10)];
                    if (!acc[diaNombre]) {
                        acc[diaNombre] = [];
                    }
                    acc[diaNombre].push(actividad);
                    return acc;
                }, {});

                // Convertir a un array y reorganizar para que el día actual esté primero
                const datosOrdenados: DiaActividades[] = Object.keys(actividadesAgrupadas)
                    .map((dia) => ({
                        dia,
                        actividades: actividadesAgrupadas[dia],
                    }))
                    .sort((a, b) => {
                        const indexA = diasSemana.indexOf(a.dia);
                        const indexB = diasSemana.indexOf(b.dia);
                        return indexA === diaActual
                            ? -1
                            : indexB === diaActual
                                ? 1
                                : indexA - indexB;
                    });

                setDatos(datosOrdenados); // Actualiza el estado con los datos agrupados y ordenados
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);

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
                <Text style={styles.headerText}>Horarios de Cultos</Text>
                <TouchableOpacity style={styles.backIcon} onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Horario semanal */}
            <ScrollView style={styles.scheduleContainer}>
                {datos.map((item, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.dayText}>{item.dia}</Text>
                        {item.actividades.map((actividad, idx) => (
                            <View key={idx} style={[styles.activityCard, { backgroundColor: actividad.color }]}>
                                <Text style={styles.activityText}>{actividad.materia}</Text>
                                <Text style={styles.activityText}>
                                    {actividad.hora_inicio} - {actividad.hora_final}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
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
    backIcon: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 50,
    },
    loginButton: {
        padding: 10,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2C3E50',
        marginVertical: 20,
    },
    scheduleContainer: {
        flex: 1,
        marginBottom: 20,
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
        elevation: 3, // Da sombra a las tarjetas de actividad
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#34495e', // Un color más neutro para los días
    },
    activityCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // Da sombra a las tarjetas de actividad
    },
    activityText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    noActivities: {
        textAlign: 'center',
        color: '#95a5a6',
        fontStyle: 'italic',
    },
});
