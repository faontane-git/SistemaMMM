import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './_layout';

export default function App() {

    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}
