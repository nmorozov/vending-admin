import { SHOW_SEND_MESSAGE_POPUP, HIDE_SEND_MESSAGE_POPUP } from '../constants/sendMessagePopup';

const initialState = {
  isOpen: false,
  ownerId: 0,
  ownerName: '',
  attachment: '',
};

const SendMessageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_SEND_MESSAGE_POPUP:
      newState = action.payload;
      break;
    case HIDE_SEND_MESSAGE_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default SendMessageReducer;
