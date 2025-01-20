import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SermonesProps {
    sermones: Array<{
        id: string;
        name: string;
        description: string;
        uploadedAt: string;
        url: string;
    }>;
    handleMoreSermonsPress: (option: string) => void;
}

const Sermones: React.FC<SermonesProps> = ({ sermones, handleMoreSermonsPress }) => {
    const renderSermonItem = ({ item }: { item: any }) => (
        <View style={styles.sermonItem}>
            <View style={styles.sermonHeader}>
                <FontAwesome name="podcast" size={24} color="#2c3e50" />
                <Text style={styles.sermonTitle}>{item.name}</Text>
            </View>
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
                onPress={() => handleMoreSermonsPress('Home/VerMasSermones')}
            >
                <FontAwesome name="music" size={20} color="white" />
                <Text style={styles.moreSermonsButtonText}>Escuchar más sermones</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>🎤 Sermones</Text>
            <FlatList
                data={sermones}
                keyExtractor={(item) => item.id}
                renderItem={renderSermonItem}
                contentContainerStyle={styles.listContainer}
            />
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
    listContainer: {
        paddingBottom: 15,
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
        paddingVertical: 6, // Más pequeño
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start', // Tamaño ajustado al contenido
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 10,
    },
    playButtonTextSmall: {
        color: 'white',
        fontSize: 14, // Más pequeño
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
