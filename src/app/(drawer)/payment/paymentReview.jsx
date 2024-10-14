import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Link, useNavigation, useLocalSearchParams } from "expo-router";
import LottieView from 'lottie-react-native';
import { DashboardContext } from '../../../Context/Main';
import Button from '../../../components/Button';

const PaymentReview = () => {
  const params = useLocalSearchParams();
  
  const { getBoletoInfo, boletoInfo } = useContext(DashboardContext);
  const [modalVisible, setModalVisible] = useState(false)
  const { createStaticQR, getPixKeys, loginInfo, pixKeys } = useContext(DashboardContext);
  const [info, setInfo] = useState();
  const [createdQrCode, setCreatedQrCode] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
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
          {info.map((item) => (
            <View style={styles.grid}>
              <Text style={styles.gridLabel}>{item.label}</Text>
              <Text style={styles.gridContent}>{item.value}</Text>
            </View>
          ))}
          <Text style={styles.infoText}>Os pagamentos efetuados após as 22h serão executados com data contábil do próximo dia útil.</Text>
        </View>
        <Button style={styles.button} onPress={() => {setModalVisible(true)}} title="Pagar" />
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
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 20,
    justifyContent: 'center',
  },
});

export default PaymentReview;