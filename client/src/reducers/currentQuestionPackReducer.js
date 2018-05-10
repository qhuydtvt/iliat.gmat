import { SELECT_QUESTION_PACK } from '../actions';

export default function (state = null, action) {
  switch(action.type) {
    case SELECT_QUESTION_PACK:
      return action.payload;
    default:
      return state;
  }
}