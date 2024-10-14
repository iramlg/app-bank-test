import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link, useRouter } from 'expo-router';
import MaskInput, { Masks } from 'react-native-mask-input';
import { DashboardContext } from '../../../Context/Main';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const SignUpPersonal = () => {
  const { addAccount, addAccountStatus, getAccountStatus, cleanUp, payload, setPayload } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    "isPoliticallyExposedPerson": false,
    "phoneNumber": "+5511973589171",
    "clientCode": "smart24",
    "email": "smart24@smart.com",
    "motherName": "Fátima Isabel Lopes",
    "fullName": "Flavio Lopes Gourlat",
    "birthDate": "02-05-1986"
  });

  const router = useRouter();

  const updateVal = (key, value) => {
    setPersonalInfo({
        ...personalInfo,
        [key]: value
    })
  }

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
      <Text>Nome</Text>
      <Input
        value={personalInfo.fullName}
        onChangeText={(val) => updateVal('fullName', val)}
      />
      <Text>E-mail</Text>
      <Input
        value={personalInfo.email}
        onChangeText={(val) => updateVal('email', val)}
      />
      <Text>Telefone</Text>
      <Input
        value={personalInfo.phoneNumber}
        mask={Masks.BRL_PHONE}
        keyboardType = 'numeric'
        placeholder="(00) 00000-0000"
        onChangeText={(val) => updateVal('phoneNumber', val)}
      />
      <Text>Data de nascimento</Text>
      <Input
        value={personalInfo.birthDate}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType = 'numeric'
        placeholder="00/00/0000"
        onChangeText={(val) => updateVal('birthDate', val)}
      />
      <Text>Nome da Mãe</Text>
      <Input
        value={personalInfo.motherName}
        onChangeText={(val) => updateVal('motherName', val)}
      />
      <Text>Pessoa politicamente exposta</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={personalInfo.isPoliticallyExposedPerson ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(val) => updateVal('isPoliticallyExposedPerson', !personalInfo.isPoliticallyExposedPerson)}
        value={personalInfo.isPoliticallyExposedPerson}
      />
      <Button style={{ flexAlign: 'flex-end' }} disabled={false} onPress={async () => {
        setPayload({
          ...payload,
          ...personalInfo,
        });

        router.push("./address");
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

export default SignUpPersonal;