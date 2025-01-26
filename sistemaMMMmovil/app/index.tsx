import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
 import { View, Text, StyleSheet } from 'react-native';
import MainStack from './_layout';

export default function App() {


    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}

