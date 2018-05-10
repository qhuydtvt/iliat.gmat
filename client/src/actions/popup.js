export const POPUP_OPEN = "Popup open";
export const POPUP_CLOSE = "Popup close";
export const POPUP_TOGGLE = "Popup toggle";

export function openPopup(yesCallBack, noCallBack, header = "Delete", prompt="Do you want to delete?") {
  return {
    type: POPUP_OPEN,
    payload: { header, prompt, yesCallBack, noCallBack }
  };
}

export function closePopup() {
  return {
    type: POPUP_CLOSE
  };
}