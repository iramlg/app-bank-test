import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'expo-router';
import { Masks } from 'react-native-mask-input';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as Clipboard from 'expo-clipboard';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function PaymentPix() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [type, setType] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Informe a chave pix para fazer a transferência. (Celular, CPF/CNPJ, e-mail, chave-aleatória)</Text>
        <Text style={styles.title}></Text>
        <Input
          value={code}
          // style={styles.input}
          keyboardType = 'numeric'
          placeholder=""
          onChangeText={(val, val2) => setCode(val)}
          mask={(text) => {
              if (text.replace(/\D+/g, "").length < 11) {
                if (emailRegex.test(text)) {
                  setType('email')
                }
                return [...Array.from(Array(100)).keys()].map(i => /./)
              } else if (text.replace(/\D+/g, "").length == 11) {
                if (cpf.isValid(text)) {
                  setType('cpf')
                  return Masks.BRL_CPF;
                }
                setType('phone')
                return Masks.BRL_PHONE;
              } else if (text.replace(/\D+/g, "").length <= 14) {
                setType('cnpj')
                return Masks.BRL_CNPJ
              } else {
                setType('evp');
                return [/\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, "-", /\w/, /\w/, /\w/, /\w/, "-", /\w/, /\w/, /\w/, /\w/,"-", /\w/, /\w/, /\w/, /\w/, "-", /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,/\w/, /\w/, /\w/, /\w/]
              }
          }}
        />
        <Pressable onPress={async() => {
          const text = await Clipboard.getStringAsync();
          setCode(text);
        }}>
          <Text style={styles.clipboardCopy}>Colar chave</Text>
        </Pressable>
      </View>
      
      <Button onPress={async() => {
        router.push({ pathname: 'pix/pixPaymentReview', params: { code, type } })
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  clipboardCopy: {
    color: '#764abc',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 10,
  }
});
