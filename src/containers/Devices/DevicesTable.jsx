import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTrashAlt, faPen, faTv, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import deviceTypes from '../../types/deviceTypes';

import Config from '../../core/config';

import './DevicesTable.css';

const DevicesTable = ({
  sendMessageMethod,
  editDeviceMethod,
  monitoringMethod,
  devices,
  visibleColumns,
  deleteDeviceMethod,
  doSort,
  sort,
  showConfirmPopup,
}) => {
  const column = sort[0] === '-' ? sort.slice(1) : sort;
  const order = sort[0] === '-' ? 'DESC' : 'ASC';

  function getPointColor(userStatus) {
    return userStatus ? 'table-ful-width__point_green' : 'table-ful-width__point_red';
  }
  function renderDevice(device) {
    return (
      <tr key={device.id} className="table-full-width__body_row">
        {visibleColumns.includes('id') && <td className="table-full-width__body_cell">{device.externalId}</td>}
        {visibleColumns.includes('company') && (
          <td className="table-full-width__body_cell table-full-width__body_cell_bold">
            {device.user.shortCompanyName}
          </td>
        )}
        <td />
        {visibleColumns.includes('city') && <td className="table-full-width__body_cell">{device.city}</td>}
        <td />
        {visibleColumns.includes('placementAddress') && (
          <td className="table-full-width__body_cell">{device.placementAddress}</td>
        )}
        <td />
        {visibleColumns.includes('softwareVersion') && (
          <td className="table-full-width__body_cell">{device.softwareVersion}</td>
        )}
        <td />
        {visibleColumns.includes('model') && <td className="table-full-width__body_cell">{device.model}</td>}
        <td />
        {/* <td className="table-full-width__body_cell table-full-width__body_cell_switcher">
          <label className="switcher-wrapper">
            <input
              onChange={() => {
                setStatusMethod(device.id, !device.status);
              }}
              checked={device.status}
              className="switcher__input"
              type="checkbox"
            />
            <span className="switcher-wrapper__switcher" />
          </label>
        </td> */}
        {visibleColumns.includes('status') && (
          <td className="table-full-width__body_cell">
            <div className={`table-full-width__point ${getPointColor(Date.now() / 1000 - device.status < 30)}`} />
          </td>
        )}
        {visibleColumns.includes('userStatus') && (
          <td className="table-full-width__body_cell">
            <div className={`table-full-width__point ${getPointColor(device.user.status)}`} />
          </td>
        )}
        <td />
        {visibleColumns.includes('caretakerFullName') && (
          <td className="table-full-width__body_cell">{device.user.caretakerFullName}</td>
        )}
        <td />
        {visibleColumns.includes('caretakerPhone') && (
          <td className="table-full-width__body_cell">{device.user.caretakerPhone}</td>
        )}
        {visibleColumns.includes('caretakerEmail') && (
          <td className="table-full-width__body_cell caretaker-email">{device.user.caretakerEmail}</td>
        )}
        <td />
        <td className="table-full-width__body_cell">
          <div className="table-full-width__actions_block">
            {Config.isAdmin() && (
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
            )}
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
              onClick={() => {
                monitoringMethod(device.id);
              }}
              className="table-full-width__actions_block_button"
              type="button"
              title="Мониторинг"
            >
              <FontAwesomeIcon className="table-full-width__action_icon" icon={faTv} />
            </button>
            {Config.isAdmin() && (
              <button
                className="table-full-width__actions_block_button"
                type="button"
                onClick={() => {
                  sendMessageMethod(device.user.caretakerEmail, device.user.shortCompanyName);
                }}
              >
                <FontAwesomeIcon className="table-full-width__action_icon" icon={faEnvelope} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  function renderDevices(devices) {
    if (devices.length === 0) {
      return (
        <tr>
          <td className="empty-table-td" colSpan="20">
            Список аппаратов пуст
          </td>
        </tr>
      );
    }

    return devices.map(device => renderDevice(device));
  }

  return (
    <div className="table-full-width">
      <table className="table-full-width__table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            {visibleColumns.includes('id') && (
              <th width="65" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('id');
                  }}
                  type="button"
                >
                  ID{' '}
                  {column === 'id' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            {visibleColumns.includes('company') && (
              <th width="79" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('users.shortCompanyName');
                  }}
                  type="button"
                >
                  Компания{' '}
                  {column === 'users.shortCompanyName' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="20" />
            {visibleColumns.includes('city') && (
              <th width="71" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('city');
                  }}
                  type="button"
                >
                  Город{' '}
                  {column === 'city' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="40" />
            {visibleColumns.includes('placementAddress') && (
              <th width="152" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('placementAddress');
                  }}
                  type="button"
                >
                  Адрес установки{' '}
                  {column === 'placementAddress' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="46" />
            {visibleColumns.includes('softwareVersion') && (
              <th width="23" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('softwareVersion');
                  }}
                  type="button"
                >
                  ПО{' '}
                  {column === 'softwareVersion' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="20" />
            {visibleColumns.includes('model') && (
              <th width="45" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('model');
                  }}
                  type="button"
                >
                  Модель{' '}
                  {column === 'model' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="20" />
            {visibleColumns.includes('status') && (
              <th width="65" className="table-full-width__head_item">
                <div className="table-full-width__head_icon_flex_container">
                  <button
                    onClick={() => {
                      doSort('status');
                    }}
                    type="button"
                  >
                    <div className="table-full-width__head_text">
                      Статус <br /> аппарата
                      {column === 'status' && (
                        <FontAwesomeIcon
                          icon={order === 'ASC' ? faCaretDown : faCaretUp}
                          className="table-full-width__head_icon"
                        />
                      )}
                    </div>
                  </button>
                </div>
              </th>
            )}
            {visibleColumns.includes('userStatus') && (
              <th width="16" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('user.status');
                  }}
                  type="button"
                >
                  СВ{' '}
                  {column === 'user.status' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="20" />
            {visibleColumns.includes('caretakerFullName') && (
              <th width="134" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('user.caretakerFullName');
                  }}
                  type="button"
                >
                  Ответственное лицо{' '}
                  {column === 'user.caretakerFullName' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="20" />
            {visibleColumns.includes('caretakerPhone') && (
              <th width="95" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('user.caretakerPhone');
                  }}
                  type="button"
                >
                  Телефон{' '}
                  {column === 'user.caretakerPhone' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            {visibleColumns.includes('caretakerEmail') && (
              <th width="200" className="table-full-width__head_item">
                <div className="table-full-width__head_icon_flex_container">
                  <button
                    onClick={() => {
                      doSort('user.caretakerEmail');
                    }}
                    type="button"
                  >
                    <div className="table-full-width__head_text table-full-width__head_text_nowrap">
                      E-mail <br /> ответственного лица
                      {column === 'user.caretakerEmail' && (
                        <FontAwesomeIcon
                          icon={order === 'ASC' ? faCaretDown : faCaretUp}
                          className="table-full-width__head_icon"
                        />
                      )}
                    </div>
                  </button>
                </div>
              </th>
            )}
            <th width="10" />
            <th width="82" />
          </tr>
        </thead>
        <tbody>{renderDevices(devices)}</tbody>
      </table>
    </div>
  );
};

DevicesTable.propTypes = {
  sendMessageMethod: PropTypes.func.isRequired,
  editDeviceMethod: PropTypes.func.isRequired,
  setStatusMethod: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(deviceTypes),
};

DevicesTable.defaultProps = {
  devices: [],
};

export default DevicesTable;
