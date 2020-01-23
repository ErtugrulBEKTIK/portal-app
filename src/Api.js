import axios from 'axios';
import { API_BASE, API_KEY } from '../config';

export default axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [(data) => {
    const newData = {
      apikey: API_KEY,
      ...data};
    return JSON.stringify(newData);
  }]
});