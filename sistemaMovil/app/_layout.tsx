import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Home/HomeScreen";
import QuienesSomosScreen from "./QuienesSomos/QuienesSomosScreen";
import RedesSocialesScreen from "./RedesSociales/RedesSocialesScreen";

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
    </Stack.Navigator>
  );
};

export default MainStack;
