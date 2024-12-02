import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./Home/Welcome";
import HomeScreen from "./Home/HomeScreen";
import AgendaScreen from "./Agenda/AgendaScreen";
import HorarioCultosScreen from "./Agenda/HorarioCultosScreen"; // Importar la nueva pantalla
import HorarioActividadesScreen from "./Agenda/HorarioActividadesScreen";
import HorarioOtrosScreen from "./Agenda/HorarioOtrosSreen";

export type RootStackParamList = {
  index: undefined; // No espera parámetros
  "Home/Welcome": undefined; // No espera parámetros
  "Agenda/AgendaScreen": undefined; // No espera parámetros
  "Agenda/HorarioCultosScreen": undefined; // No espera parámetros
  "Agenda/HorarioActividadesScreen": undefined; // No espera parámetros
  "Agenda/HorarioOtrosScreen": undefined; // No espera parámetros
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
    </Stack.Navigator>
  );
};

export default MainStack;
