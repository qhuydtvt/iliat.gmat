import { POPUP_OPEN, POPUP_CLOSE } from '../actions';

export default function(state = { isOpen: false }, action) {
  switch(action.type) {
    case POPUP_OPEN:
      return {
        ...state,
        isOpen: true,
        yesCallBack: action.payload.yesCallBack,
        noCallBack: action.payload.noCallBack,
        header: action.payload.header,
        prompt: action.payload.prompt
      };
    case POPUP_CLOSE:
      return {
        isOpen: false
      };
    default: return state;
  }
}