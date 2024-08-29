import React from 'react';
import { Stack } from "expo-router";
import { DashboardProvider } from '../../../Context/Main';

export default function Layout() {
    return (
        <DashboardProvider>
            <Stack screenOptions={{ headerShadowVisible: false, headerShown: false, contentStyle: { backgroundColor: '#FFF' } }}> 
                <Stack.Screen name="index" />
                <Stack.Screen name="personal" options={{ headerShown: false, title: "" }} />
                <Stack.Screen name="address" options={{ headerShown: false, title: "" }} />
            </Stack>
        </DashboardProvider>
    )
}
//