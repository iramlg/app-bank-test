import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';
import MaskInput, { Masks } from 'react-native-mask-input';
import { DashboardContext } from '../../Context/Main';

const SignUp = () => {
  const { addAccount, addAccountStatus, getAccountStatus, cleanUp, createLocalProposal } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [payload, setPayload] = useState({
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
    "clientCode": "smart24",
    "documentNumber": "48926885097",
    "email": "smart24@smart.com",
    "motherName": "Fátima Isabel Lopes",
    "fullName": "Flavio Lopes Gourlat",
    "birthDate": "02-05-1986"
  });
  const keys = Object.keys(payload);
  const addressKeys = Object.keys(payload.address);

  useEffect(() => {
    // if (addAccountStatus.data && addAccountStatus.data.proposalId) {
    //   console.log(addAccountStatus.data.proposalId);
    //   createLocalProposal(addAccountStatus.data);
    // }
    if (addAccountStatus.data && addAccountStatus.data.status === 'PENDING_DOCUMENTSCOPY') {
      setModalVisible(true);
    }
  }, [addAccountStatus.data])

  useEffect( () => {
    // getAccountStatus() //
    return () => {
      cleanUp();
    }
  }, [] );

  console.log('addAccountStatus', addAccountStatus)
  if (addAccountStatus && addAccountStatus.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
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
            <WebView allowsInlineMediaPlayback={true} domStorageEnabled={true} source={{ uri: addAccountStatus.data?.documentscopys?.url || '' }} style={{ flex: 1 }} />
            <Button onPress={async() => {
              await setModalVisible(false);
            }} title="Fechar" />
        </View>
      </Modal>
      {addAccountStatus.data ? (
        <View style={styles.container}>
          <Text>Tudo certo por agora</Text>
          <Text>O seu cadastro está em análise, entraremos em contato em até 2 dias úteis.</Text>
          <Text></Text>
          <Link href={"/"}>Voltar</Link>
        </View>
      ) : (
        <>
          <MaskInput
            value={payload.address.postalCode}
            // style={styles.input}
            keyboardType = 'numeric'
            placeholder="xxx.xxx.xxx-xx"
            // onChangeText={setPayload}
            mask={Masks.ZIP_CODE}
          />
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
        </>
      )}
      {addAccountStatus.data ? (
        <></>
      ) : (
        <Button onPress={async() => {
          await addAccount(payload);
        }} title="Cadastrar" />
      )}
      <Link href={"/"}>Voltar</Link>
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

export default SignUp;