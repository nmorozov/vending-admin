import { SHOW_CONFIRM_POPUP, HIDE_CONFIRM_POPUP } from '../constants/confirmPopup';

const initialState = {
  isOpen: false,
};

const ConfirmPopupReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_CONFIRM_POPUP:
      newState = action.payload;
      break;
    case HIDE_CONFIRM_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default ConfirmPopupReducer;
