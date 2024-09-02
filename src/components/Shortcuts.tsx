import React from 'react';
import { formatCurrency } from "react-native-format-currency";
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';

export default function Statement() {
    const data = [
        {
            icon: "wallet",
            title: "Pix",
            href: '/pix'
        },
        {
            icon: "wallet",
            title: "Pix",
            href: '/pix'
        },
        {
            icon: "wallet",
            title: "Pix",
            href: '/pix'
        },
        {
            icon: "wallet",
            title: "Pix",
            href: '/pix'
        },
        {
            icon: "wallet",
            title: "Cartão",
            href: '/dashboard/card'
        }
    ];

    return (
        <BoxWrapper>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 110, width: '100%' }}>
                {data.map((item) => {
                    return (
                        <Link href={item.href}>
                            <Box>
                                <MaterialCommunityIcons name={item.icon} size={24} color="black" />
                                <Text>{item.title}</Text>
                            </Box>
                        </Link>
                    )
                })}
            </ScrollView>
        </BoxWrapper>
    );
}

const BoxWrapper = styled.View`
    padding-top: 10px;
`;
const Box = styled.View`
    width: 100px;
    height: 100px;
    margin-left: 10px;
    padding: 6px;
    padding-top: 14px;
    background-color: #EEE;
    margin: 8px;
    border-radius: 16px;
    align-items: center;
    align-content: center;
`;
const Disabled = styled.View`
    align-items: center;
    padding: 6px;
    border-color: #CCC;
    margin-bottom: 8px;
    border-radius: 16px;
`;
const TitleView = styled.View`
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom-color: #b4b3e3;
    border-bottom-width: 1px;
`;
const Title = styled.Text`
    font-size: 22px;
    font-weight: 500;
    color: #000;
    padding: 10px;
    text-align: center;
`;
const DateView = styled.View`
    border-bottom-color: #DDD;
    border-bottom-width: 1px;
`;
const ItemView = styled.View`
    padding: 10px;
`;
const Text = styled.Text`
    font-size: 16px;
    color: #000;
`;
const TextCurrency = styled.Text`
    font-size: 20px;
    font-weight: 600;
    padding-top: 4px;
    color: #000;
`;
