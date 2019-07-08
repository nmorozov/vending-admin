import { fromJS } from 'immutable';

import {
  FETCH_COINS_START,
  FETCH_COINS_FINISH,
  FETCH_COINS_FAILED,
  LOAD_COINS_LIMIT,
  UPDATE_COIN_START,
  UPDATE_COIN_FINISH,
  UPDATE_COIN_FAILED,
} from '../constants/coins';

const initialState = fromJS({
  coins: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function coinsReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_COINS_START:
      if (action.from === 0) {
        newState = state
          .set('coins', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_COINS_FINISH:
      if (action.payload.length > 0) {
        newState = state
          .set('isLoading', false)
          .update('coins', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set('isLoadingFinished', action.payload.length !== LOAD_COINS_LIMIT);
      } else {
        newState = state.set('isLoading', false).set('isLoadingFinished', true);
      }
      break;
    case FETCH_COINS_FAILED:
      newState = state.set('coins', []).set('isLoading', false);
      break;
    case UPDATE_COIN_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_COIN_FINISH:
      newState = state.set('isLoading', false).update('coins', value => {
        const newCoins = value;
        const coinIndex = value.findIndex(i => i.id === action.payload.id);
        newCoins[coinIndex] = action.payload;
        return newCoins;
      });
      break;
    case UPDATE_COIN_FAILED:
      newState = state.set('isLoading', false);
      break;
    default:
      return state;
  }

  return newState || state;
}
