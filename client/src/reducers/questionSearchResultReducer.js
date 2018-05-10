import _ from 'lodash';
import { SEARCH_QUESTION, TOGGLE_QUESTION_SELECTION, CLEAR_QUESTION_SELECTIONS } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case SEARCH_QUESTION:
      return action.payload;
    case TOGGLE_QUESTION_SELECTION:
      const question = action.payload;
      return {
        ...state,
        [question.id]: {
          ...question,
          selected: !question.selected
        }
      };
    case CLEAR_QUESTION_SELECTIONS:
      return _.mapValues(state, (question) => {
        return {
          ...question,
          selected: false
        }
      });
    default: return state;
  }
};