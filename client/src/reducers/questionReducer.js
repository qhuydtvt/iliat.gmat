import _ from 'lodash';
import { REMOVE_QUESTION, EDIT_QUESTION, ADD_QUESTION, FETCH_QUESTIONS } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_QUESTIONS:
      console.log("Fetch");
      return _.mapKeys(action.payload, "_id");
    case REMOVE_QUESTION:
      return _.omit(state, [action.payload]);
    // case EDIT_QUESTION:
    // case ADD_QUESTION:
    //   const question = action.payload;
    //   console.log(question);
    //   return { ...state, [question._id]: question };
    default:
      return state;
  }
};