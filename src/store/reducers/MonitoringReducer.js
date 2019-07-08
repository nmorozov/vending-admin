import { SHOW_MONITORING_POPUP, HIDE_MONITORING_POPUP } from '../constants/monitoringPopup';

const initialState = {
  isOpen: false,
};

const MonitoringReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_MONITORING_POPUP:
      newState = action.payload;
      break;
    case HIDE_MONITORING_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default MonitoringReducer;
