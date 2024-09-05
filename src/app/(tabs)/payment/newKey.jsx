import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Link, useNavigation, useRouter } from "expo-router";
import { DashboardContext } from '../../../Context/Main';

export default function NewKey() {
  const router = useRouter();
  const { addPixelKey, getPixKeys } = useContext(DashboardContext);
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState('EVP');
  const types = {
    EVP: 'Chave Aleatória',
    CPF: 'Chave CPF',
    CNPJ: 'Chave CNPJ',
    EMAIL: 'Chave Email',
    PHONE: 'Chave Telefone',
  };

  return (
    <View style={styles.container}>
        <Text>Tipo</Text>
        <View style={{ width: "100%" }}>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedType(itemValue)
          }}>
            {Object.keys(types).map((type) => (
              <Picker.Item label={types[type]} value={type} />
            ))}
          </Picker>
        </View>
        <Text>Chave</Text>
        <TextInput
            style={styles.input}
            placeholder="chave"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
        />
        <Button
          title="Cadastrar"
          onPress={async () => {
            const data = {
              keyType: selectedType,
            }

            if (selectedType !== 'EVP') {
              data.key = text;
            }
            
            const newKey = await addPixelKey(data);

            if (newKey.success) {
              getPixKeys();
              router.back();
            }
            console.log(newKey)
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
