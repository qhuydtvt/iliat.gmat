import _ from 'lodash';

import axios from 'axios';

import { API_QUESTIONS } from './urls';
import { checkFields } from './utils';

export const SEARCH_QUESTION = "Search question";
export const TOGGLE_QUESTION_SELECTION = "Select question selection";
export const CLEAR_QUESTION_SELECTIONS = "Clear questions selections";

export function searchQuestion(searchTerms) {
  const request = axios.get(`${API_QUESTIONS}?searchTerms=${searchTerms}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, ['data.success', 'data.questions'])) {
        resolve(_.mapKeys(response.data.questions, "_id"));
      } else {
        reject();
      }
    });
  };

  return {
    type: SEARCH_QUESTION,
    payload: request.then(interceptor)
  };
}

export function toggleQuestionSelection(question) {
  return {
    type: TOGGLE_QUESTION_SELECTION,
    payload: question
  };
}

export function clearQuestionSelections() {
  return {
    type: CLEAR_QUESTION_SELECTIONS
  };
}