import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async() => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    
    if(!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }

    if(!city) {
        throw new Error('Не задан город, задайте его через команду -s [CITY]')
    }

    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'Metric'
        }
    });

    return data;
}

export {getWeather}