import axios from 'axios';

// setting up base URL
export const API = axios.create({
  baseURL: 'https://192.168.100.3:5020',
});
