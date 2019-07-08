import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_DEVICES_START,
  FETCH_DEVICES_FINISH,
  FETCH_DEVICES_FAILED,
  UPDATE_DEVICE_STATUS_START,
  UPDATE_DEVICE_STATUS_FINISH,
  UPDATE_DEVICE_STATUS_FAILED,
  UPDATE_DEVICE_START,
  UPDATE_DEVICE_FINISH,
  UPDATE_DEVICE_FAILED,
} from '../constants/devices';

const fetchDevicesStart = from => ({ type: FETCH_DEVICES_START, from });
const fetchDevicesFinish = payload => ({ type: FETCH_DEVICES_FINISH, payload });
const fetchDevicesFailed = () => ({ type: FETCH_DEVICES_FAILED });

const updateDeviceStatusStart = () => ({ type: UPDATE_DEVICE_STATUS_START });
const updateDeviceStatusFinish = (deviceId, status) => ({
  type: UPDATE_DEVICE_STATUS_FINISH,
  payload: { deviceId, status },
});
const updateDeviceStatusFailed = () => ({ type: UPDATE_DEVICE_STATUS_FAILED });

export const updateDeviceStart = () => ({ type: UPDATE_DEVICE_START });
export const updateDeviceFinish = device => ({
  type: UPDATE_DEVICE_FINISH,
  payload: device,
});
export const updateDeviceFailed = () => ({ type: UPDATE_DEVICE_FAILED });

export function fetchDevices(from, params = {}) {
  return dispatch => {
    dispatch(fetchDevicesStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetDevices', pagination)
      .then(response => {
        dispatch(fetchDevicesFinish(response.devices));
      })
      .catch(e => {
        console.log(e);
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchDevicesFailed());
      });
  };
}

export function setStatus(deviceId, status) {
  return dispatch => {
    dispatch(updateDeviceStatusStart());

    Request.doGetInterlanContent('doSetDeviceStatus', { deviceId, status })
      .then(() => {
        dispatch(updateDeviceStatusFinish(deviceId, status));
        message.success('Статус успешно изменён');
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(updateDeviceStatusFailed());
      });
  };
}

export function deleteDevice(id) {
  return dispatch => {
    Request.doGetInterlanContent('doDeleteDevice', id)
      .then(() => {
        dispatch(fetchDevices(0));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchDevicesFailed());
      });
  };
}
