import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { DashboardContext } from '../../../Context/Main';

export default function MyKeys() {
  const { pixKeys, setPixKeys, getPixKeys } = useContext(DashboardContext);

  useEffect(() => {
    getPixKeys()
  }, [])

  if (pixKeys.data && pixKeys.data.body) {
    console.log('pixKeys', pixKeys.data.body.listKeys)
  }

  return (
    <View style={styles.container}>
      {pixKeys.data && pixKeys.data.body && pixKeys.data.body.listKeys ? (
        <View>
          {pixKeys.data.body.listKeys.length ? pixKeys.data.body.listKeys.map((key, i) => (
            <Pressable onPress={() => Clipboard.setStringAsync(key.key)}>
              <View key={key.key}>
                <Text>{key.keyType}</Text>
                <Text>{key.key}</Text>
              </View>
            </Pressable>
          )) : (
            <Link href={"pix/newKey"}>Cadastrar primeira chave</Link>
          )}
          <Link href={"pix/newKey"}>Cadastrar nova chave</Link>
        </View>
      ) : (<Link href={"pix/newKey"}>Cadastrar primeira chave</Link>)}
      
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
