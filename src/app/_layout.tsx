import React from 'react';
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShadowVisible: false, headerShown: false, contentStyle: { backgroundColor: '#FFF' } }}> 
            <Stack.Screen name="index" />
            <Stack.Screen name="test"  options={{ headerShown: false, title: "Test" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login"  options={{ headerShown: false, title: "Test" }} />


        </Stack>
    )
}
//