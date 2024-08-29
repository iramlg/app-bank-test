import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import ButtonLink from './../components/ButtonLink';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 700, fontSize: 16}}>Bank app test</Text>
      <Text></Text>
      <ButtonLink href={"/auth/login"} title="Login" />
      <Text></Text>
      <ButtonLink href={"/auth/signup"} title="Cadastrar" />
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
