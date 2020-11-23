import axios from 'axios';

const coinbase = axios.create({
    baseURL: 'https://api.coinbase.com/v2/'
});

export default coinbase;