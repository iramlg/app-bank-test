import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';

export default function Statement() {
    const data = [
        {
            icon: "pix",
            materialIcon: true,
            title: "Pix",
            href: '/pix/payment'
        },
        {
            icon: "barcode",
            title: "Pagamento",
            href: '/payment'
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
                                {item.materialIcon ? 
                                <MaterialIcons name={item.icon} size={24} color="black" />
                                : <MaterialCommunityIcons name={item.icon} size={24} color="black" /> }
                                
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
    padding-top: 20px;
`;
const Box = styled.View`
    width: 100px;
    height: 100px;
    margin-left: 10px;
    padding: 6px;
    padding-top: 24px;
    background-color: #EEE;
    margin: 8px;
    border-radius: 16px;
    align-items: center;
    align-content: center;
`;
const Text = styled.Text`
    padding-top: 8px;
    font-size: 16px;
    color: #000;
`;
