import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const SalesStatisticsTable = ({ cities, data, cityData, currentEntity, doSort, sort }) => {
  const column = sort[0] === '-' ? sort.slice(1) : sort;
  const order = sort[0] === '-' ? 'DESC' : 'ASC';

  return (
    <div className="sales-statistics-table-wrapper">
      <table className="sales-statistics-table__table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th width="38" className="sales-statistics-table__head_item">
              <button
                onClick={() => {
                  doSort('id');
                }}
                type="button"
              >
                ID
                {column === 'id' && (
                  <FontAwesomeIcon
                    icon={order === 'ASC' ? faCaretDown : faCaretUp}
                    className="table-full-width__head_icon"
                  />
                )}
              </button>
            </th>
            <th width="40" />
            <th width="200" className="sales-statistics-table__head_item">
              <button
                onClick={() => {
                  doSort('name');
                }}
                type="button"
              >
                {`${currentEntity === 'coins' ? 'Монеты' : 'Конверты'}`}
                {column === 'name' && (
                  <FontAwesomeIcon
                    icon={order === 'ASC' ? faCaretDown : faCaretUp}
                    className="table-full-width__head_icon"
                  />
                )}
              </button>
            </th>
            {cities.map((city, i) => {
              if (cityData[`city_${city}`] === undefined) return false;
              return (
              <th className="sales-statistics-table__head_item" key={i}>
                <button
                  onClick={() => {
                    doSort(`city_${city}`);
                  }}
                  type="button"
                >
                  {city}
                  {column === `city_${city}` && (
                    <FontAwesomeIcon
                      icon={order === 'ASC' ? faCaretDown : faCaretUp}
                      className="table-full-width__head_icon"
                    />
                  )}
                </button>
              </th>
            )})}
            <th className="sales-statistics-table__head_item">
              <button
                onClick={() => {
                  doSort('all');
                }}
                type="button"
              >
                Всего
                {column === 'all' && (
                  <FontAwesomeIcon
                    icon={order === 'ASC' ? faCaretDown : faCaretUp}
                    className="table-full-width__head_icon"
                  />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            if (d.all === undefined) return false;
            return (
              <tr className="sales-statistics-table__body_row" key={d.id}>
                <td className="sales-statistics-table__body_cell">{d.id}</td>
                <td className="sales-statistics-table__body_cell" />
                <td className="sales-statistics-table__body_cell">{d.name}</td>
                {cities.map((city, k) => {
                  if (cityData[`city_${city}`] === undefined) return false;
                  return (
                    <td className="sales-statistics-table__body_cell" key={k}>
                      {d[`city_${city}`] || 0}
                    </td>
                  );
                })}
                <td className="sales-statistics-table__body_cell">{d.all}</td>
              </tr>
            )})}
          <tr className="sales-statistics-table__body_row">
            <td className="sales-statistics-table__body_cell" />
            <td className="sales-statistics-table__body_cell" />
            <td className="sales-statistics-table__body_cell">Всего</td>
            {cities.map((city, i) => {
              if (cityData[`city_${city}`] === undefined) return false;
              return (
                <td className="sales-statistics-table__body_cell" key={i}>
                  {cityData[`city_${city}`] || 0}
                </td>
              )})}
            <td className="sales-statistics-table__body_cell">{cityData.all}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesStatisticsTable;
