import axios from 'axios';
import { checkFields } from './utils';

import  { API_QUESTIONS }  from './urls'
export const SELECT_QUESTION = "SELECT QUESTION";

const defaultQuestion = () => {
  return {
    stimulus: "",
    stem: "",
    choices: ["", "", "", "", ""],
    rightChoice: 0,
    difficulty: 0,
    explanation: "",
  };
}

export function selectQuestion(question, handlers, title="Edit question") {
  if (question == null) {
    return {
      type: SELECT_QUESTION,
      payload: {
        loadQuestion: new Promise((resolve, reject) => {
          resolve(defaultQuestion());
        }),
        handlers, title
      }
    };
  }
  else {
    const request = axios.get(`${API_QUESTIONS}/${question._id}`);
    const interceptor = (response) => {
      return new Promise((resolve, reject) => {
        if(checkFields(response, ['data.success', 'data.question'])) {
          resolve(response.data.question);
        }
        else {
          reject();
        }
      });
    }
    return {
      type: SELECT_QUESTION,
      payload: {
        loadQuestion: request.then(interceptor),
        handlers, title
      }
    };
  }
}