import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import styled from 'styled-components/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DashboardContext } from '../../../Context/Main';
import ButtonLink from '../../../components/ButtonLink';

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
              <KeysList key={key.key}>
                <Text>{key.keyType}</Text>
                <Text>{key.key}</Text>
                <MaterialIcons name="content-copy" size={20} color="black" />
              </KeysList>
            </Pressable>
          )) : (
            <ButtonLink href={"pix/newKey"} title="Cadastrar primeira chave" />
          )}
          <ButtonLink href={"pix/newKey"} title="Cadastrar nova chave" />
        </View>
      ) : (<ButtonLink href={"pix/newKey"} title="Cadastrar primeira chave" />)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const KeysList = styled.View`
    padding: 6px;
    background-color: #F9F9F9;
    margin-bottom: 12px;
    border-top: 0;
    border: 0 solid #DDD;
    borderBottomWidth: 1;
`;