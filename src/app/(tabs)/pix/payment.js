import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'expo-router';
import { Masks } from 'react-native-mask-input';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as Clipboard from 'expo-clipboard';

export default function PaymentPix() {
  const router = useRouter();
  const [barCode, setBarCode] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe a chave pix para fazer a transferência. (Celular, CPF/CNPJ, e-mail, chave-aleatória)</Text>
      <Text style={styles.title}></Text>
      <Input
        value={barCode}
        // style={styles.input}
        keyboardType = 'numeric'
        placeholder=""
        onChangeText={(val, val2) => setBarCode(val)}
        mask={(text) => {
            if (text.replace(/\D+/g, "").length < 11) {
              return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
            } else if (text.replace(/\D+/g, "").length == 11) {
              if (cpf.isValid(text)) {
                return Masks.BRL_CPF;
              }

              return Masks.BRL_PHONE;
            } else if (text.replace(/\D+/g, "").length <= 14) {
              return Masks.BRL_CNPJ
            } else {
              return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,"-", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/]
            }
        }}
      />
      <Pressable onPress={async() => {
        const text = await Clipboard.getStringAsync();
        setBarCode(text);
      }}>
        <Text style={styles.clipboardCopy}>Colar chave</Text>
      </Pressable>
      
      <Button onPress={async() => {
        router.push({ pathname: 'pix/paymentReview', params: { barCode } })
      }} title="Continuar" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  clipboardCopy: {
    color: '#764abc',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 10,
  }
});
