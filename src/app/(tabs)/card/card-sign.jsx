import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native'
import CardItem from '../../../components/CardItem';
import ButtonLink from '../../../components/ButtonLink';

export default function SignCard() {
  const isFocused = useIsFocused()

  if (!isFocused) {
    return null;
  }

  const url = 'https://nupaybusiness.com.br/static/docs/Termos_de_Uso.pdf?id=com.daki&referrer=adjust_reftag%3DcGQL6HWTpHJJl%26utm_source%3DCityads%26utm_campaign%3D28fB';
  return (
    <View style={styles.container}>
      <WebView allowsInlineMediaPlayback={true} domStorageEnabled={true} source={{ uri: url || '' }} style={{ flex: 1 }} />
      <View style={styles.center}>
        <ButtonLink href={"/card/card-address"} title="Concordar" />
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
    marginTop: 10,
    alignItems: 'center'
  }
});
