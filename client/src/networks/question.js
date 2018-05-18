import axios from 'axios';
import { API_QUESTIONS } from '../constants';
import  { checkFields }  from '../utils';

export function fetchQuestion(questionId) {
  const request = axios.get(`${API_QUESTIONS}/${questionId}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, ['data.success', 'data.question'])) {
        resolve(response.data.question);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}