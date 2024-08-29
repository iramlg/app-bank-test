import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components/native';

export default function CardItem(props) {
    if (props.disabled) {
        return (
            <Disabled {...props}>
                <Text numberOfLines={2}>{props.title}</Text>
            </Disabled>
        );
    }
    return (
        <MainButton {...props}>
            <MaterialIcons name={props.icon} size={30} color="black" />
            <Text numberOfLines={2}>{props.title}</Text>
        </MainButton>
    );
}

const MainButton = styled.View`
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    padding: 6px;
    border: 1px solid #333;
    margin-bottom: 8px;
    border-radius: 16px;
    overflow: hidden;

`;
const Disabled = styled.View`
    align-items: center;
    padding: 6px;
    border-color: #CCC;
    margin-bottom: 8px;
    border-radius: 16px;
`;
const Text = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: 600;
    text-align: center;
`;