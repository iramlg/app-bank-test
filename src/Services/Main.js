import axios from 'axios';
// import { getData } from '../utils/token';

// const apiRoute = 'https://eb63-2804-7f0-bf42-ed35-b8a6-6b5e-f17c-9966.ngrok-free.app'
const apiRoute = 'http://localhost:3000';
// const apiRoute = 'https://intense-journey-60943-94ecef839bd9.herokuapp.com'

export const getUser = async (payload) => {
    // const data = await getData();
    const data = {};

    try {
        const response = await axios({
            url: `${apiRoute}/login`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${data.jwt || null}`,
            },
            data: payload
        });

        if (!response.data) {
        return {
            success: false,
            error: true,
        };
        }
        return response.data;
    } catch (e) {
        console.log('Error request: ', e)
        let message = 'Infelizmente não foi possível pesquisar. Verifique sua internet e tente novamente.';

        return {
            success: false,
            error: true,
            errorType: e.response.status,
            message
        };
    }
};

export const accountCreate = async (payload) => {
    // const data = await getData();
    const data = {};

    try {
        const response = await axios({
            url: `${apiRoute}/account-create`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${data.jwt || null}`,
            },
            data: payload
        });

        if (!response.data) {
        return {
            success: false,
            error: true,
        };
        }
        return {
            success: true,
            data: response.data
        };
    } catch (e) {
        console.log('Error request: ', e)
        let message = 'Infelizmente não foi possível pesquisar. Verifique sua internet e tente novamente.';

        return {
            success: false,
            error: true,
            errorType: e.response.status,
            message
        };
    }
};



export const postCelcoin = async (payload) => {
    // const data = await getData();
    const data = {};
    console.log('here', `${apiRoute}/celcoin`)
    try {
        const response = await axios({
            url: `${apiRoute}/celcoin`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${data.jwt || null}`,
            },
            data: payload
        });

        if (!response.data) {
        return {
            success: false,
            error: true,
        };
        }
        return {
            success: true,
            data: response.data
        };
    } catch (e) {
        console.log('Error request: ', e)
        let message = 'Infelizmente não foi possível pesquisar. Verifique sua internet e tente novamente.';

        return {
            success: false,
            error: true,
            errorType: e.response.status,
            message
        };
    }
};

export const getCEPAddress = async (cep) => {
    // const data = await getData();

    try {
        const response = await axios({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            method: 'GET',
        });

        if (!response.data) {
            return {
                success: false,
                error: true,
            };
        }
        return response.data;
    } catch (e) {
        console.log('Error request: ', e.response)
        let message = 'Infelizmente não foi possível pesquisar. Verifique sua internet e tente novamente.';

        return {
            success: false,
            error: true,
            errorType: e.response.status,
            message
        };
    }
};
