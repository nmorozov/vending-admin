import { SHOW_OWNER_REGISTRATION_POPUP, HIDE_OWNER_REGISTRATION_POPUP } from '../constants/ownerRegistrationPopup';

const initialState = {
  isOpen: false,
};

const OwnerRegistrationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_OWNER_REGISTRATION_POPUP:
      newState = action.payload;
      break;
    case HIDE_OWNER_REGISTRATION_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default OwnerRegistrationReducer;
