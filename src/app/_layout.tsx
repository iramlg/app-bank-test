import React from 'react';
import { Stack } from "expo-router";
import { DashboardProvider } from '../Context/Main';

export default function Layout() {
    return (
        <DashboardProvider>
            <Stack screenOptions={{ headerShadowVisible: false, headerShown: false, contentStyle: { backgroundColor: '#FFF' } }}> 
                <Stack.Screen name="index" />
                <Stack.Screen name="test"  options={{ headerShown: false, title: "Test" }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="auth/login"  options={{ headerShown: false, title: "Test" }} />
            </Stack>
        </DashboardProvider>
    )
}
//