import _ from 'lodash';
import { REMOVE_QUESTION, EDIT_QUESTION, ADD_QUESTION, FETCH_QUESTIONS } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_QUESTIONS:
      console.log("Fetch");
      return _.mapKeys(action.payload, "_id");
    case REMOVE_QUESTION:
      return _.omit(state, [action.payload]);
    default:
      return state;
  }
};