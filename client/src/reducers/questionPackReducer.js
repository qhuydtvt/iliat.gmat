import _ from "lodash";
import { FETCH_QUESTION_PACKS, REMOVE_QUESTION_PACK, SELECT_QUESTION_PACK, ADD_QUESTION_PACK, EDIT_QUESTION_PACK } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_QUESTION_PACKS:
      return _.mapKeys(action.payload, "_id");
    case REMOVE_QUESTION_PACK:
      const questionPackToDelete = action.payload;
      return _.omit(state, questionPackToDelete._id);
    case EDIT_QUESTION_PACK:
      const edittedQuestionPack =  action.payload;
      return { ...state, 
        [edittedQuestionPack._id] : edittedQuestionPack
      };
    case ADD_QUESTION_PACK:
      const addedQuestionPack = action.payload;
      return {
        ...state,
        [addedQuestionPack._id]: addedQuestionPack
      };
    default: return state;
  }
};