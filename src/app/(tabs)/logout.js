import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useNavigation, useRouter } from "expo-router";
import { DashboardContext } from '../../Context/Main';

export default function Logout() {
  const { setLoginInfo } = useContext(DashboardContext);
  const router = useRouter();
  
  useEffect(() => {
    setLoginInfo({})

    setTimeout(() => {
      router.push("/")
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
