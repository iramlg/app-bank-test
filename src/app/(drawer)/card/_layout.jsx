import React from 'react';
import { Button } from 'react-native';
import { Stack } from "expo-router";
import { Link, useNavigation, useRouter } from "expo-router";
import {HeaderBackButton} from '@react-navigation/elements';

const Layout = () => {
    const navigation = useNavigation();
    const router = useRouter();

    return (
        <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: '#FFF' } }}> 
            <Stack.Screen name="card" options={{
                title: "Cartões",
                headerLeft: (props) => (
                  <HeaderBackButton
                    {...props}
                    onPress={() => navigation.goBack()}
                    labelVisible={false}
                  />
                ),
            }} />
            <Stack.Screen name="card-landing" options={{
                title: "Contrato de cartão Bnk",
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="card-sign" options={{
                title: "Contrato de cartão Bnk",
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="card-address" options={{
                title: "Contrato de cartão Bnk",
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="card-unblock" options={{
                title: "Desbloquear cartão",
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="card-digital" options={{
                title: "Cartão Digital",
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="card-lost" options={{
                title: "Bloqueio de cartão",
                headerBackTitleVisible: false,
            }} />
        </Stack>
    )
}

export default Layout;