import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./Home/Welcome";
import HomeScreen from "./Home/HomeScreen";
import AgendaScreen from "./Agenda/AgendaScreen";
import HorarioCultosScreen from "./Agenda/HorarioCultosScreen"; // Importar la nueva pantalla
import HorarioActividadesScreen from "./Agenda/HorarioActividadesScreen";
import HorarioOtrosScreen from "./Agenda/HorarioOtrosSreen";
import LoginScreen from "./IniciarSesion/IniciarSesion";
import ChangePasswordScreen from "./Cambio/CambioC";
import CarnetScreen from "./Carnet/CarnetScreen";
import MenuScreen from "./MenuLogin/MenuScreen";
import DoctrinaScreen from "./Doctrina/DoctrinaScreen";
import QuienesSomosScreen from "./QuienesSomos/QuienesSomosScreen";
import RedesSocialesScreen from "./RedesSociales/RedesSocialesScreen";

export type RootStackParamList = {
  index: undefined; // No espera parámetros
  "Home/Welcome": undefined; // No espera parámetros
  "Agenda/AgendaScreen": undefined; // No espera parámetros
  "Agenda/HorarioCultosScreen": undefined; // No espera parámetros
  "Agenda/HorarioActividadesScreen": undefined; // No espera parámetros
  "Agenda/HorarioOtrosScreen": undefined; // No espera parámetros
  "IniciarSesion/IniciarSesion": undefined; // No espera parámetros
  "Carnet/CarnetScreen": { cedula: string }; // Espera el parámetro 'cedula'
  "Cambio/CambioC": { cedula: string };
  "QuienesSomos/QuienesSomosScreen": undefined; // No espera parámetros
  "Doctrina/DoctrinaScreen": undefined; // No espera parámetros
  "MenuLogin/MenuScreen": { nombres: string, apellidos: string, cedula: string }; // Espera el parámetro 'cedula'
  "RedesSociales/RedesSocialesScreen": undefined; // No espera parámetros
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
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
        name="Agenda/AgendaScreen"
        component={AgendaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Agenda/HorarioCultosScreen"
        component={HorarioCultosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Agenda/HorarioActividadesScreen"
        component={HorarioActividadesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Agenda/HorarioOtrosScreen"
        component={HorarioOtrosScreen}
        options={{ headerShown: false }}
      />
      {/* Pantalla de Inicio de Sesión */}
      <Stack.Screen
        name="IniciarSesion/IniciarSesion"
        component={LoginScreen}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name='RedesSociales/RedesSocialesScreen'
        component={RedesSocialesScreen}
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
      <Stack.Screen
        name='Doctrina/DoctrinaScreen'
        component={DoctrinaScreen}
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
      <Stack.Screen
        name='QuienesSomos/QuienesSomosScreen'
        component={QuienesSomosScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
};

export default MainStack;
