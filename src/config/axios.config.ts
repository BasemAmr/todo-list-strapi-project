import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 1000,
  });