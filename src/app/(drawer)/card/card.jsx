import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CardItem from '../../../components/CardItem';

const CardHome = () => {
  const router = useRouter();

  useEffect(() => {
    // If user has no card, send him direct to landing
    // router.push({
    //   pathname: "/card/card-landing",
    //   params: {}
    // });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.squaresContainer} >
        <Link style={styles.square} href={"/card/card-landing"}><CardItem icon="credit-card" title="Primeiro cartão" /></Link>
        <Link style={styles.square} href={"/card/card-unblock"}><CardItem icon="credit-card-off" title="Desbloquear cartão" /></Link>
        <Link style={styles.square} href={"/card/card-digital"}><CardItem icon="credit-card" title="Cartão digital" /></Link>
        <Link style={styles.square} href={"/card/card-lost"}><CardItem icon="credit-card-off" title="Roubo ou perda de cartão" /></Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  squaresContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '33%'
}
});

export default CardHome;