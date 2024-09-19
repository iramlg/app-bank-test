import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Link, useNavigation, useLocalSearchParams } from "expo-router";
import LottieView from 'lottie-react-native';
import CurrencyInput from 'react-native-currency-input';
import { DashboardContext } from '../../../Context/Main';
import Button from '../../../components/Button';
import { formatDict } from '../../../utils/converter';

const screenDimensions = Dimensions.get('screen');

export default function PixPaymentReview() {
  const params = useLocalSearchParams();
  
  const { getBoletoInfo, boletoInfo, getPixDict, pixDict } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false)
  const [text, setText] = useState(0);
  const [info, setInfo] = useState();
  const [createdQrCode, setCreatedQrCode] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    console.log(params);
    getPixDict(params)
  }, [])
  console.log(pixDict)

  if (pixDict && pixDict.data) {
    // Camera permissions are not granted yet.
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
                      navigation.navigate('payment');
                  }} title="Fechar" />
                </View>
            </TouchableWithoutFeedback>
            </Pressable>
        </Modal>
        <View>
          <Text style={[styles.infoText, styles.infoTitle]}>Quanto você vai enviar?</Text>
          <Text style={[styles.infoText, styles.infoOwner]}>Para {pixDict.data.owner.name}</Text>
          <Text style={styles.infoText}>{pixDict.data.owner.type === 'LEGAL_PERSON' ? 'CNPJ' : 'CPF'}: {formatDict(pixDict.data.owner.taxIdNumber, pixDict.data.owner.type === 'LEGAL_PERSON' ? 'cnpj' : 'cpf')}</Text>
          <Text style={styles.infoText}>Chave {pixDict.data.key}</Text>
          <CurrencyInput
            style={styles.input}
            value={text}
            onChangeValue={setText}
            prefix="R$  "
            delimiter="."
            separator=","
            precision={2}
          />
        </View>
        <Button style={styles.button} onPress={() => {setModalVisible(true)}} title="Enviar" />
      </View>
    );
  }

  return (
    <View style={styles.containerLoading}>
      <LottieView
        autoPlay
        loop={true}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../../../../assets/loading.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  gridLabel: {
    color: '#999',
    flex: 0.55,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  gridContent: {
    textAlign: 'right',
    flex: 0.40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoText: {
    paddingVertical: 8,
  },
  infoTitle: {
    fontSize: 22,
  },
  infoOwner: {
    fontSize: 18,
  },
  button: {
    // alignSelf: 'baseline'
  },
  input: {
    marginVertical: 40,
    borderColor: '#999',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 20,
    justifyContent: 'center',
  },
});
