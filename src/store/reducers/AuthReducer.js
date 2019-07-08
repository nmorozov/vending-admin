import { fromJS } from 'immutable';

import { LOGIN_FINISH } from '../constants/auth';

const initialState = fromJS({
  user: {},
});

export default function AuthReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case LOGIN_FINISH:
      if (action.payload) {
        newState = state.set('user', action.payload);
      }
      break;
    default:
      return state;
  }

  return newState || state;
}
