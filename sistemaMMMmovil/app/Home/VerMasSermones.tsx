import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Linking,
    SafeAreaView,
    Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

type RouteParams = {
    type?: string;
};

interface Sermon {
    id: string;
    name: string;
    description: string;
    uploadedAt: string;
    type: string;
    url: string;
}

export default function VerMasSermones() {
    const [sermones, setSermones] = useState<{ title: string; data: Sermon[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();

    const { type } = (route.params as RouteParams) || {};

    useEffect(() => {
        console.log(type);
        if (!type) return;

        const fetchSermones = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'Audios'));
                const sermonesArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Sermon[];

                const filteredSermones = sermonesArray.filter((sermon) => sermon.type === type);
                const groupedSermones = filteredSermones.length > 0
                    ? [{ title: type, data: filteredSermones }]
                    : [];

                setSermones(groupedSermones);
            } catch (error) {
                console.error('Error fetching sermones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSermones();
    }, [type]);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home' as never);
        }
    };

    const renderSermonItem = ({ item }: { item: Sermon }) => (
        <View style={styles.sermonItem}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.date}>Publicado el: {new Date(item.uploadedAt).toLocaleDateString()}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.audioButton} onPress={() => Linking.openURL(item.url)}>
                <FontAwesome name="play-circle" size={24} color="white" />
                <Text style={styles.audioButtonText}>Escuchar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>
                <Text style={styles.headerText}>Mensajes - {type}</Text>
                <TouchableOpacity onPress={handleGoBack}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Contenido */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2980B9" />
                    <Text style={styles.loadingText}>Cargando sermones...</Text>
                </View>
            ) : sermones.length > 0 ? (
                <SectionList
                    sections={sermones}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSermonItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noDataText}>No hay sermones disponibles.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, backgroundColor: '#F8F9FA' },
    listContainer: { paddingBottom: 15 },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ecf0f1',
        padding: 10,
        color: '#2C3E50',
    },
    sermonItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'justify',
    },
    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    audioButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    noDataText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#555',
    },
    safeArea: {
        backgroundColor: '#2c3e50',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#2c3e50',
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
});

