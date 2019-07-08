import { fromJS } from 'immutable';

import {
  FETCH_OWNERS_START,
  FETCH_OWNERS_FINISH,
  FETCH_OWNERS_FAILED,
  LOAD_OWNERS_LIMIT,
  UPDATE_OWNER_START,
  UPDATE_OWNER_FINISH,
  UPDATE_OWNER_FAILED,
} from '../constants/owners';

const initialState = fromJS({
  owners: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function ownersReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case FETCH_OWNERS_START:
      if (action.from === 0) {
        newState = state
          .set('owners', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_OWNERS_FINISH:
      if (action.payload.length > 0) {
        newState = state
          .set('isLoading', false)
          .update('owners', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set('isLoadingFinished', action.payload.length !== LOAD_OWNERS_LIMIT);
      } else {
        newState = state.set('isLoading', false).set('isLoadingFinished', true);
      }
      break;
    case FETCH_OWNERS_FAILED:
      newState = state.set('owners', []).set('isLoading', false);
      break;
    case UPDATE_OWNER_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_OWNER_FAILED:
      newState = state.set('isLoading', false);
      break;
    case UPDATE_OWNER_FINISH:
      newState = state.set('isLoading', false).update('owners', value => {
        const newOwners = value;
        const ownerIndex = value.findIndex(i => i.id === action.payload.id);
        newOwners[ownerIndex] = action.payload;
        return newOwners;
      });
      break;
    default:
      return state;
  }

  return newState || state;
}
