import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Link } from 'expo-router';

export default function NewKey() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
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
});
