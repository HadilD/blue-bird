import axios from 'axios';
import APIEndpoint from '../config'
import { APIConstant, Request } from '../constants/api'

//Instance to be used for un-authenticated resources
const openAxios = axios.create({
  baseURL: APIEndpoint,
  headers: {
    'Content-Type': APIConstant.CONTENT_TYPE
  }
});

//Instance to be used for authenticated resources
const protectedAxios = axios.create({
  baseURL: APIEndpoint,
  headers: {
    'Content-Type': APIConstant.CONTENT_TYPE
  },
});

protectedAxios.interceptors.request.use(
  async (config) => {
    const token = "Some jwt token"
    // const token = await AsyncStorage.getItem(StorageConstants.ACCESS_TOKEN);
    config.headers.authorization = 'Bearer ' + token;
    return config;
  },
  error => Promise.reject(error)
);


export { openAxios, protectedAxios }