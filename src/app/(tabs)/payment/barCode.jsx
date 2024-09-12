import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Link, useNavigation, useRouter } from "expo-router";
import { DashboardContext } from '../../../Context/Main';
import BarCodeComponent from '../../../components/BarCode';


export default function barCode() {
  const router = useRouter();
  const { addPixelKey, getPixKeys } = useContext(DashboardContext);
  const [text, setText] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    () => {
      setShow(false)
    }
  })

  return (
    <View style={styles.container}>
      {show ? <BarCodeComponent /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
