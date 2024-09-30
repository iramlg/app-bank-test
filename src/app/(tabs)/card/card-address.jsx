import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback, Button } from 'react-native';
import { useNavigation } from "expo-router";
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native'
import { DashboardContext } from '../../../Context/Main';
import CardItem from '../../../components/CardItem';
import ButtonLink from '../../../components/ButtonLink';

export default function SignCard() {
  const { info } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation();

  const url = 'https://nupaybusiness.com.br/static/docs/Termos_de_Uso.pdf?id=com.daki&referrer=adjust_reftag%3DcGQL6HWTpHJJl%26utm_source%3DCityads%26utm_campaign%3D28fB';
  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
      >
          <Pressable style={{flex:1 , flexDirection: 'column-reverse',backgroundColor: 'rgba(0,0,0,0.6)'}} onPress={() => {
              setModalVisible(false)
              navigation.navigate('dashboard');
          }}>
            <TouchableWithoutFeedback style={{backgroundColor:'#FFFFFF', paddingBottom: 30}}>
              <View style={styles.containerModal}>
                <LottieView
                  autoPlay
                  loop={false}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  source={require('../../../../assets/check.json')}
                />
                <Button onPress={async() => {
                    await setModalVisible(false);
                    navigation.navigate('dashboard');
                }} title="Fechar" />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
      </Modal>
      <View>
        <Text>Enviaremos seu novo cartão ao endereço cadastrado</Text>
        <View style={styles.addressBlock}>
          <Text style={styles.text}>{info.data.address.street} {info.data.address.number}</Text>
          <Text style={styles.text}>{info.data.address.city} {info.data.address.useState}</Text>
        </View>
      </View>
      <View style={styles.center}>
        <Button onPress={() => { setModalVisible(true) }} title="Avançar" />
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
  addressBlock: {
    paddingVertical: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
  },
  center: {
    marginTop: 30,
    alignItems: 'center'
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 20,
    justifyContent: 'center',
  },
});
