import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';
import { DashboardContext } from '../../Context/Main';

export default function Login() {
  const { addAccount, addAccountStatus } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const payload = {
    "address": {
      "postalCode": "03364020",
      "street": "Rua Caparao",
      "number": "107",
      "addressComplement": "apto 22",
      "neighborhood": "Vila Formosa",
      "city": "São Paulo",
      "state": "SP"
    },
    "isPoliticallyExposedPerson": false,
    "onboardingType": "BAAS",
    "phoneNumber": "+5511973589171",
    "clientCode": "smart03",
    "documentNumber": "35197426837",
    "email": "smart03@smart.com",
    "motherName": "Fátima Isabel Garcia",
    "fullName": "Iram Lopes Garcia",
    "birthDate": "02-05-1986"
  }
  const keys = Object.keys(payload);
  const addressKeys = Object.keys(payload.address);

  console.log('addAccountStatus', addAccountStatus)
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.containerModal}>
            <WebView allowsInlineMediaPlayback={true} domStorageEnabled={true} source={{ uri: 'https://celcoin.beta.cadastro.io/fbf6e10fe812bf21c2d43f6bc72b9e6d' }} style={{ flex: 1 }} />
            <Button onPress={async() => {
              await setModalVisible(false);
            }} title="Fechar" />
        </View>
      </Modal>
      <Text>Login</Text>
      {keys.map((item) => {
        if (item === 'address') {
          return (
            <View>
              {addressKeys.map((aItem) => {
                return (
                  <Text>{aItem}: {payload.address[aItem]}</Text>
                )
              })}
            </View>
          )
        }
        return (
          <Text>{item}: {payload[item]}</Text>
        )
      })}
      <Button onPress={async() => {
        await addAccount(payload);
      }} title="Cadastrar" />
      <Button onPress={async() => {
        await setModalVisible(true);
      }} title="KYC" />
      
      <Link href={"/"}>Home</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  containerModal: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
  },
});
