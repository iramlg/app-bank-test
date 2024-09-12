import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Link, useNavigation, useLocalSearchParams } from "expo-router";
import LottieView from 'lottie-react-native';
import CurrencyInput from 'react-native-currency-input';
import { DashboardContext } from '../../../Context/Main';
import Button from '../../../components/Button';
import barCode from './barCode';

const screenDimensions = Dimensions.get('screen');

export default function PaymentReview() {
  const params = useLocalSearchParams();
  
  const { getBoletoInfo, boletoInfo } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false)
  const { createStaticQR, getPixKeys, loginInfo, pixKeys } = useContext(DashboardContext);
  const [info, setInfo] = useState();
  const [createdQrCode, setCreatedQrCode] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    console.log(params)
    getBoletoInfo({
      type: 1,
      barCode: params
    })
  }, [])

  useEffect(() => {
    if (boletoInfo.data) {
      setInfo([
        {
          label: 'Banco',
          value: boletoInfo.data.assignor
        },
        {
          label: 'Data de Vencimento',
          value: boletoInfo.data.registerData.payDueDate,
        },
        {
          label: 'Data do Pagamento',
          value: boletoInfo.data.dueDate,
        },
        {
          label: 'Valor nominal', 
          value: boletoInfo.data.registerData.originalValue,
        },
        {
          label: 'Encargos', 
          value: boletoInfo.data.registerData.totalWithAdditional,
        },
        {
          label: 'Descontos', 
          value: boletoInfo.data.registerData.totalWithDiscount,
        },
        {
          label: 'Valor total', 
          value: boletoInfo.data.registerData.totalUpdated,
        },
        {
          label: 'Nome do Beneficiário', 
          value: boletoInfo.data.registerData.recipient,
        },
        {
          label: 'Documento do Beneficiário', 
          value: boletoInfo.data.registerData.documentRecipient,
        },
        {
          label: 'Nome do Pagador', 
          value: boletoInfo.data.registerData.payer,
        },
        {
          label: 'Documento do Pagador', 
          value: boletoInfo.data.registerData.documentPayer,
        }
      ])
    }
  }, [boletoInfo.data])

  if (info) {
    // Camera permissions are not granted yet.
    console.log('boletoInfo', boletoInfo.data);
    return (
      <View style={styles.container}>
        <View>
          {info.map((item) => (
            <View style={styles.grid}>
              <Text style={styles.gridLabel}>{item.label}</Text>
              <Text style={styles.gridContent}>{item.value}</Text>
            </View>
          ))}
          <Text style={styles.infoText}>Os pagamentos efetuados após as 22h serão executados com data contábil do próximo dia útil.</Text>
        </View>
        <Button style={styles.button} onPress={() => {}} title="Pagar" />
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
    padding: 14,
  },
  button: {
    // alignSelf: 'baseline'
  }
});
