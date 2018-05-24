import axios from 'axios';
import { API_RESULT } from '../constants';
import  { checkFields }  from '../utils';

export function addResult(body) {
  const request = axios.post(API_RESULT, body);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, ['data.success', 'data.result'])) {
        resolve(response.data.result._id);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}

export function fetchResult(resultId) {
    const request = axios.get(`${API_RESULT}/${resultId}`);
    const interceptor = (response) => {
      return new Promise((resolve, reject) => {
        if(checkFields(response, ['data.success', 'data.result'])) {
          resolve(response.data.result);
        } else {
          reject();
        }
      });
    }
    return request.then(interceptor);
}
