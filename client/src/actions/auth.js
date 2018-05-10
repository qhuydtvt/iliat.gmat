import axios from 'axios';
import _ from 'lodash';

import { SIGN_IN, AUTH } from './urls';
import { AXIOS_CONFIGS } from './settings';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const GET_USER = "GET USER";

axios.defaults.config = AXIOS_CONFIGS;

const tokenRequest = (request) => {
  const credentials = loadCredentials();
  if (credentials && credentials.token) {
    request.headers.token = credentials.token;
  }
  return request;
}

axios.interceptors.request.use(tokenRequest, (error) => Promise.reject(error));

export function login(username, password) {
  const body = { username, password };
  const request = axios.post(SIGN_IN, body);
  const tokenInterceptor = (response, error) => {
    return new Promise(
      (resolve, reject) => {
        if (_.get(response, "data.token") && _.get(response, "data.user.role")) {
          saveCredentials(response.data.token, response.data.user.role);
        }
        resolve(response);
      }
    );
  };
  return  {
      type: LOGIN,
      payload: request.then(tokenInterceptor)
  };
}

export function logout() {    
  clearCredentials();
  return  {
      type: LOGOUT,
      payload: null
  };
}

export function checkToken() {
    const credentials = loadCredentials();
    if (credentials && credentials.token && credentials.role) {
      return {
        type: CHECK_TOKEN,
        payload: credentials
      }
    }
    else {
      return {
        type: CHECK_TOKEN,
        payload: null
      };
    }
}

function saveCredentials(token, role) {
  var now = new Date();
  var expirationTime = new Date(now.setDate(now.getDate() + 7)).toGMTString();
  localStorage.setItem("credentials", JSON.stringify({
    token, expirationTime, role
  }));
}

function loadCredentials() {
  const credentialsText = localStorage.getItem("credentials");
  return credentialsText ? JSON.parse(credentialsText): null;
}

function clearCredentials() {
  localStorage.removeItem("credentials");
}