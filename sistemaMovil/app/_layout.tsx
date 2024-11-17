import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home/HomeScreen";
import LoginScreen from "./IniciarSesion/IniciarSesion";
import WelcomeScreen from "./Welcome/WelcomeScreen";
import CarnetScreen from "./Carnet/CarnetScreen";

// Definir los tipos de las rutas y sus parámetros
export type RootStackParamList = {
  "index": undefined; // No espera parámetros
  "IniciarSesion/IniciarSesion": undefined; // No espera parámetros
  "Welcome/WelcomeScreen": { cedula: string }; // Espera el parámetro 'cedula'
  "Carnet/CarnetScreen": { cedula: string }; // Espera el parámetro 'cedula'
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* Pantalla principal */}
      <Stack.Screen
        name="index"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de Inicio de Sesión */}
      <Stack.Screen
        name="IniciarSesion/IniciarSesion"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de Bienvenida */}
      <Stack.Screen
        name="Welcome/WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de Carnet */}
      <Stack.Screen
        name="Carnet/CarnetScreen"
        component={CarnetScreen}
        options={{
          title: "Carnet",
          headerShown: false,
          animation: "slide_from_right", // Ejemplo de transición
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
