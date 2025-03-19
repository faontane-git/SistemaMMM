import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

interface Noticia {
    id: string;
    titulo: string;
    fotoBase64?: string;
    descripcion?: string;
    fecha?: string; // Campo adicional para la fecha
}

export default function VerMasNoticias() { // Exportación por defecto
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home' as never);
        }
    };

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'Noticias'));
                const noticiasArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Noticia[];
                setNoticias(noticiasArray);
            } catch (error) {
                console.error('Error fetching noticias:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    const renderNoticiaItem = ({ item }: { item: Noticia }) => (
        <View style={styles.noticiaItem}>
            <Image source={{ uri: item.fotoBase64 }} style={styles.image} />
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.date}>
                Publicado el: {new Date(item.fecha || Date.now()).toLocaleDateString()}
            </Text>
            <Text style={styles.description}>{item.descripcion}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.headerText}>Noticias</Text>
                    <TouchableOpacity onPress={handleGoBack}>
                        <FontAwesome name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2980B9" />
                        <Text style={styles.loadingText}>Cargando noticias...</Text>
                    </View>
                ) : noticias.length > 0 ? (
                    <FlatList
                        data={noticias}
                        keyExtractor={(item) => item.id}
                        renderItem={renderNoticiaItem}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <Text style={styles.noDataText}>No hay noticias disponibles.</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, backgroundColor: '#F8F9FA' },
    listContainer: { paddingBottom: 15 },
    noticiaItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
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
