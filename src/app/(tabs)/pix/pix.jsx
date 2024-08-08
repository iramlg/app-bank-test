import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Card() {
  return (
    <View style={styles.container}>
      <Text>Pix</Text>
      <Link href={"pix/myKeys"}>Minhas Chaves</Link>
      <Link href={"pix/qrCode"}>Gerar QR Code</Link>
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
});
