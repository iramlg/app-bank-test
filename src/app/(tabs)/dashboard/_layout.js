import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Tabs, TabsItem } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const icon = options.icon || 'home';
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, paddingTop: 10, paddingBottom: 15 }}
            >
                <MaterialCommunityIcons name={icon} size={24} color="black" />
                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                    {label}
                </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.openDrawer()}
            onLongPress={() => navigation.openDrawer()}
            style={{ flex: 1, paddingTop: 10, paddingBottom: 15 }}
        >
            <MaterialCommunityIcons name="menu" size={24} color="black" />
            <Text style={{ color: '#222' }}>
                Ajustes
            </Text>
        </TouchableOpacity>
      </View>
    );
}

export default function Layout(props) {
    return (
        <Tabs tabBar={props => <MyTabBar {...props} />} options={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false, icon: 'home', tabBarIcon: () => {
                return <MaterialCommunityIcons name="home" size={24} color="black" />
            } }} />
            <Tabs.Screen name="card" options={{ title: "Cartão", headerShown: false,icon: 'credit-card-outline', tabBarIcon: () => {
                return <MaterialCommunityIcons name="credit-card-outline" size={24} color="black" />
            } }} />
            <Tabs.Screen name="payments" options={{ title: "Pagamentos", headerShown: false, icon: 'wallet', tabBarIcon: () => {
                return <MaterialCommunityIcons name="wallet" size={24} color="black" />
            } }} />
        </Tabs>
    )
}