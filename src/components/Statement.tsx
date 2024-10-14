import React from 'react';
import { formatCurrency } from "react-native-format-currency";
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import { ScrollView } from 'react-native-gesture-handler';

dayjs.locale('pt-br')

const Statement = () => {
    const data = [
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Recebimento Pix",
            "createDate": "2024-08-31T17:19:55",
            "lastUpdateDate": "2024-08-31T17:19:55",
            "amount": 10.12,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTIN"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Recebimento Pix",
            "createDate": "2024-08-31T17:19:55",
            "lastUpdateDate": "2024-08-31T17:19:55",
            "amount": 100.12,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTIN"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Recebimento Pix",
            "createDate": "2024-08-25T10:19:55",
            "lastUpdateDate": "2024-25-31T10:19:55",
            "amount": 1001.12,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTIN"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Pagamento Pix",
            "createDate": "2024-08-25T10:04:55",
            "lastUpdateDate": "2024-25-31T10:04:55",
            "amount": 345.25,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTOUT"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Recebimento Pix",
            "createDate": "2024-08-24T10:19:55",
            "lastUpdateDate": "2024-08-24T10:19:55",
            "amount": 1001.12,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTIN"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Pagamento Pix",
            "createDate": "2024-08-24T10:04:55",
            "lastUpdateDate": "2024-08-24T10:04:55",
            "amount": 345.25,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTOUT"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Pagamento Pix",
            "createDate": "2024-08-24T08:04:55",
            "lastUpdateDate": "2024-08-24T08:04:55",
            "amount": 3435.25,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTOUT"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Recebimento Pix",
            "createDate": "2024-08-20T10:19:55",
            "lastUpdateDate": "2024-08-20T10:19:55",
            "amount": 1001.12,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTIN"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Pagamento Pix",
            "createDate": "2024-08-20T10:04:55",
            "lastUpdateDate": "2024-08-20T10:04:55",
            "amount": 345.25,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTOUT"
        },
        {
            "id": "aa99877c-6205-45ce-8fd8-18173fdd782a",
            "clientCode": "7a2a4ea2-ee65-4b3d-8e1d-311dd45d3017",
            "description": "Pagamento Pix",
            "createDate": "2024-08-20T08:04:55",
            "lastUpdateDate": "2024-08-20T08:04:55",
            "amount": 3435.25,
            "status": "Saldo Liberado",
            "balanceType": "CREDIT",
            "movementType": "PIXPAYMENTOUT"
        }
    ];

    const newData = {};

    data.forEach((item) => {
        const dateStatement = dayjs(item.createDate).format('YY-MM-DD');

        if (!newData[dateStatement]) {
            newData[dateStatement] = {
                title: dayjs(item.createDate).format('ddd, D [de] MMMM, YYYY'),
                items: []
            }
        }

        const formatedCurrency = formatCurrency({amount: item.amount, code: "BRL"});

        newData[dateStatement].items.push({
            ...item,
            formatedCurrency
        });
    });

    return (
        <View style={{ flex: 1 }}>
            <TitleView>
                <Title>Extrato</Title>
            </TitleView>
            <ScrollView style={{ flex: 1 }}>
                {Object.keys(newData).map((keyItem) => {
                    return (
                        <View>
                            <DateView>
                                <Text>{newData[keyItem].title}</Text>
                            </DateView>
                            {newData[keyItem].items.map((item) => (
                                <ItemView>
                                    <Text>{item.description}</Text>
                                    <TextCurrency>{item.formatedCurrency[0]}</TextCurrency>
                                </ItemView>
                            ))}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const MainButton = styled.View`
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

export default Statement;