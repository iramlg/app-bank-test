import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link, useRouter } from 'expo-router';
import MaskInput, { Masks } from 'react-native-mask-input';
import { DashboardContext } from '../../../Context/Main';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function SignUp() {
  const { addAccount, addAccountStatus, getAccountStatus, cleanUp, payload, setPayload } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [documentNumber, seDocumentNumber] = useState('');
  const router = useRouter();

  useEffect( () => {
    // getAccountStatus() //
    return () => {
      cleanUp();
    }
  }, [] );

  if (addAccountStatus && addAccountStatus.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>CPF</Text>
      <Input
        value={documentNumber}
        keyboardType = 'numeric'
        placeholder="000.000.000-00"
        onChangeText={seDocumentNumber}
        mask={Masks.BRL_CPF}
      />
      <Button style={{ flexAlign: 'flex-end' }} disabled={documentNumber.length < 14} onPress={async () => {
        setPayload({
          ...payload,
          documentNumber,
        });

        router.push("./personal");
      }} title="Continuar" />
      <Link href={"/"}>Voltar</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
