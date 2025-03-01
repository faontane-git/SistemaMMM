import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Modal,
    Pressable
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import Noticias from './Noticias';
import Sermones from './Sermones';

export default function HomeScreen() {
    const [noticias, setNoticias] = useState<any[]>([]);
    const [sermones, setSermones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [idioma, setIdioma] = useState<'es' | 'en'>('es');

    // Formatear la fecha del mensaje en formato legible
    const formatFecha = (timestamp: any) => {
        if (!timestamp) return "Fecha no disponible";
        const fecha = new Date(timestamp.seconds * 1000);
        return fecha.toLocaleDateString("es-ES", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noticiasSnapshot = await getDocs(collection(firestore, 'Noticias'));
                const noticiasArray = noticiasSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNoticias(noticiasArray);

                const sermonesSnapshot = await getDocs(collection(firestore, 'Audios'));
                const sermonesArray = sermonesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSermones(sermonesArray);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const mensajesRef = collection(firestore, "mensajes");
        const q = query(mensajesRef, orderBy("fecha", "desc")); // Obtener los últimos 10 mensajes

        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

        console.log("Fecha de hoy:", formattedDate); // Imprime "Fecha de hoy: 22/02"

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const mensajes = snapshot.docs.map(doc => doc.data());

                // Buscar un mensaje cuya fecha coincida con la de hoy
                const mensajeHoy = mensajes.find(mensaje => mensaje.fecha === formattedDate);

                if (mensajeHoy) {
                    setMensaje(mensajeHoy);
                    setModalVisible(true); // Muestra el modal si hay mensaje del día
                } else {
                    console.log("No hay mensaje para hoy.");
                }
            }
        }, (error) => {
            console.error("Error al obtener mensajes:", error);
        });

        return () => unsubscribe(); // Cleanup del listener
    }, []);



    const handleOptionPress = (option: string) => {
        navigation.navigate("Home/VerMasSermones" as never);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2980b9" />
                <Text style={styles.loadingText}>Cargando información...</Text>
            </View>
        );
    }

    const renderHeader = () => (
        <>
            {/* Noticias */}
            <View style={styles.section}>
                {noticias.length > 0 ? (
                    <Noticias noticias={noticias} handleOptionPress={handleOptionPress} />
                ) : (
                    <Text style={styles.noDataText}>No hay noticias disponibles.</Text>
                )}
            </View>

            {/* Sermones */}
            <View style={styles.section}>
                {sermones.length > 0 ? (
                    <Sermones sermones={sermones} handleMoreSermonsPress={handleOptionPress} />
                ) : (
                    <Text style={styles.noDataText}>No hay sermones disponibles.</Text>
                )}
            </View>

            {/* Botón de Ver Doctrina y Medicina al Corazón */}
            <View style={styles.doctrinaSection}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.smallButton}
                        onPress={() => handleOptionPress('Doctrina/DoctrinaScreen')}
                    >
                        <FontAwesome name="book" size={16} color="white" />
                        <Text style={styles.smallButtonText}>Ver Doctrina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.smallButton, styles.medicinaButton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome name="heart" size={16} color="white" />
                        <Text style={styles.smallButtonText}>Medicina al Corazón</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>
                <Text style={styles.headerText}>Mi Iglesia MMM</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => handleOptionPress('IniciarSesion/IniciarSesion')}
                >
                    <FontAwesome name="user-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Contenido Principal */}
            <FlatList
                data={[]} // Se usa FlatList pero no renderiza elementos directos
                keyExtractor={(_, index) => index.toString()}
                renderItem={null}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.mainContent}
            />

            {/* Modal de Notificación */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Logo en la parte superior */}
                        <Image source={require('../../assets/logoJV.jpg')} style={styles.modalLogo} />

                        <Text style={styles.modalTitle}>{mensaje?.titulo || "Nuevo mensaje"}</Text>

                        <Text style={styles.modalDate}>
                            📅 {`${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`}
                        </Text>


                        {/* Botón para cambiar idioma */}
                        <Pressable
                            style={styles.languageButton}
                            onPress={() => setIdioma((prev) => (prev === 'es' ? 'en' : 'es'))}
                        >
                            <Text style={styles.languageButtonText}>
                                {idioma === 'es' ? "Switch to English" : "Cambiar a Español"}
                            </Text>
                        </Pressable>

                        {/* Mensaje en Español o Inglés */}
                        {idioma === 'es' ? (
                            <>
                                <Text style={styles.modalMessage}>
                                    📖 {mensaje?.referenciaEs || "Sin referencia"}
                                </Text>
                                <Text style={styles.modalMessage}>
                                    📝 {mensaje?.mensaje_es || "No hay contenido disponible."}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalMessage}>
                                    📖 {mensaje?.referenciaEn || "No reference"}
                                </Text>
                                <Text style={styles.modalMessage}>
                                    📝 {mensaje?.mensaje_en || "No content available."}
                                </Text>
                            </>
                        )}

                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>{idioma === 'es' ? "Cerrar" : "Close"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Barra de menú inferior */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('QuienesSomos/QuienesSomosScreen')}
                >
                    <FontAwesome name="info-circle" size={24} color="white" />
                    <Text style={styles.menuItemText}>¿Quiénes somos?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('Rutas/RutasScreen')}
                >
                    <FontAwesome name="map-marker" size={24} color="white" />
                    <Text style={styles.menuItemText}>Rutas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('Agenda/AgendaScreen')}
                >
                    <FontAwesome name="calendar" size={24} color="white" />
                    <Text style={styles.menuItemText}>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleOptionPress('RedesSociales/RedesSocialesScreen')}
                >
                    <FontAwesome name="share-alt" size={24} color="white" />
                    <Text style={styles.menuItemText}>Redes Sociales</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 18, color: '#555' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#2c3e50',
    },
    logoContainer: { justifyContent: 'center', alignItems: 'center' },
    logo: { width: 40, height: 40 },
    headerText: { color: 'white', fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    loginButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'transparent'
    },
    mainContent: { paddingBottom: 10 },
    section: {
        marginBottom: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    doctrinaSection: { marginVertical: 0, alignItems: 'center' },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    smallButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9', // 🔵 Color original para "Ver Doctrina"
        paddingHorizontal: 10, // 📌 Más estrecho
        paddingVertical: 8, // 📌 Menos altura
        borderRadius: 30, // 🔹 Bordes redondeados pequeños
        marginHorizontal: 5, // 📌 Espacio entre botones
        justifyContent: 'center',
    },

    medicinaButton: {
        backgroundColor: '#C0392B', // 🔴 Rojo para "Medicina al Corazón"
    },

    smallButtonText: {
        color: 'white',
        fontSize: 14, // 📌 Texto más pequeño
        marginLeft: 5, // 📌 Espacio entre icono y texto
    },
    doctrinaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 15,
        borderRadius: 50,
        width: '80%',
        justifyContent: 'center',
    },
    doctrinaButtonText: { color: 'white', fontSize: 18, marginLeft: 10 },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#34495e',
    },
    menuItem: { alignItems: 'center' },
    menuItemText: { color: 'white', fontSize: 12, marginTop: 5 },
    noDataText: { fontSize: 16, color: '#777', textAlign: 'center', marginVertical: 10 },
    modalLogo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        resizeMode: 'contain'
    },

    // Estilos para el Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    modalDate: { fontSize: 14, fontStyle: 'italic', marginBottom: 10, color: '#555' },
    languageButton: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#34495e',
        alignItems: 'center',
    },
    languageButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
    modalMessage: { fontSize: 16, textAlign: 'center' },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 5,
        width: '60%',
        alignItems: 'center',
    },
    closeButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});



