import axios from 'axios';
// import { getData } from '../utils/token';

const apiRoute = 'https://intense-journey-60943-94ecef839bd9.herokuapp.com'

export const postCelcoin = async (payload) => {
    // const data = await getData();
    const data = {};

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