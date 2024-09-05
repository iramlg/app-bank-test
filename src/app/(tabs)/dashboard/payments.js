import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BarCode from '../../../components/BarCode'

export default function Payments() {
  return (
    <View style={styles.container}>
      <Text>Pagamentos</Text>
      {/* <BarCode /> */}
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
