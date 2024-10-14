import React from 'react';
import { Button, Pressable } from 'react-native';
import { Stack } from "expo-router";
import { Link, useNavigation, useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Layout = () => {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: '#FFF' } }}>
            <Stack.Screen name="paymentHome" options={{
                title: "Código de barras",
                headerLeft: () => (
                  <Link href={"/dashboard"}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                  </Link>
                ),
                headerRight: () => (
                  <Link href={"/payment/barCode"}>
                    <MaterialCommunityIcons name="camera" size={24} color="black" />
                  </Link>
              ),
            }} />
            <Stack.Screen name="barCode" options={{
                headerShown: false,
                title: 'Código de barras',
                orientation: 'landscape'
            }} />
            <Stack.Screen name="paymentReview" options={{
              headerLeft: () => (
                <Link href={"/payment/paymentHome"}>
                  <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                </Link>
              ),
                title: 'Pagamentos',
            }} /> 
        </Stack>
    )
}

export default Layout;