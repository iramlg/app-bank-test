import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native'
import CardItem from '../../../components/CardItem';
import ButtonLink from '../../../components/ButtonLink';

const LandingCard = () => {
  const isFocused = useIsFocused()

  if (!isFocused) {
    return null;
  }

  // https://nupaybusiness.com.br/static/docs/Termos_de_Uso.pdf?id=com.daki&referrer=adjust_reftag%3DcGQL6HWTpHJJl%26utm_source%3DCityads%26utm_campaign%3D28fB
  return (
    <View style={styles.container}>
      <Text>Peça agora mesmo seu cartão Banks</Text>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 300,
          height: 300,
        }}
        source={require('../../../../assets/card.json')}
      />
      <View style={styles.center}>
        <ButtonLink href={"/card/card-sign"} title="Pedir agora" />
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
  center: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default LandingCard;