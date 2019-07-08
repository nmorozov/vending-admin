import { fromJS } from 'immutable';

import {
  FETCH_DEVICES_START,
  FETCH_DEVICES_FINISH,
  FETCH_DEVICES_FAILED,
  LOAD_DEVICES_LIMIT,
  UPDATE_DEVICE_STATUS_START,
  UPDATE_DEVICE_STATUS_FINISH,
  UPDATE_DEVICE_STATUS_FAILED,
  UPDATE_DEVICE_START,
  UPDATE_DEVICE_FINISH,
  UPDATE_DEVICE_FAILED,
} from '../constants/devices';

const initialState = fromJS({
  devices: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function devicesReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case FETCH_DEVICES_START:
      if (action.from === 0) {
        newState = state
          .set('devices', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_DEVICES_FINISH:
      if (action.payload.length > 0) {
        newState = state
          .set('isLoading', false)
          .update('devices', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set('isLoadingFinished', action.payload.length !== LOAD_DEVICES_LIMIT);
      } else {
        newState = state.set('isLoading', false).set('isLoadingFinished', true);
      }
      break;
    case FETCH_DEVICES_FAILED:
      newState = state.set('devices', []).set('isLoading', false);
      break;
    case UPDATE_DEVICE_STATUS_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_DEVICE_STATUS_FINISH:
      newState = state.set('isLoading', false).update('devices', value => {
        const newDevices = value;
        const deviceIndex = value.findIndex(i => i.id === action.payload.deviceId);
        newDevices[deviceIndex].status = action.payload.status;
        return newDevices;
      });
      break;
    case UPDATE_DEVICE_STATUS_FAILED:
      newState = state.set('isLoading', false);
      break;
    case UPDATE_DEVICE_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_DEVICE_FAILED:
      newState = state.set('isLoading', false);
      break;
    case UPDATE_DEVICE_FINISH:
      newState = state.set('isLoading', false).update('devices', value => {
        const newDevices = value;
        const deviceIndex = value.findIndex(i => i.id === action.payload.id);
        newDevices[deviceIndex] = action.payload;
        return newDevices;
      });
      break;
    default:
      return state;
  }

  return newState || state;
}
