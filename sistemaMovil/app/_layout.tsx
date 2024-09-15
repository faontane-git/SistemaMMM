import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import InicioScreen from '.';

// Evitar que la splash screen se esconda automáticamente.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Detectar si el dispositivo usa el tema oscuro o claro
  const colorScheme = useColorScheme();

  // Cargar fuentes personalizadas
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Ocultar splash screen cuando las fuentes estén cargadas
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Si las fuentes no están cargadas, no renderizar nada.
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index" // Nombre de la ruta
          options={{ headerShown: false }} // Sin encabezado
        />
      </Stack>
    </ThemeProvider>
  );
}
