import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { DashboardContext } from '../../Context/Main';
import Shortcuts from '../../components/Shortcuts';
import Statement from '../../components/Statement';

const Dashboard = () => {
  const { info, getInfo, loginInfo, getSaldo, saldo } = useContext(DashboardContext);
    const navigation = useNavigation();
  useEffect(() => {
    getInfo();
    getSaldo();
  }, [])

  // console.log(info)

  return (
    <View style={styles.container}>
      {loginInfo.data ? (
        <Pressable onPress={() => navigation.openDrawer()}>
            <View style={styles.containerHeader}>
                <Text style={styles.name}>{loginInfo.data.fullName}</Text>
                <Text style={styles.ammountTitle}>Saldo disponível h</Text>
                <Text style={styles.ammount}>R$ {saldo.data ? saldo.data.amount : null}</Text>
            </View>
        </Pressable>
      ) : null}
      <Shortcuts />
      <Statement />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerHeader: {
    backgroundColor: '#b4b3e3',
    width: '90%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  name: {
    fontSize: 18,
  },
  ammount: {
    fontSize: 16,
    fontWeight: '700'
  },
});

export default Dashboard;