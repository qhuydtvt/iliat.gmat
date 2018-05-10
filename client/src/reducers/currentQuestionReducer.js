import { SELECT_QUESTION } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case SELECT_QUESTION:
      return action.payload;
    default: return state;
  }
};