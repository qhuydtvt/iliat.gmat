import _ from 'lodash';
import axios from 'axios';

import { API_QUESTION_PACKS } from './urls';

export const SELECT_QUESTION_PACK = "Select question pack";

const defaultQuestionPack = () => {
  return {
    name: "",
    id: "",
    questions: []
  };
}


export function selectQuestionPack(questionPack, handlers, title="Edit question pack") {
  if(questionPack == null) {
    const loadDefaultQuestionPack = new Promise((resolve, reject) => {
      resolve(defaultQuestionPack());
    });
    return {
      type: SELECT_QUESTION_PACK,
      payload: {
        loadQuestionPack: loadDefaultQuestionPack,
        handlers, title
      }
    };
  }
  else {
    const request = axios.get(`${API_QUESTION_PACKS}/${questionPack._id}`);
    const interceptor = (response) => {
      return new Promise((resolve, reject) => {
        if(_.get(response, "data.questionPack")) {
          resolve(response.data.questionPack);
        } else {
          reject();
        }
      });
    };
    return {
      type: SELECT_QUESTION_PACK,
      payload: {
        loadQuestionPack: request.then(interceptor),
        handlers, title
      }
    };
  }
}