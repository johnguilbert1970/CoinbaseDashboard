import axios from 'axios';

const coinbasePro = axios.create({
    baseURL: 'https://api.pro.coinbase.com/'
});

export default coinbasePro;