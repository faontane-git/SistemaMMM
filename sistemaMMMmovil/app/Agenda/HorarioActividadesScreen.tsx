import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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

export default function HorarioActividadesScreen({ navigation }: any) {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [datos, setDatos] = useState<DiaActividades[]>([]); // Nuevo estado para actividades agrupadas y ordenadas
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
                const querySnapshot = await getDocs(collection(firestore, 'actividades'));
                const actividadesData: Actividad[] = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as Actividad[];

                setActividades(actividadesData);

                // Obtener el día actual y reorganizar las actividades
                const diaActual = new Date().getDay();
                const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

                const actividadesAgrupadas = actividadesData.reduce<Record<string, Actividad[]>>((acc, actividad) => {
                    const diaNombre = diasSemana[parseInt(actividad.dia_num, 10)];
                    if (!acc[diaNombre]) {
                        acc[diaNombre] = [];
                    }
                    acc[diaNombre].push(actividad);
                    return acc;
                }, {});

                // Convertir el objeto en un array ordenado comenzando desde el día actual
                const datosOrdenados: DiaActividades[] = [];
                for (let i = 0; i < diasSemana.length; i++) {
                    const diaIndex = (diaActual + i) % diasSemana.length; // Índice rotado según el día actual
                    const diaNombre = diasSemana[diaIndex];
                    if (actividadesAgrupadas[diaNombre]) {
                        datosOrdenados.push({
                            dia: diaNombre,
                            actividades: actividadesAgrupadas[diaNombre],
                        });
                    }
                }

                setDatos(datosOrdenados); // Actualiza el estado con los datos ordenados
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);

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
                <Text style={styles.headerText}>Horarios de Consejería Pastoral</Text>
                <TouchableOpacity onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Lista de actividades agrupadas por día */}
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
        elevation: 3,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#34495e',
    },
    activityCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    activityText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
});
