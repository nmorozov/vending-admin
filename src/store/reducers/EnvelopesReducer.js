import { fromJS } from 'immutable';

import {
  FETCH_ENVELOPES_START,
  FETCH_ENVELOPES_FINISH,
  FETCH_ENVELOPES_FAILED,
  LOAD_ENVELOPES_LIMIT,
  UPDATE_ENVELOPE_START,
  UPDATE_ENVELOPE_FINISH,
  UPDATE_ENVELOPE_FAILED,
} from '../constants/envelopes';

const initialState = fromJS({
  envelopes: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function envelopesReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_ENVELOPES_START:
      if (action.from === 0) {
        newState = state
          .set('envelopes', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_ENVELOPES_FINISH:
      if (action.payload.length > 0) {
        newState = state
          .set('isLoading', false)
          .update('envelopes', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set('isLoadingFinished', action.payload.length !== LOAD_ENVELOPES_LIMIT);
      } else {
        newState = state.set('isLoading', false).set('isLoadingFinished', true);
      }
      break;
    case FETCH_ENVELOPES_FAILED:
      newState = state.set('envelopes', []).set('isLoading', false);
      break;
    case UPDATE_ENVELOPE_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_ENVELOPE_FAILED:
      newState = state.set('isLoading', false);
      break;
    case UPDATE_ENVELOPE_FINISH:
      newState = state.set('isLoading', false).update('envelopes', value => {
        const newEnvelopes = value;
        const envelopeIndex = value.findIndex(i => i.id === action.payload.id);
        newEnvelopes[envelopeIndex] = action.payload;
        return newEnvelopes;
      });
      break;
    default:
      return state;
  }

  return newState || state;
}
