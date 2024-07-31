import React, { createContext, useEffect, useState } from 'react';
import {
    postCelcoin
} from '../Services/Main';

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();

  const [info, setInfo] = useState({ loading: true });
  const [boletoInfo, setBoletoInfo] = useState({ });
  const [addAccountStatus, setAddAccountStatus] = useState({ });
  const [saldo, setSaldo] = useState({ loading: true });
  const [loginInfo, setLoginInfo] = useState({});
  const [account, setAccount] = useState('');
  const [pixKeys, setPixKeys] = useState({});

  async function addPixelKey(data) {
    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/celcoin-baas-pix-dict-webservice/v1/pix/dict/entry`,
      method: "POST",
      payload: {
        ...data,
        account: account,
      }
    });
    console.log('response', response)
    if (response.error || !response.data || !response.data) {
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      return {
        error: true,
      }
    } else {
        return {
          success: true,
          data: response.data,
        };
    }
  };

  async function getPixKeys(data) {
    setPixKeys({ loading: true });

    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/celcoin-baas-pix-dict-webservice/v1/pix/dict/entry/${account}`,
      method: "GET"
    });
    console.log('response', response)
    if (response.error || !response.data || !response.data) {
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response.errorType && response.errorType == 404) {
        // navigation.navigate('logoff');
        setPixKeys({
          success: true,
          data: [],
        });
        return;
      }
      // console.log('response', response)
      if (response && !response.success) {
        setPixKeys(response);
      }
    } else {
        console.log('getPixKeys', response)
        setPixKeys({
          success: true,
          data: response.data,
        });
    }
  };

  async function login({ doc }) {
    setLoginInfo({ loading: true });

    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/baas-accountmanager/v1/account/fetch?DocumentNumber=${doc}`,
      method: "GET"
    });

    if (response.error || !response.data || !response.data.body) {
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response && !response.success) {
        setLoginInfo(response);
      }
    } else {
        // console.log('getSaldo', response)
        setAccount(response.data.body.account.account)
        setLoginInfo({
          success: true,
          data: response.data.body,
        });
      
    }
  };
  
  async function getSaldo(data) {
    setSaldo({ loading: true });

    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/baas-walletreports/v1/wallet/balance?Account=${account}`,
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
      url: `https://sandbox.openfinance.celcoin.dev/baas-accountmanager/v1/account/fetch?Account=${account}&DocumentNumber`,
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

  async function addAccount(payload) {
    console.log('here', payload)
    setAddAccountStatus({ loading: true });
    
    const response = await postCelcoin({
      url: `https://sandbox.openfinance.celcoin.dev/onboarding/v1/onboarding-proposal/natural-person`,
      method: "POST",
      payload
    });

    if (response.error || !response.data) {
      console.log('addAccount error: ', response)
      if (response.errorType && response.errorType == 401) {
        // navigation.navigate('logoff');
      }

      if (response && !response.success) {
        setAddAccountStatus(response);
      }
    } else {
        console.log('addAccount', response)
        setAddAccountStatus({
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
      addAccount, addAccountStatus,
      login, loginInfo, setLoginInfo,
      pixKeys, setPixKeys, getPixKeys,
      addPixelKey,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
