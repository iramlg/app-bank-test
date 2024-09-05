import React from 'react';
import { Button } from 'react-native';
import { Stack } from "expo-router";
import { Link, useNavigation, useRouter } from "expo-router";

export default function Layout() {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: '#FFF' } }}> 
            <Stack.Screen name="payment" options={{
                title: "Código de barras",
                headerLeft: () => (
                    <Button
                      onPress={() => {
                        navigation.navigate('dashboard');
                      } }
                      title="<"
                      color="#000"
                    />
                ),
                headerRight: () => (
                  <Button
                    onPress={() => {
                      navigation.navigate('dashboard');
                    } }
                    title="<"
                    color="#000"
                  />
              ),
            }} />
            {/* <Stack.Screen name="myKeys" options={{ title: "Minhas Chaves" }} />
            <Stack.Screen name="newKey" options={{ title: "Nova Chave" }} />
            <Stack.Screen name="qrCode" options={{ title: "QR Code" }} /> */}
        </Stack>
    )
}
