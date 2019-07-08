import { message } from 'antd';
import { SHOW_ADD_EDIT_DEVICE_POPUP, HIDE_ADD_EDIT_DEVICE_POPUP } from '../constants/addEditDevicePopup';
import Request from '../../core/request';
import { fetchDevices, updateDeviceStart, updateDeviceFinish, updateDeviceFailed } from './DeviceActions';
import { fetchOwners } from './OwnerActions';
import Config from '../../core/config';

const generateShowPopupObject = deviceData => ({
  type: SHOW_ADD_EDIT_DEVICE_POPUP,
  payload: { ...deviceData, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_ADD_EDIT_DEVICE_POPUP,
  payload: { isOpen: false },
});

export function showAddEditDevicePopup(deviceId) {
  if (typeof deviceId === 'number') {
    return dispatch => {
      dispatch(fetchOwners(0, { column: 'id', order: 'ASC' }));
      Request.doGetInterlanContent('doGetDevice', deviceId).then(response => {
        dispatch(generateShowPopupObject(response));
      });
    };
  }
  return dispatch => {
    dispatch(fetchOwners(0, { column: 'id', order: 'ASC' }));
    dispatch(generateShowPopupObject({}));
  };
}

export function hideAddEditDevicePopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function createDevice(deviceData, dispatch) {
  const formattedDeviceData = {
    externalId: deviceData.externalId,
    userId: Config.isAdmin() ? deviceData.userId : Config.get('user_id'),
    country: deviceData.country,
    city: deviceData.city,
    placementAddress: deviceData.placementAddress,
    softwareVersion: deviceData.softwareVersion,
    model: deviceData.model,
    serialNumber: deviceData.serialNumber,
    status: 1,
    spiritCoins: deviceData.spiritCoins,
    envelopes: deviceData.envelopes,
  };

  Request.doGetInterlanContent('doCreateDevice', formattedDeviceData)
    .then(() => {
      dispatch(generateHidePopupObject());
      dispatch(fetchDevices(0, JSON.parse(localStorage.getItem('devicesSort'))));
      message.success('Устройство успешно создано');
    })
    .catch(() => {
      message.error('Не удалось создать устройство');
    });
}

export function updateDevice(deviceData, dispatch) {
  const formattedDeviceData = {
    id: deviceData.id,
    userId: Config.isAdmin() ? deviceData.userId : Config.get('user_id'),
    externalId: deviceData.externalId,
    country: deviceData.country,
    city: deviceData.city,
    placementAddress: deviceData.placementAddress,
    softwareVersion: deviceData.softwareVersion,
    model: deviceData.model,
    serialNumber: deviceData.serialNumber,
    status: 1,
    spiritCoins: deviceData.spiritCoins,
    envelopes: deviceData.envelopes,
  };

  dispatch(updateDeviceStart());

  return dispatch => {
    Request.doGetInterlanContent('doUpdateDevice', formattedDeviceData)
      .then(device => {
        dispatch(generateHidePopupObject());
        dispatch(fetchDevices(0, JSON.parse(localStorage.getItem('devicesSort'))));
        message.success('Устройство успешно обновлено');
        return dispatch(updateDeviceFinish(device));
      })
      .catch(() => {
        message.error('Не удалось обновить устройство');
        dispatch(updateDeviceFailed());
      });
  };
}
