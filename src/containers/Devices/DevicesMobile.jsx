import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './DevicesMobile.css';

function getPointColor(userStatus) {
  return userStatus ? 'table-ful-width__point_green' : 'table-ful-width__point_red';
}

const DevicesMobile = ({ devices, editDeviceMethod, deleteDeviceMethod, sendMessageMethod, showConfirmPopup }) => {
  function renderDevices(devices) {
    return devices.map(device => (
      <div className="device-mobile__wrap">
        <div key={device.id} className="device-mobile__device">
          <div className="device-mobile__device_captions">
            <div className="device-mobile__device_caption">ID</div>
            <div className="device-mobile__device_caption">Компания</div>
            <div className="device-mobile__device_caption">Город</div>
            <div className="device-mobile__device_caption">Адрес установки</div>
            <div style={{ marginTop: '35px' }} className="device-mobile__device_caption">
              ПО
            </div>
            <div className="device-mobile__device_caption">Модель</div>
            <div className="device-mobile__device_caption">Статус аппарата</div>
            <div className="device-mobile__device_caption">СВ</div>
            <div className="device-mobile__device_caption">Ответ. лицо</div>
            <div className="device-mobile__device_caption">Телефон</div>
            <div className="device-mobile__device_caption">
              E-mail
              <br />
              ответственного лица
            </div>
          </div>
          <div className="device-mobile__device_values">
            <div className="device-mobile__device_value">{device.id}</div>
            <div className="device-mobile__device_value">{device.user.shortCompanyName}</div>
            <div className="device-mobile__device_value">{device.city}</div>
            <div className="device-mobile__device_value">{device.placementAddress}</div>
            <div className="device-mobile__device_value">{device.softwareVersion}</div>
            <div className="device-mobile__device_value">{device.model}</div>
            <div className="device-mobile__device_value">
              <div className={`table-full-width__point ${getPointColor(Date.now() / 1000 - device.status < 30)}`} />
            </div>
            <div className="device-mobile__device_value">
              <div className={`table-full-width__point ${getPointColor(device.user.status)}`} />
            </div>
            <div className="device-mobile__device_value">{device.user.caretakerFullName}</div>
            <div className="device-mobile__device_value">{device.user.caretakerPhone}</div>
            <div className="device-mobile__device_value" style={{ wordBreak: 'break-all' }}>
              {device.user.caretakerEmail}
            </div>
          </div>
        </div>
        <div className="table-full-width__actions_block" style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              showConfirmPopup(() => {
                deleteDeviceMethod(device.id);
              });
            }}
            className="table-full-width__actions_block_button"
            type="button"
          >
            <FontAwesomeIcon className="table-full-width__action_icon" icon={faTrashAlt} />
          </button>
          <button
            onClick={() => {
              editDeviceMethod(device.id);
            }}
            className="table-full-width__actions_block_button"
            type="button"
          >
            <FontAwesomeIcon className="table-full-width__action_icon" icon={faPen} />
          </button>
          <button
            className="table-full-width__actions_block_button"
            type="button"
            onClick={() => {
              sendMessageMethod(device.caretakerEmail, device.shortCompanyName);
            }}
          >
            <FontAwesomeIcon className="table-full-width__action_icon" icon={faEnvelope} />
          </button>
        </div>
      </div>
    ));
  }
  return <div className="devices-mobile">{renderDevices(devices)}</div>;
};

export default DevicesMobile;
