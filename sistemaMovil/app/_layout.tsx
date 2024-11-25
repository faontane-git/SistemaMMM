import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home/HomeScreen";
import LoginScreen from "./IniciarSesion/IniciarSesion";
import QuienesSomosScreen from "./QuienesSomos/QuienesSomosScreen";
import RedesSocialesScreen from "./RedesSociales/RedesSocialesScreen";
import CarnetScreen from "./Carnet/CarnetScreen";
import MenuScreen from "./MenuLogin/MenuScreen";
import WelcomeScreen from "./Home/Welcome";
import DoctrinaScreen from "./Doctrina/DoctrinaScreen";
import AgendaScreen from "./Agenda/AgendaScreen";
import RutasScreen from "./Rutas/RutasScreen";
import ChangePasswordScreen from "./Cambio/CambioC";

// Definir los tipos de las rutas y sus parámetros
export type RootStackParamList = {
  "index": undefined; // No espera parámetros
  "Home/Welcome": undefined; // No espera parámetros
  "IniciarSesion/IniciarSesion": undefined; // No espera parámetros
  "Rutas/RutasScreen": undefined; // No espera parámetros
  "QuienesSomos/QuienesSomosScreen": undefined; // No espera parámetros
  "Doctrina/DoctrinaScreen": undefined; // No espera parámetros
  "Agenda/AgendaScreen": undefined; // No espera parámetros
  "RedesSociales/RedesSocialesScreen": undefined; // No espera parámetros
  "Welcome/WelcomeScreen": { cedula: string }; // Espera el parámetro 'cedula'
  "MenuLogin/MenuScreen": { nombres: string, apellidos: string, cedula: string }; // Espera el parámetro 'cedula'
  "Carnet/CarnetScreen": { cedula: string }; // Espera el parámetro 'cedula'
  "Cambio/CambioC": { cedula: string };  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* Pantalla principal */}
      <Stack.Screen
        name="index"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home/Welcome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Doctrina/DoctrinaScreen'
        component={DoctrinaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Agenda/AgendaScreen'
        component={AgendaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='QuienesSomos/QuienesSomosScreen'
        component={QuienesSomosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RedesSociales/RedesSocialesScreen'
        component={RedesSocialesScreen}
        options={{ headerShown: false }}
      />
      {/* Pantalla de Inicio de Sesión */}
      <Stack.Screen
        name="IniciarSesion/IniciarSesion"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Rutas/RutasScreen'
        component={RutasScreen}
        options={{ headerShown: false }}
      />
      {/* Pantalla de Bienvenida */}
      <Stack.Screen
        name="Welcome/WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de Menú*/}
      <Stack.Screen
        name="MenuLogin/MenuScreen"
        component={MenuScreen}
        options={{
          title: "Carnet",
          headerShown: false,
          animation: "slide_from_right", // Ejemplo de transición
        }}
      />
      {/* Pantalla de Contraseña*/}
      <Stack.Screen
        name="Cambio/CambioC"
        component={ChangePasswordScreen}
        options={{
          title: "Cambio Contraseña",
          headerShown: false,
          animation: "slide_from_right", // Ejemplo de transición
        }}
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
