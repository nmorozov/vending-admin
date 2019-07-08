import { SHOW_ADD_EDIT_DEVICE_POPUP, HIDE_ADD_EDIT_DEVICE_POPUP } from '../constants/addEditDevicePopup';

const initialState = {
  isOpen: false,
};

const SendMessageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_ADD_EDIT_DEVICE_POPUP:
      newState = action.payload;
      break;
    case HIDE_ADD_EDIT_DEVICE_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default SendMessageReducer;
