import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DashboardProvider } from '../../Context/Main';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DashboardProvider>
        <Drawer>
          <Drawer.Screen
            name="dashboard" // This is the name of the page and must match the url from root
            options={{
                headerShown: false,
                title: 'Home',
                drawerPosition: 'right'
            }}
          />
          <Drawer.Screen
            name="logout" // This is the name of the page and must match the url from root
            options={{
                headerShown: false,
                title: 'Sair',
                drawerPosition: 'right'
            }}
          />
        </Drawer>
      </DashboardProvider>
    </GestureHandlerRootView>
  );
}

// import { Stack } from "expo-router";
// import { DashboardProvider } from '../../Context/Main';

// export default function Layout() {
//     return (
//         <DashboardProvider>
//             <Stack>
//                 <Stack.Screen name="dashboard" options={{ headerShown: false }} />
//             </Stack>
//         </DashboardProvider>
//     )
// }