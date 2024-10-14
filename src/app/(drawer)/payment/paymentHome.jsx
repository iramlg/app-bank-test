import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'expo-router';
import Input from '../../../components/Input';
import * as Clipboard from 'expo-clipboard';

const PaymentHome = () => {
  const router = useRouter();
  const [barCode, setBarCode] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite o código de barras do boleto que quer realizar o pagamento</Text>
      <Text style={styles.title}>{barCode}</Text>
      <Input
        value={barCode}
        // style={styles.input}
        keyboardType = 'numeric'
        placeholder=""
        onChangeText={(val, val2) => setBarCode(val)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, ".", [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], /\d/, /\d/, /\d/, /\d/, /\d/, ".", [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], " ", /\d/, /\d/, /\d/, /\d/, /\d/, ".", [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], " ", /\d/, " ", [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/], [/\d/]]}
      />
      <Pressable onPress={async() => {
        const text = await Clipboard.getStringAsync();
        setBarCode(text);
      }}>
        <Text style={styles.clipboardCopy}>Colar código</Text>
      </Pressable>
      <Pressable onPress={async() => {
        router.push({ pathname: 'payment/paymentReview', params: { barCode } })
      }}>
        <Text style={styles.clipboardCopy}>Continuar</Text>
      </Pressable>
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

export default PaymentHome;