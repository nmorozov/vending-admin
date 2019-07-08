import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import coinTypes from '../../types/coinTypes';

import { SERVER_URL } from '../../core/request';

import coinCategories from '../../store/constants/coinCategories';

import './CoinsTable.css';

const getCategoryByCategoryCode = categoryCode => {
  const coinCategory = coinCategories.find(x => x.categoryCode === categoryCode);
  return coinCategory && coinCategory.category;
};

const CoinsTable = ({ coins, editCoinMethod, visibleColumns, doSort, sort }) => {
  let column = sort[0] === '-' ? sort.slice(1) : sort;
  let order = sort[0] === '-' ? 'DESC' : 'ASC';

  function renderCoin(coin) {
    return (
      <tr onClick={() => editCoinMethod(coin.id)} key={coin.id} className="table-full-width__body_row">
        {visibleColumns.includes('id') && <td className="table-full-width__body_cell">{coin.id}</td>}
        {visibleColumns.includes('name') && (
          <td className="table-full-width__body_cell table-full-width__body_cell_bold">{coin.name}</td>
        )}
        <td />
        {visibleColumns.includes('categoryCode') && (
          <td className="table-full-width__body_cell">{getCategoryByCategoryCode(coin.categoryCode)}</td>
        )}
        <td />
        {visibleColumns.includes('city') && <td className="table-full-width__body_cell">{coin.city}</td>}
        <td />
        {visibleColumns.includes('country') && <td className="table-full-width__body_cell">{coin.country}</td>}
        <td />
        {visibleColumns.includes('frontPicture') && (
          <td className="table-full-width__body_cell">
            <img className="coins-table__coin_image" src={`${SERVER_URL}/${coin.frontPicture}`} alt={coin.name} />
          </td>
        )}
      </tr>
    );
  }

  function renderCoins(coins) {
    if (coins.length === 0) {
      return (
        <tr>
          <td className="empty-table-td" colSpan="10">
            Список монет пуст
          </td>
        </tr>
      );
    }

    return coins.map(coin => renderCoin(coin));
  }

  return (
    <div className="table-full-width coins-table">
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
              <th width="178" className="table-full-width__head_item">
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
            <th width="127" />
            {visibleColumns.includes('categoryCode') && (
              <th width="167" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('categoryCode');
                  }}
                  type="button"
                >
                  Тип{' '}
                  {column === 'categoryCode' && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )}
            <th width="126" />
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
            <th width="142" />
            {visibleColumns.includes('country') && (
              <th width="71" className="table-full-width__head_item">
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
            <th width="152" />
            {visibleColumns.includes('frontPicture') && (
              <th width="100" className="table-full-width__head_item">
                <button
                  onClick={() => {
                    doSort('frontPicture');
                  }}
                  type="button"
                >
                  Изображение{' '}
                  {column === 'frontPicture' && (
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
        <tbody>{renderCoins(coins)}</tbody>
      </table>
    </div>
  );
};

CoinsTable.propTypes = {
  coins: PropTypes.arrayOf(coinTypes),
  editCoinMethod: PropTypes.func.isRequired,
};

CoinsTable.defaultProps = {
  coins: [],
};

export default CoinsTable;
