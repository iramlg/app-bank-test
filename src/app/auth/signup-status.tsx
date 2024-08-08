import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';
import { DashboardContext } from '../../Context/Main';

export default function SignUp() {
  const { loginInfo, addAccountStatus, getAccountStatus, cleanUp } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (addAccountStatus.data && addAccountStatus.data.status === 'PENDING_DOCUMENTSCOPY') {
        console.log('documentscopys', addAccountStatus.data?.documentscopys)
       setModalVisible(true);
    }

    if (addAccountStatus.data && addAccountStatus.data.status === 'PROCESSING_DOCUMENTSCOPY') {
      setProcessing(true);
    }
    

    if (addAccountStatus.data && addAccountStatus.data.status === 'RESOURCE_CREATED') {
      setAccountCreated(true);
    }
  }, [addAccountStatus.data])

  useEffect(() => {
    console.log('did mount', loginInfo);
    getAccountStatus(loginInfo.data)

    return () => {
      cleanUp();
    }
  }, [])

  if (addAccountStatus && addAccountStatus.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (processing) {
    return (
      <View style={styles.container}>
        <Text>Seu cadastro ainda está em análise, volte novamente mais tarde</Text>
        <Text></Text>
        <Link href={"/"}>Login</Link>
      </View>
    )
  }

  if (accountCreated) {
    return (
      <View style={styles.container}>
        <Text>Seu cadastro foi concluído, volte a logar para começar a usar sua conta</Text>
        <Text></Text>
        <Link href={"/"}>Login</Link>
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
                <WebView
                    allowsInlineMediaPlayback={true}
                    domStorageEnabled={true}
                    source={{ uri: addAccountStatus.data?.documentscopys[0]?.url || '' }}
                    style={{ flex: 1 }}
                    onNavigationStateChange={(navState) => {
                        if (!navState.loading) {
                            console.log(navState)
                        }
                    }}
                />
                <Button onPress={async() => {
                    getAccountStatus(loginInfo.data)
                    await setModalVisible(false);
                }} title="Fechar" />
            </View>
        </Modal>
        <Text>Verificando o status do seu cadastro</Text>
        <Link onPress={() => {
          cleanUp();
        }} href={"/"}>Voltar</Link>
        <Text></Text>
        <Text></Text>
        <Text></Text>
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
