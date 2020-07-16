import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'a3a50da521f71d2bf0e0507ea913fc5e';
const LANG = 'fr';

export const openWeather = async (query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
            lang: LANG,
        }
    });
    return data;
}