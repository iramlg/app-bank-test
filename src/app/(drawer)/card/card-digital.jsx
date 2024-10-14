import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Button from '../../../components/Button';
import Visa from '../../../../assets/visa.svg';
import Master from '../../../../assets/master.svg';

const cards = [{
  name: 'Unique',
  type: 'Multiplo',
  brand: 'Visa',
  final: '1369',
}, {
  name: 'Black SB',
  type: 'Multiplo',
  brand: 'Master',
  final: '9631',
}, {
  name: 'Gold VIP',
  type: 'Crédito',
  brand: 'Master',
  final: '5446',
}];

const CardDigital = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
      >
          <Pressable style={{flex:1 , flexDirection: 'column-reverse',backgroundColor: 'rgba(0,0,0,0.6)'}} onPress={() => {
              setModalVisible(false);
          }}>
            <TouchableWithoutFeedback style={{backgroundColor:'#FFFFFF', paddingBottom: 30}}>
              <View style={styles.containerModal}>
                <Master width={200} height={180} />
                <View>
                  <Text style={styles.cardNumber}>1234 1234 1234 1234</Text>
                  <View style={styles.box}>
                    <View style={{marginRight: 66}}>
                      <Text style={styles.boxTitle}>Data Validade</Text>
                      <Text>12/28</Text>
                    </View>
                    <View>
                      <Text style={styles.boxTitle}>CCV</Text>
                      <Text>987</Text>
                    </View>
                  </View>
                  
                </View>
                <Button style={{ marginTop: 100 }} onPress={async() => {
                  Clipboard.setStringAsync('1234 1234 1234 1234')
                }} title="Copiar número do Cartão" />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
      </Modal>
      <View style={styles.content}>
        {cards.map((card) => (
          <Pressable style={styles.boxContainer} key={card.final} onPress={() => {setModalVisible(true)}}>
            {card.brand === 'Visa' ? <Visa width={120} height={50} /> : <Master width={120} height={50} />}
            <View>
              <Text>{card.name}</Text>
              <Text>{card.type} | {card.brand} | {card.final}</Text>
            </View>
          </Pressable>
        ))}
      </View>
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
    // justifyContent: 'center',
    // flexDirection: 'row',
    flex: .7,
    alignItems: 'center',

  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  boxTitle: {
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 20,
    paddingVertical: 20,
  },
});

export default CardDigital;