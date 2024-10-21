import React from 'react';
import { Button } from 'react-native';
import { Stack } from "expo-router";
import { Link, useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Layout = () => {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: '#FFF' } }}> 
            <Stack.Screen name="pix" options={{
                title: "Pix",
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
            <Stack.Screen name="myKeys" options={{ title: "Minhas Chaves", headerBackTitleVisible: false, }} />
            <Stack.Screen name="newKey" options={{ title: "Nova Chave", headerBackTitleVisible: false, }} />
            <Stack.Screen name="qrCode" options={{ title: "QR Code", headerBackTitleVisible: false, }} />
            <Stack.Screen name="payment" options={{
                title: "Pix",
                headerLeft: () => (
                  <Link href={"/dashboard"}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                  </Link>
                ),
            }} />
            <Stack.Screen name="pixPaymentReview" options={{ title: "Pix", headerBackTitleVisible: false, }} />
        </Stack>
    )
}

export default Layout;