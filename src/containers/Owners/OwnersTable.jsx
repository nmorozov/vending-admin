import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTrashAlt, faPen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import ownerTypes from '../../types/ownerTypes';

import './OwnersTable.css';

const OwnersTable = ({
  sendMessageMethod,
  editOwnerMethod,
  owners,
  visibleColumns,
  deleteOwnerMethod,
  doSort,
  sort,
  showConfirmPopup,
}) => {
  const column = sort[0] === '-' ? sort.slice(1) : sort;
  const order = sort[0] === '-' ? 'DESC' : 'ASC';

  function getPointColor(userStatus) {
    return userStatus ? 'table-ful-width__point_green' : 'table-ful-width__point_red';
  }

  function renderOwner(owner) {
    return (
      <tr key={owner.id} className="table-full-width__body_row">
        {visibleColumns.includes('id') && <td className="table-full-width__body_cell">{owner.id}</td>}
        {visibleColumns.includes('company') && (
          <td className="table-full-width__body_cell table-full-width__body_cell_bold">{owner.shortCompanyName}</td>
        )}
        {visibleColumns.includes('country') && <td className="table-full-width__body_cell">{owner.country}</td>}
        {visibleColumns.includes('city') && <td className="table-full-width__body_cell">{owner.city}</td>}
        <td />
        {visibleColumns.includes('status') && (
          <td className="table-full-width__body_cell">
            <div className={`table-full-width__point ${getPointColor(owner.status)}`} />
          </td>
        )}
        <td />
        {visibleColumns.includes('caretaker') && (
          <td className="table-full-width__body_cell">{owner.caretakerFullName}</td>
        )}
        <td />
        {visibleColumns.includes('phone') && <td className="table-full-width__body_cell">{owner.caretakerPhone}</td>}
        <td />
        {visibleColumns.includes('email') && <td className="table-full-width__body_cell">{owner.ownerEmail}</td>}
        <td />
        <td className="table-full-width__body_cell">
          <div className="table-full-width__actions_block">
            {owner.id > 2 && (
              <button
                onClick={() => {
                  showConfirmPopup(() => {
                    deleteOwnerMethod(owner.id);
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
                editOwnerMethod(owner.id);
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
                sendMessageMethod(owner.caretakerEmail, owner.shortCompanyName);
              }}
            >
              <FontAwesomeIcon className="table-full-width__action_icon" icon={faEnvelope} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function renderOwners(owners) {
    if (owners.length === 0) {
      return (
        <tr>
          <td className="empty-table-td" colSpan="14">
            Список владельцев пуст
          </td>
        </tr>
      );
    }

    return owners.map(owner => renderOwner(owner));
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
              <th width="134" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('shortCompanyName');
                  }}
                  type="button"
                >
                  Компания{' '}
                  {column === 'shortCompanyName' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            {visibleColumns.includes('country') && (
              <th width="75" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('country');
                  }}
                  type="button"
                >
                  Страна{' '}
                  {column === 'country' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
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
            <th width="61" />
            {visibleColumns.includes('status') && (
              <th width="47" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('status');
                  }}
                  type="button"
                >
                  СВ{' '}
                  {column === 'status' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="60" />
            {visibleColumns.includes('caretaker') && (
              <th width="158" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('caretakerFullName');
                  }}
                  type="button"
                >
                  Ответственное лицо{' '}
                  {column === 'caretakerFullName' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="60" />
            {visibleColumns.includes('phone') && (
              <th width="95" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('caretakerPhone');
                  }}
                  type="button"
                >
                  Телефон{' '}
                  {column === 'caretakerPhone' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="60" />
            {visibleColumns.includes('email') && (
              <th width="144" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('ownerEmail');
                  }}
                  type="button"
                >
                  E-mail владельца{' '}
                  {column === 'ownerEmail' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="86" />
            <th width="82" />
          </tr>
        </thead>
        <tbody>{renderOwners(owners)}</tbody>
      </table>
    </div>
  );
};

OwnersTable.propTypes = {
  sendMessageMethod: PropTypes.func.isRequired,
  editOwnerMethod: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(ownerTypes),
};

OwnersTable.defaultProps = {
  owners: [],
};

export default OwnersTable;
