import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { DashboardContext } from '../../Context/Main';

export default function Login() {
  const { login, loginInfo } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('35197426837');
  const [pass, setPass] = useState('');
  const [usePass, setUsePass] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setLoginInfo({});
  // }, [])

  useEffect(() => {
    if (loginInfo.success) {
      router.push("/dashboard")
    }
  }, [loginInfo.success])

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <Pressable style={{flex:1 , flexDirection: 'column-reverse',backgroundColor: 'rgba(0,0,0,0.6)'}} onPress={() => {
          setModalVisible(false)
        }}>
          <TouchableWithoutFeedback style={{backgroundColor:'#FFFFFF', paddingBottom: 30}}>
              <View style={styles.containerModal}>
                  <Text>Ocorreu um erro</Text>
                  <Button onPress={async() => {
                      await setModalVisible(false);
                  }} title="Fechar" />
              </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      <Text>Login</Text>
      <Text>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      {usePass ? (<>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={newText => setPass(newText)}
          defaultValue={pass}
        />
        <Button disabled={text.length < 11 || pass.length < 4} onPress={async() => {
          // setModalVisible(true);
          login({doc: text})
        }} title="Logar" />
      </>
      ) : (
        <Button disabled={text.length < 11} onPress={async() => {
          // setModalVisible(true);
          setUsePass(true)
        }} title="Senha" />
      )}
      
      <Button disabled={text.length < 11} onPress={async() => {
        const faceId = await LocalAuthentication.authenticateAsync({});

        if (faceId.success) {
          login({doc: text})
        }
        // login({doc: text})
        // setModalVisible(true);
      }} title="Face Id" />
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
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingLeft: 10,
    height: 40,
  },
  modal: {
    justifyContent: 'flex-end', margin: 0
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
  },
});
