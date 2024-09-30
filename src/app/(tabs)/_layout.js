import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import styled from 'styled-components/native';
import { Link, useNavigation, useRouter } from "expo-router";

const Container = styled.SafeAreaView`
flex: 1;
flex-direction: column;
justify-content: flex-start;
align-self: stretch;
`;

export default function Layout() {
  const navigation = useNavigation();

  return (
    <Container>
      <GestureHandlerRootView style={{ flex: 1 }}>
      
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
            name="pix"
            options={{
              headerShown: false,
                title: 'Pix',
                drawerPosition: 'right'
            }}
          />
          <Drawer.Screen
            name="card"
            options={{
              headerShown: false,
                title: 'Cartões',
                drawerPosition: 'right'
            }}
          />
          <Drawer.Screen
            name="payment"
            options={{
              headerShown: false,
              title: 'Código de barras',
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
      
      </GestureHandlerRootView>
    </Container>
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