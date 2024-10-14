import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import CardItem from '../../../components/CardItem';

const PixHome = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 8 }} >
        <Link href={"/pix/payment"}><CardItem icon="pix" title="Pagamento" /></Link>
        <Link href={"/pix/myKeys"}><CardItem icon="key" title="Minhas Chaves" /></Link>
        <Link href={"/pix/qrCode"}><CardItem icon="qr-code" title="Gerar QR Code" /></Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
});

export default PixHome;