import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export default function ButtonComponent(props) {
    if (props.disabled) {
        return (
            <Disabled {...props}>
                <Text>{props.title}</Text>
            </Disabled>
        );
    }
    return (
        <MainButton {...props}>
            <Text>{props.title}</Text>
        </MainButton>
    );
}

const MainButton = styled.Pressable`
    align-items: center;
    padding-vertical: 6px;
    padding-horizontal: 18px;
    background-color: #764abc;
    margin-bottom: 8px;
    border-radius: 16px;
`;
const Disabled = styled.View`
    align-items: center;
    padding-vertical: 6px;
    padding-horizontal: 18px;
    background-color: #CCC;
    margin-bottom: 8px;
    border-radius: 16px;
`;
const Text = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: 600;
`;