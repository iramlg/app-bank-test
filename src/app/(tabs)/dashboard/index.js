import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { DashboardContext } from '../../../Context/Main';

export default function Dashboard() {
  const { getInfo, loginInfo, getSaldo, saldo } = useContext(DashboardContext);

  useEffect(() => {
    // getInfo();
    getSaldo();
  }, [])

  console.log('info', loginInfo)
  console.log('saldo', saldo)
  return (
    <View style={styles.container}>
      {loginInfo.data ? (
        <View>
          <Text>{loginInfo.data.fullName}</Text>
          <Text>Saldo: {saldo.data ? saldo.data.amount : null}</Text>
        </View>
      ) : null}
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
