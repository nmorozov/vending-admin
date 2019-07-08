import React from 'react';

import NumberFormat from 'react-number-format';
import { formatDate } from 'react-day-picker/moment';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import orderTypes from '../../types/orderTypes';

const OrdersTable = ({ orders, editOrderMethod, visibleColumns, doSort, sort }) => {
  let column = sort[0] === '-' ? sort.slice(1) : sort;
  let order = sort[0] === '-' ? 'DESC' : 'ASC';

  function renderOrder(order) {
    return (
      <tr onClick={() => editOrderMethod(order.id)} key={order.id} className="table-full-width__body_row">
        {visibleColumns.includes('id') && <td className="table-full-width__body_cell">{order.id}</td>}
        {visibleColumns.includes('date') && (
          <td className="table-full-width__body_cell table-full-width__body_cell_bold">
            {formatDate(order.date, 'DD.MM.YYYY', 'ru')}
          </td>
        )}
        <td />
        {visibleColumns.includes('order1cNumber') && (
          <td className="table-full-width__body_cell">{order.order1cNumber}</td>
        )}
        <td />
        {visibleColumns.includes('company') && <td className="table-full-width__body_cell">{order.company}</td>}
        <td />
        {visibleColumns.includes('country') && <td className="table-full-width__body_cell">{order.country}</td>}
        <td />
        {visibleColumns.includes('city') && <td className="table-full-width__body_cell">{order.city}</td>}
        <td />
        {visibleColumns.includes('total') && (
          <td className="table-full-width__body_cell">
            <NumberFormat value={order.total} displayType="text" thousandSeparator=" " suffix=" руб." />
          </td>
        )}
      </tr>
    );
  }
  function renderOrders(orders) {
    if (orders.length === 0) {
      return (
        <tr>
          <td className="empty-table-td" colSpan="12">
            Список заказов пуст
          </td>
        </tr>
      );
    }

    return orders.map(owner => renderOrder(owner));
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
            {visibleColumns.includes('date') && (
              <th width="57" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('date');
                  }}
                  type="button"
                >
                  Дата{' '}
                  {column === 'date' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="50" />
            {visibleColumns.includes('order1cNumber') && (
              <th width="100" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('order1cNumber');
                  }}
                  type="button"
                >
                  Номер заказа{' '}
                  {column === 'order1cNumber' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="50" />
            {visibleColumns.includes('company') && (
              <th width="124" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('company');
                  }}
                  type="button"
                >
                  Компания{' '}
                  {column === 'company' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="50" />
            {visibleColumns.includes('country') && (
              <th width="87" className="table-full-width__head_item">
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
            <th width="50" />
            {visibleColumns.includes('city') && (
              <th width="87" className="table-full-width__head_item">
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
            <th width="50" />
            {visibleColumns.includes('total') && (
              <th width="100" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('total');
                  }}
                  type="button"
                >
                  Сумма{' '}
                  {column === 'total' && (
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
        <tbody>{renderOrders(orders)}</tbody>
      </table>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(orderTypes),
  editOrderMethod: PropTypes.func.isRequired,
};

OrdersTable.defaultProps = {
  orders: [],
};

export default OrdersTable;
