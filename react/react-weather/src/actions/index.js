import axios from 'axios'

const API_KEY = '235faf79a392f40ee32976aa70de6725';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},cn`;
    const request = axios.get(url);

    console.log('request',request);

    return {
        type:FETCH_WEATHER,
        payload:request
    }
}