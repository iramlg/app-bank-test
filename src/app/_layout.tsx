import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from "expo-router";
import { DashboardProvider } from '../Context/Main';

const Layout = () => {
    return (
        <DashboardProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShadowVisible: false, headerShown: false, contentStyle: { backgroundColor: '#FFF' } }}> 
                    <Stack.Screen name="index" />
                    <Stack.Screen name="test" options={{ headerShown: false, title: "Test" }} />
                    <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                    {/* <Stack.Screen name="auth" options={{ headerShown: false, title: "Test" }} /> */}
                </Stack>
            </GestureHandlerRootView>
        </DashboardProvider>
    )
}

export default Layout;