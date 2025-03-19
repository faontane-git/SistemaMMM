import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Ajusta la ruta según tu proyecto

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
    const [datos, setDatos] = useState<DiaActividades[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    };

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'actividades'));
                const actividadesData: Actividad[] = querySnapshot.docs.map((doc) => ({
                    dia_num: doc.data().dia_num.toString(),
                    materia: doc.data().materia || 'Sin nombre',
                    hora_inicio: doc.data().hora_inicio || '00:00',
                    hora_final: doc.data().hora_final || '00:00',
                    color: doc.data().color || '#3498db',
                }));

                organizarActividades(actividadesData);
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);

    const organizarActividades = (actividadesData: Actividad[]) => {
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

        const datosOrdenados: DiaActividades[] = [];
        for (let i = 0; i < diasSemana.length; i++) {
            const diaIndex = (diaActual + i) % diasSemana.length;
            const diaNombre = diasSemana[diaIndex];

            if (actividadesAgrupadas[diaNombre]) {
                actividadesAgrupadas[diaNombre].sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

                datosOrdenados.push({
                    dia: diaNombre,
                    actividades: actividadesAgrupadas[diaNombre],
                });
            }
        }

        setDatos(datosOrdenados);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1B4F72" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.headerText}>Horarios de Consejería Pastoral</Text>
                    <TouchableOpacity onPress={handleGoBack} accessibilityLabel="Volver a la pantalla anterior">
                        <FontAwesome name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={datos}
                    keyExtractor={(item) => item.dia}
                    renderItem={({ item }) => (
                        <View style={styles.dayContainer}>
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
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
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

