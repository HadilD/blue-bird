import axios from 'axios';
import APIEndpoint from '../config'
import { APIConstant, Constants } from '../constants/api'
import { refreshAccessToken, logoutUser } from './auth'

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
    'Content-Type': APIConstant.CONTENT_TYPE,
  },
});

protectedAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN);
    config.headers.authorization = 'Bearer ' + token;
    return config;
  },
  error => Promise.reject(error)
);

protectedAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
    if (error.response.status === 401) {
      try {
        refreshAccessToken()
        return;
      } catch (_error) {
        //logout user here
        logoutUser();
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
  }
)


export { openAxios, protectedAxios }