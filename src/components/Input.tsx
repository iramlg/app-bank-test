import React from 'react';
import { StyleSheet } from 'react-native';
import MaskInput from 'react-native-mask-input'

const InputComponent = (props) => {
    return (
        <MaskInput style={[styles.input, props.style]} {...props} />
    );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#f9f9f9',
    paddingLeft: 10,
    fontSize: 16,
    height: 40,
    marginBottom: 8,
  },
});

export default InputComponent;