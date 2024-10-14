import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link, useRouter } from 'expo-router';
import MaskInput, { Masks } from 'react-native-mask-input';
import { DashboardContext } from '../../../Context/Main';
import { getCEPAddress } from '../../../Services/Main';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const SignUpAddress = () => {
  const { addAccount, addAccountStatus, getAccountStatus, cleanUp, payload, setPayload } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    "postalCode": "",
    "street": "",
    "number": "",
    "addressComplement": "",
    "neighborhood": "",
    "city": "",
    "state": ""
  });

  const router = useRouter();

  const updateVal = (key, value) => {
    setAddressInfo({
        ...addressInfo,
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
      <Text>CEP</Text>
      <Input
        value={addressInfo.postalCode}
        mask={Masks.ZIP_CODE}
        keyboardType = 'numeric'
        placeholder="00000-000"
        onChangeText={async (val) => {
            updateVal('postalCode', val);

            if (val.length > 8) {
                const cep = await getCEPAddress(val);

                if (cep.ibge) {
                    setAddressInfo({
                        ...addressInfo,
                        postalCode: val,
                        street: cep.logradouro,
                        neighborhood: cep.bairro,
                        city: cep.localidade,
                        state: cep.uf
                    })
                }
            }            
        }}
      />
      <Text>Logradouro</Text>
      <Input
        value={addressInfo.street}
        onChangeText={(val) => updateVal('street', val)}
      />
      <Text>Numero</Text>
      <Input
        value={addressInfo.number}
        keyboardType = 'numeric'
        onChangeText={(val) => updateVal('number', val)}
      />
      <Text>Complemento</Text>
      <Input
        value={addressInfo.addressComplement}
        onChangeText={(val) => updateVal('addressComplement', val)}
      />
      <Text>Bairro</Text>
      <Input
        value={addressInfo.neighborhood}
        onChangeText={(val) => updateVal('neighborhood', val)}
      />
      <Text>Cidade</Text>
      <Input
        value={addressInfo.city}
        onChangeText={(val) => updateVal('city', val)}
      />
      <Text>Estado</Text>
      <Input
        value={addressInfo.state}
        onChangeText={(val) => updateVal('state', val)}
      />
      
      <Button style={{ flexAlign: 'flex-end' }} disabled={false} onPress={async () => {
        setPayload({
          ...payload,
          address: addressInfo,
        });
        // router.push("./address");
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

export default SignUpAddress;