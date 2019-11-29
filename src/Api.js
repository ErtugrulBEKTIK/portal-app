import axios from 'axios';
import { API_BASE, API_KEY } from '../config';

export default axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});