import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { DashboardContext } from '../../../Context/Main';

export default function MyKeys() {
  const { pixKeys, setPixKeys, getPixKeys } = useContext(DashboardContext);

  useEffect(() => {
    getPixKeys()
  }, [])

  console.log('pixKeys', pixKeys)
  return (
    <View style={styles.container}>
      {pixKeys.data ? (
        <View>
          {pixKeys.data.length ? pixKeys.data.map((key) => (
            <Text>{key.name}</Text>
          )) : (
            <Link href={"pix/newKey"}>Cadastrar primeira chave</Link>
          )}
        </View>
      ) : (<Text>Minhas Chaves</Text>)}
      
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
