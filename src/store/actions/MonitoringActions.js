import { SHOW_MONITORING_POPUP, HIDE_MONITORING_POPUP } from '../constants/monitoringPopup';
import Request from '../../core/request';

const generateShowPopupObject = monitoringData => ({
  type: SHOW_MONITORING_POPUP,
  payload: { ...monitoringData, isOpen: true },
});

export const generateHidePopupObject = () => ({
  type: HIDE_MONITORING_POPUP,
  payload: { isOpen: false },
});

export function showMonitoringPopup(deviceId) {
  return dispatch => {
    Request.doGetInterlanContent('doGetMonitoring', deviceId).then(response => {
      dispatch(generateShowPopupObject(response));
    });
  };
}

export function hideMonitoringPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}
