import axios from 'axios';

// setting up base URL
export const API = axios.create({
  // baseURL: 'http://192.168.100.2:5020',
  baseURL: 'http://192.168.247.165:5020',
});
