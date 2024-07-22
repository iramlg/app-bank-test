import React, {useState, useEffect, useContext} from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DashboardContext } from '../Context/Main';

export default function App() {
  const { getBoletoInfo, boletoInfo } = useContext(DashboardContext);
  const [permission, requestPermission] = useCameraPermissions();
  const [codigo, setCodigo] = useState();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Nós precisamos de acesso a camera para continuar</Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }
  

  if (boletoInfo.data) {
    // Camera permissions are not granted yet.
    console.log('boletoInfo', boletoInfo.data);
    return (
      <View style={styles.container}>
        <Text style={{ }}>Banco {boletoInfo.data.assignor}</Text>
        <Text style={{ }}>Pagador {boletoInfo.data.registerData.payer}</Text>
        <Text style={{ }}>Pagador Doc {boletoInfo.data.registerData.documentPayer}</Text>
        <Text style={{ }}>Recebedor {boletoInfo.data.registerData.recipient}</Text>
        <Text style={{ }}>Recebedor Doc {boletoInfo.data.registerData.documentRecipient}</Text>
        <Text style={{ }}>Data de Vencimento {boletoInfo.data.registerData.payDueDate}</Text>
        <Text style={{ }}>Valor total {boletoInfo.data.registerData.totalUpdated}</Text>
        <Button onPress={() => {}} title="Pagar" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {codigo ? (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>{codigo}</Text>
          <Button onPress={() => {

            getBoletoInfo({barCode: '12198000000000000000000000000011114232524114'})
          }} title="Proseguir" />
        </View>
      ) : (
        <CameraView style={styles.camera} onBarcodeScanned={(a) => {
          console.log(a.data);
          setCodigo(a.data)
        }} >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.text}>Digitar código</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});