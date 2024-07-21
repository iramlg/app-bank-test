import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
    return (
        <Tabs options={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false, tabBarIcon: () => {
                return <MaterialCommunityIcons name="home" size={24} color="black" />
            } }} />
            <Tabs.Screen name="card" options={{ title: "Cartão", headerShown: false, tabBarIcon: () => {
                return <MaterialCommunityIcons name="credit-card-outline" size={24} color="black" />
            } }} />
            <Tabs.Screen name="payments" options={{ title: "Pagamentos", headerShown: false, tabBarIcon: () => {
                return <MaterialCommunityIcons name="wallet" size={24} color="black" />
            } }} />
            <Tabs.Screen name="menu" options={{ title: "Menu", headerShown: false, tabBarIcon: () => {
                return <MaterialCommunityIcons name="menu" size={24} color="black" />
            } }} />
        </Tabs>
    )
}