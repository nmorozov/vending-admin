import { SHOW_ADD_COIN_POPUP, HIDE_ADD_COIN_POPUP } from '../constants/addCoinPopup';

const initialState = {
  isOpen: false,
};

const ProfileEditReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_ADD_COIN_POPUP:
      newState = action.payload;
      break;
    case HIDE_ADD_COIN_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default ProfileEditReducer;
