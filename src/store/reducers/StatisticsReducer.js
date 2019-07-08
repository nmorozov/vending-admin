import { fromJS } from 'immutable';

import {
    FETCH_COINS_STAT_START,
    FETCH_COINS_STAT_FINISH,
    FETCH_COINS_STAT_FAILED,
    FETCH_ENVELOPES_STAT_START,
    FETCH_ENVELOPES_STAT_FINISH,
    FETCH_ENVELOPES_STAT_FAILED,
} from '../constants/statistics';

const initialState = fromJS({
  cities: [],
  data: [],
  cityData: {},
  dateData: {},
  isLoading: false,
  isLoadingFinished: false,
});

export default function coinsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case FETCH_COINS_STAT_START:
      newState = state
        //.set('cities', [])
        //.set('data', [])
        //.set('cityData', {})
        //.set('dateData', {})
        .set('isLoading', true)
        .set('isLoadingFinished', false);
      break;
    case FETCH_COINS_STAT_FINISH:
      newState = state
        .set('isLoading', false)
        .set('cities', action.payload.cities)
        .set('data', action.payload.data)
        .set('cityData', action.payload.cityData)
        .set('dateData', action.payload.dateData)
        .set('isLoadingFinished', true);
      break;
    case FETCH_COINS_STAT_FAILED:
      newState = state
        .set('cities', [])
        .set('data', [])
        .set('cityData', {})
        .set('dateData', {})
        .set('isLoading', false);
      break;
    case FETCH_ENVELOPES_STAT_START:
      newState = state
        //.set('cities', [])
        //.set('data', [])
        //.set('cityData', {})
        //.set('dateData', {})
        .set('isLoading', true)
        .set('isLoadingFinished', false);
      break;
    case FETCH_ENVELOPES_STAT_FINISH:
    console.log(action);
      newState = state
        .set('isLoading', false)
        .set('cities', action.payload.cities)
        .set('data', action.payload.data)
        .set('cityData', action.payload.cityData)
        .set('dateData', action.payload.dateData)
        .set('isLoadingFinished', true);
      break;
    case FETCH_ENVELOPES_STAT_FAILED:
      newState = state
        .set('cities', [])
        .set('data', [])
        .set('cityData', {})
        .set('dateData', {})
        .set('isLoading', false);
      break;
    default:
      return state;
  }

  return newState || state;
}
