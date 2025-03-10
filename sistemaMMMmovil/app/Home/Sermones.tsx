import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definir los parámetros de navegación
type RootStackParamList = {
    "Home/VerMasSermones": { type: string };
};

interface Sermon {
    id: string;
    name: string;
    description: string;
    type: string;
    uploadedAt: string;
    url: string;
}

interface SermonesProps {
    sermones: Sermon[];
}

const Sermones: React.FC<SermonesProps> = ({ sermones }) => {
    // Definir el tipo correcto para `useNavigation`
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Función para obtener el último registro de cada tipo
    const getLatestByType = (type: string) => {
        const filtered = sermones.filter((sermon) => sermon.type === type);
        return filtered.length > 0
            ? filtered.reduce((latest, current) =>
                new Date(current.uploadedAt) > new Date(latest.uploadedAt) ? current : latest
            )
            : null;
    };

    const categories = [
        { title: '🎤 Mensajes que Edifican', type: 'Sermones', route: 'Home/VerMasSermones' },
        { title: '🎶 Música', type: 'Música', route: 'Home/VerMasSermones' },
        { title: '🔥 Juventud Victoriosa', type: 'Juventud Victoriosa', route: 'Home/VerMasSermones' },
    ];

    const handleMoreSermonsPress = (route: string, type: string) => {
        navigation.navigate(route as keyof RootStackParamList, { type });
    };

    const renderSermonItem = (item: Sermon | null, route: string) => {
        if (!item) return null;

        return (
            <View style={styles.sermonItem}>
                <View style={styles.sermonHeader}>
                    <FontAwesome name="podcast" size={24} color="#2c3e50" />
                    <Text style={styles.sermonTitle}>{item.name}</Text>
                </View>
                <Text style={styles.sermonDescription}>{item.type}</Text>
                <Text style={styles.sermonDescription}>{item.description}</Text>
                <Text style={styles.sermonDate}>
                    Subido el: {new Date(item.uploadedAt).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                    style={styles.playButtonSmall}
                    onPress={() => Linking.openURL(item.url)}
                >
                    <FontAwesome name="play-circle" size={16} color="white" />
                    <Text style={styles.playButtonTextSmall}>Escuchar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.moreSermonsButton}
                    onPress={() => handleMoreSermonsPress(route, item.type)} // 🔹 Ahora pasa la ruta y el type correctamente
                >
                    <FontAwesome name="music" size={20} color="white" />
                    <Text style={styles.moreSermonsButtonText}>Escuchar más {item.type}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {categories.map(({ title, type, route }) => {
                const latestSermon = getLatestByType(type);
                return (
                    <View key={type}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                        {renderSermonItem(latestSermon, route)}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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
    sermonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sermonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginLeft: 10,
    },
    sermonDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    sermonDate: {
        fontSize: 14,
        color: '#777',
        marginBottom: 15,
    },
    playButtonSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2980B9',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 10,
    },
    playButtonTextSmall: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    moreSermonsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8E44AD',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    },
    moreSermonsButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default Sermones;
