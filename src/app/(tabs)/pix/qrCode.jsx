import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Modal, Pressable, TouchableWithoutFeedback, Image } from 'react-native';
import { Link, useNavigation, useRouter } from "expo-router";
import { DashboardContext } from '../../../Context/Main';

export default function qrCode() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { createStaticQR, getPixKeys, loginInfo, pixKeys } = useContext(DashboardContext);
  const [text, setText] = useState('');
  const [createdQrCode, setCreatedQrCode] = useState({});

  useEffect(() => {
    if (!pixKeys.data) {
        getPixKeys();
    }
  }, [])
  console.log(pixKeys.data)
  if (!pixKeys.data) {
    return (
        <View><Text>Carregando</Text></View>
    )
  }

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
                    <Image
                        style={{ width: 200, height: 200, marginHorizontal: 20 }}
                        source={{
                        uri: `data:image/png;base64,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${createdQrCode.base64image}`,
                        }}
                    />
                    <Text>{createdQrCode.emvqrcps}</Text>
                    <Button onPress={async() => {
                        await setModalVisible(false);
                    }} title="Fechar" />
                </View>
            </TouchableWithoutFeedback>
            </Pressable>
        </Modal>
        <Text>Chave a usar para recebimento</Text>
        <Text>{pixKeys.data.body && pixKeys.data.body.listKeys[0].key}</Text>
        <Text>Valor</Text>
        <TextInput
            style={styles.input}
            placeholder="0"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
        />
        <Button
          title="Gerar"
          onPress={async () => {
            const data = {
                key: pixKeys.data.body.listKeys[0].key,
                amount: parseInt(text),
                merchant: {
                    merchantCategoryCode: "5651",
                    postalCode: loginInfo.data.address.postalCode,
                    city: loginInfo.data.address.city.replace(' ', ''),
                    name: loginInfo.data.fullName.split(' ')[0]
                },
            }

            console.log(data);

            // if (selectedType !== 'EVP') {
            //   data.key = text;
            // }
            
            const staticQr = await createStaticQR(data);

            // if (newKey.success) {
            // //   getPixKeys();
            //   router.back();
            // }
            console.log(staticQr)
            setCreatedQrCode(staticQr.data);
            setModalVisible(true);
          }}
        />
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
  },
});
