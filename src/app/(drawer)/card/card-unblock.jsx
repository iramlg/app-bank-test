import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback, Button, TextInput } from 'react-native';
import { useNavigation } from "expo-router";
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native'
import { DashboardContext } from '../../../Context/Main';
import CardItem from '../../../components/CardItem';
import ButtonLink from '../../../components/ButtonLink';

const UnblockCard = () => {
  const { info } = useContext(DashboardContext);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [modalVisible, setModalVisible] = useState(false)
  const inputs = [];

  const navigation = useNavigation();

  const handleOtpChange = (value, index) => {
    console.log(value, index)
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    } else if (!value && index !== 0) {
      inputs[index - 1].focus();
    }

  };
  

  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
      >
          <Pressable style={{flex:1 , flexDirection: 'column-reverse',backgroundColor: 'rgba(0,0,0,0.6)'}} onPress={() => {
              setModalVisible(false)
              navigation.navigate('dashboard');
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
                    navigation.navigate('dashboard');
                }} title="Fechar" />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
      </Modal>
      <View>
        <Text>Enviaremos seu novo cartão ao endereço cadastrado.</Text>
        <View style={styles.boxContainer}>
          {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.box}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({nativeEvent}) => {console.log(nativeEvent)}}
                value={digit}
                ref={(input) => {
                    inputs[index] = input;
                }}
              />
          ))}
        </View>
      </View>
      <View style={styles.center}>
        <Button onPress={() => { setModalVisible(true) }} title="Avançar" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  addressBlock: {
    paddingVertical: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
  },
  center: {
    marginTop: 30,
    alignItems: 'center'
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    padding: 20,
    justifyContent: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    height: 40,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default UnblockCard;