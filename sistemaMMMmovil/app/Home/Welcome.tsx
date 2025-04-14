import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

interface BienvenidaData {
  Titulo: string;
  Mensaje: string;
}

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [bienvenida, setBienvenida] = useState<BienvenidaData>({ Titulo: '', Mensaje: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Mensaje en primer plano:', remoteMessage);

      // Puedes mostrar una notificación local si quieres
      if (Platform.OS === 'android') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification?.title || 'Notificación',
            body: remoteMessage.notification?.body || '',
          },
          trigger: null,
        });
      }
    });

    return unsubscribeOnMessage;
  }, []);


  useEffect(() => {
    const initializeData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Bienvenida'));
        querySnapshot.forEach((doc) => {
          setBienvenida(doc.data() as BienvenidaData);
        });
      } catch (error) {
        console.error('Error inicializando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();

    const getPushToken = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert('Permiso para notificaciones fue denegado');
        return;
      }

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Aquí puedes guardar el token en Firestore si deseas
      }
    };

    const setupNotifications = async () => {
      // Pedir permisos
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }

      // Configurar canal para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default Channel',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      // Escuchar notificaciones entrantes
      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida:', notification);
      });

      return () => subscription.remove();
    };

    getPushToken();
    setupNotifications();


  }, []);

  const handleContinue = () => {
    navigation.navigate('Home/HomeScreen' as never);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1B4F72" />
        ) : (
          <>
            <Text style={styles.title}>{bienvenida.Titulo}</Text>
            <Text style={styles.message}>{bienvenida.Mensaje}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#1B4F72',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
