import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Home/HomeScreen";
import QuienesSomosScreen from "./QuienesSomos/QuienesSomosScreen";
import RedesSocialesScreen from "./RedesSociales/RedesSocialesScreen";
import RutasScreen from "./Rutas/RutasScreen";
import AgendaScreen from "./Agenda/AgendaScreen";
import DoctrinaScreen from "./Doctrina/DoctrinaScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='index'
        component={HomeScreen}
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
      <Stack.Screen
        name='Rutas/RutasScreen'
        component={RutasScreen}
        options={{ headerShown: false }}
      />    
      <Stack.Screen
        name='Agenda/AgendaScreen'
        component={AgendaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Doctrina/DoctrinaScreen'
        component={DoctrinaScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
