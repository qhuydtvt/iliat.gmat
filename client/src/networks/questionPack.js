import { API_QUESTION_PACKS } from '../constants';
import axios from 'axios';
import { checkFields } from '../utils';

export function fetchQuestionPackById(id) {
  const request = axios.get(`${API_QUESTION_PACKS}/${id}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, ['data.success', 'data.questionPack'])) {
        resolve(response.data.questionPack);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}