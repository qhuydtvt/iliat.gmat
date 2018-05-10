import _ from 'lodash';

import { CHECK_ANSWERS } from '../actions';

export default function(state = null, action) {
  switch(action.type) {
    case CHECK_ANSWERS:
        return action.payload;
    default:
        return state;
  }
};