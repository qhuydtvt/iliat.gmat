import _ from 'lodash';
import axios from 'axios';

import { API_QUESTION_PACKS } from './urls';

export const REMOVE_QUESTION_PACK = 'Remove question pack';
export const ADD_QUESTION_PACK = 'Add question pack';
export const EDIT_QUESTION_PACK = 'Edit question pack';
export const FETCH_QUESTION_PACKS = "Fetch question pack";

export function fetchQuestionPacks() {
  const request = axios.get(API_QUESTION_PACKS);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response, 'data.success') && _.get(response, 'data.questionPacks')) {
        resolve(response.data.questionPacks);
      } else {
        reject();
      }
    });
  };
  return {
    type: FETCH_QUESTION_PACKS,
    payload: request.then(interceptor)
  };
}

export function removeQuestionPack(questionPack) {
  const request = axios.delete(`${API_QUESTION_PACKS}/${questionPack._id}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response, 'data.success')) {
        resolve(questionPack);
      }
      else {
        reject();
      }
    });
  }

  return {
    type: REMOVE_QUESTION_PACK,
    payload: request.then(interceptor)
  };
}

export function editQuestionPack(questionPack) {
  const request = axios.put(`${API_QUESTION_PACKS}/${questionPack._id}`, questionPack);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response, 'data.success')) {
        resolve(questionPack); // TODO: replace with question pack from server
      } else {
        reject();
      }
    });
  }
  return {
    type: EDIT_QUESTION_PACK,
    payload: request.then(interceptor)
  };
}

export function addQuestionPack(questionPack) {
  const request = axios.post(API_QUESTION_PACKS, questionPack);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response, 'data.success') && _.get(response, 'data.questionPack')) {
        resolve(response.data.questionPack);
      }
      else {
        reject();
      }
    });
  }
  return {
    type: ADD_QUESTION_PACK,
    payload: request.then(interceptor)
  };
}