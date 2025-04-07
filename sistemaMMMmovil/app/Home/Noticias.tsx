import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface NoticiasProps {
    noticias: Array<{ id: string; titulo: string; fotoBase64?: string; descripcion?: string, fecha?: string }>;
    handleOptionPress: (option: string) => void;
}

const Noticias: React.FC<NoticiasProps> = ({ noticias, handleOptionPress }) => {
    if (noticias.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.newsTitle}>📰 Noticias y Eventos</Text>
                <Text style={styles.noNewsText}>No hay noticias disponibles.</Text>
            </View>
        );
    }

    // Ordenar las noticias por fecha (más reciente primero)
    const noticiasOrdenadas = noticias.sort((a, b) => {
        const fechaA = new Date(a.fecha || 0).getTime();
        const fechaB = new Date(b.fecha || 0).getTime();
        return fechaB - fechaA; // Orden descendente
    });

    const ultimaNoticia = noticiasOrdenadas[0]; // Última noticia publicada

    return (
        <View style={styles.container}>
            <Text style={styles.newsTitle}>📰 Noticias</Text>
            <View style={styles.highlightNews}>
                <Image
                    source={{ uri: ultimaNoticia.fotoBase64 }}
                    style={styles.newsImage}
                />
                <View style={styles.textContent}>
                    <Text style={styles.newsItemTitle}>{ultimaNoticia.titulo}</Text>
                    <Text style={styles.date}>
                        Publicado el: {new Date(ultimaNoticia.fecha || Date.now()).toLocaleDateString()}
                    </Text>
                    <Text style={styles.newsDescription}>
                        {ultimaNoticia.descripcion}
                    </Text>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleOptionPress('Noticias/VerMasNoticias')}
                    >
                        <FontAwesome name="newspaper-o" size={18} color="white" />
                        <Text style={styles.actionButtonText}>Ver más noticias</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    newsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#2C3E50',
    },
    noNewsText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
    },
    highlightNews: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
    },
    newsImage: {
        width: '100%',
        height: 200,
    },
    textContent: {
        padding: 15,
    },
    newsItemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10,
    },    
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    newsDescription: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2980B9',
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default Noticias;
