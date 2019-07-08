import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import envelopeTypes from '../../types/envelopeTypes';

import { SERVER_URL } from '../../core/request';

import './EnvelopesTable.css';

const EnvelopesTable = ({ envelopes, editEnvelopeMethod, visibleColumns, doSort, sort }) => {
  let column = sort[0] === '-' ? sort.slice(1) : sort;
  let order = sort[0] === '-' ? 'DESC' : 'ASC';

  function renderEnvelope(envelope) {
    return (
      <tr
        onClick={() => {
          editEnvelopeMethod(envelope.id);
        }}
        key={envelope.id}
        className="table-full-width__body_row"
      >
        {visibleColumns.includes('id') && <td className="table-full-width__body_cell">{envelope.id}</td>}
        {visibleColumns.includes('name') && (
          <td className="table-full-width__body_cell table-full-width__body_cell_bold">{envelope.name}</td>
        )}
        <td />
        {visibleColumns.includes('picture') && (
          <td className="table-full-width__body_cell center">
            <img
              className="envelopes-table__envelope_image"
              src={`${SERVER_URL}/${envelope.picture}`}
              alt={envelope.name}
            />
          </td>
        )}
        <td />
        {visibleColumns.includes('note') && <td className="table-full-width__body_cell">{envelope.note}</td>}
      </tr>
    );
  }

  function renderEnvelopes(envelopes) {
    if (envelopes.length === 0) {
      return (
        <tr>
          <td className="empty-table-td" colSpan="6">
            Список конвертов пуст
          </td>
        </tr>
      );
    }

    return envelopes.map(owner => renderEnvelope(owner));
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
            {visibleColumns.includes('name') && (
              <th width="180" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('name');
                  }}
                  type="button"
                >
                  Имя{' '}
                  {column === 'name' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="70" />
            {visibleColumns.includes('picture') && (
              <th width="100" className="table-full-width__head_item center">
                <div>
                  <button
                    onClick={() => {
                      doSort('picture');
                    }}
                    type="button"
                  >
                    Изображение{' '}
                    {column === 'picture' && (
                      <FontAwesomeIcon
                        icon={order === 'ASC' ? faCaretDown : faCaretUp}
                        className="table-full-width__head_icon"
                      />
                    )}
                  </button>
                </div>
              </th>
            )}
            <th width="70" />
            {visibleColumns.includes('note') && (
              <th className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('note');
                  }}
                  type="button"
                >
                  Примечание{' '}
                  {column === 'note' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>{renderEnvelopes(envelopes)}</tbody>
      </table>
    </div>
  );
};

EnvelopesTable.propTypes = {
  envelopes: PropTypes.arrayOf(envelopeTypes),
  editEnvelopeMethod: PropTypes.func.isRequired,
};

EnvelopesTable.defaultProps = {
  envelopes: [],
};

export default EnvelopesTable;
