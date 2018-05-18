import axios from 'axios';
import _ from 'lodash';
import { checkFields } from './utils';
import { API_QUESTIONS } from './urls';

export const REMOVE_QUESTION = "Remove question";
export const EDIT_QUESTION = "Edit question";
export const ADD_QUESTION = "Add question";
export const FETCH_QUESTIONS = "Fetch questions";

export function fetchQuestions() {
  const dataExtractor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response,'data.success') && _.get(response,'data.questions')) {
        resolve(response.data.questions);
      } else {
        reject();
      }
    });
  };
  return {
    type: FETCH_QUESTIONS,
    payload: axios.get(API_QUESTIONS).then(dataExtractor)
  }
}

export function removeQuestion(question, onSuccess=null, onError=null) {
  const request = axios.delete(`${API_QUESTIONS}/${question._id}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if (_.get(response, 'data.success')) {
        resolve(question._id);
      } else {
        reject();
      }
    });
  }
  return {
    type: REMOVE_QUESTION,
    payload: request.then(interceptor)
  };
}

export function editQuestion(question, onEditDone=null) {
  const request = axios.put(`${API_QUESTIONS}/${question._id}`, question);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, ['data.success', 'data.question'])) {
        resolve(response.data.question); // Temporary use param as updater
        if(onEditDone != null)
          onEditDone();
      } else {
        reject();
      }
    });
  };
  return {
    type: EDIT_QUESTION,
    payload: request.then(interceptor)
  };
}

export function addQuestion(question, onAddDone=null) {
  const request = axios.post(API_QUESTIONS, question);
  const requestInterceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.question')) {
        resolve(response.data.question);
        if(onAddDone != null)
          onAddDone();
      } else {
        reject();
      }
    });
  };
  return {
    type: ADD_QUESTION,
    payload: request.then(requestInterceptor)
  };
}
