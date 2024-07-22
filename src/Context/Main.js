import React, { createContext, useEffect, useState } from 'react';
import {
    postCelcoin
} from '../Services/Main';
// import initialConverter from './converters/initial'
// import detailsConverter from './converters/details'

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();

  const [info, setInfo] = useState({ loading: true });
  const [boletoInfo, setBoletoInfo] = useState({ });
  const [saldo, setSaldo] = useState({ loading: true });

  async function getSaldo(data) {
    setSaldo({ loading: true });

    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/baas-walletreports/v1/wallet/balance?Account=3004660672360`,
      method: "GET"
    });

    if (response.error || !response.data || !response.data.body) {
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response && !response.success) {
        setSaldo(response);
      }
    } else {
        // console.log('getSaldo', response)
        setSaldo({
        success: true,
        data: response.data.body,
      });
    }
  };

  async function getInfo() {
    setInfo({ loading: true });

    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/baas-accountmanager/v1/account/fetch?Account=3004660672360&DocumentNumber`,
      method: "GET"
    });

    if (response.error || !response.data || !response.data.body) {
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response && !response.success) {
        setInfo(response);
      }
    } else {
        // console.log('getInfo', response)
        setInfo({
            success: true,
            data: response.data.body,
        });
    }
  };

  async function getBoletoInfo({ barCode }) {
    console.log('getBoletoInfo', barCode)
    setBoletoInfo({ loading: true });
    
    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/v5/transactions/billpayments/authorize`,
      method: "POST",
      payload: {
        barCode: {
          type: 1,
          barCode
        }}
    });

    if (response.error || !response.data) {
      console.log('getBoletoInfo error: ', response)
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response && !response.success) {
        setBoletoInfo(response);
      }
    } else {
        console.log('getBoletoInfo', response)
        setBoletoInfo({
            success: true,
            data: response.data,
        });
    }
  };


  return (
    <DashboardContext.Provider value={{
      getSaldo, saldo,
      getInfo, info,
      getBoletoInfo, boletoInfo,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};





// https://sandbox.openfinance.celcoin.dev/baas-walletreports/v1/wallet/movement?DateFrom=yyyy-MM-dd&DateTo=yyyy-MM-dd

// curl --request POST \
//      --url https://sandbox.openfinance.celcoin.dev/v5/transactions/billpayments/authorize \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --data '
// {
//   "barCode": {
//     "type": 0,
//     "digitable": "23793381286008301352856000063307789840000150000"
//   }
// }
// '