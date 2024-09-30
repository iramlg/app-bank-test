import React from 'react';
import { Button } from 'react-native';
import { Stack } from "expo-router";
import { Link, useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: '#FFF' } }}> 
            <Stack.Screen name="card" options={{
                title: "Cartões",
                headerLeft: () => (
                  <Button
                    onPress={() => {
                      navigation.navigate('dashboard');
                    } }
                    title="<"
                    color="#000"
                  />
                ),
            }} />
            <Stack.Screen name="card-landing" options={{
                title: "Contrato de cartão Bnk",
                headerLeft: (route) => (
                    <Button
                      onPress={() => {
                        console.log(navigation)
                        if (route.canGoBack) {
                          navigation.replace('card');
                        } else {
                          navigation.navigate('dashboard');
                        }
                      } }
                      title="<"
                      color="#000"
                    />
                  ),
            }} />
            <Stack.Screen name="card-sign" options={{
                title: "Contrato de cartão Bnk",
                headerLeft: () => (
                    <Button
                      onPress={() => {
                        navigation.navigate('dashboard');
                      }}
                      title="<"
                      color="#000"
                    />
                  ),
            }} />
            <Stack.Screen name="card-address" options={{
                title: "Contrato de cartão Bnk",
                headerLeft: () => (
                    <Button
                      onPress={() => {
                        navigation.navigate('dashboard');
                      }}
                      title="<"
                      color="#000"
                    />
                  ),
            }} />
            <Stack.Screen name="card-unblock" options={{
                title: "Desbloquear cartão",
                headerLeft: () => (
                    <Button
                      onPress={() => {
                        navigation.navigate('dashboard');
                      }}
                      title="<"
                      color="#000"
                    />
                  ),
            }} />
        </Stack>
    )
}
