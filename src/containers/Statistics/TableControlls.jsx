import React from 'react';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faCalendarAlt, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ExportStatisticsPopup from '../Popups/ExportStatisticsPopup';
import { showExportStatisticsPopup } from '../../store/actions/ExportStatisticsPopup';

import './TableControlls.css';

class TableControlls extends React.Component {
  state = {
    isIntervalFilterOpened: false,
    isCoinsFilterOpened: false,
    isCityFilterOpened: false,
    isEnvelopesFilteredOpened: false,
  };

  toggleIntervalFilter = () => {
    this.setState(prevState => ({ isIntervalFilterOpened: !prevState.isIntervalFilterOpened }));
  };

  toggleCityFilter = () => {
    this.setState(prevState => ({ isCityFilterOpened: !prevState.isCityFilterOpened }));
  };

  toggleEnvelopesFilter = () => {
    this.setState(prevState => ({ isEnvelopesFilteredOpened: !prevState.isEnvelopesFilteredOpened }));
  };

  toggleCoinsFilter = () => {
    this.setState(prevState => ({ isCoinsFilterOpened: !prevState.isCoinsFilterOpened }));
  };

  render() {
    const {
      toogleCurrentEntity,
      currentEntity,
      renderedCoinsFilter,
      showExportStatisticsPopup,
      renderedEnvelopesFilter,
      renderedCitiesFilter,
      renderIntervalFilter,
      filter,
    } = this.props;
    const { isCoinsFilterOpened, isEnvelopesFilteredOpened, isCityFilterOpened, isIntervalFilterOpened } = this.state;
    return (
      <div className="table-controlls-wrapper">
        <ExportStatisticsPopup currentEntity={currentEntity} filter={filter} />
        <div className="table-controlls-wrapper__switch_buttons">
          <button
            onClick={() => {
              toogleCurrentEntity('coins');
            }}
            className={`small-btn ${currentEntity === 'coins' ? 'small-btn__btn_primary' : 'small-btn__btn_white'}`}
            type="button"
          >
            Монеты
          </button>
          <button
            onClick={() => {
              toogleCurrentEntity('envelopes');
            }}
            className={`small-btn ${currentEntity === 'coins' ? 'small-btn__btn_white' : 'small-btn__btn_primary'}`}
            type="button"
          >
            Конверты
          </button>
        </div>
        <div className="table-controlls-wrapper__button_with_icon">
          <button
            type="button"
            onClick={() => {
              showExportStatisticsPopup(currentEntity);
            }}
          >
            <span className="caption">Выгрузить таблицу в Excel</span>
            <FontAwesomeIcon icon={faFileExcel} className="icon" />
          </button>
        </div>
        <div className="table-controlls-wrapper__button_with_icon">
          <button type="button" onClick={this.toggleIntervalFilter}>
            <span className="caption">Выбрать интервал времени</span>
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          </button>
          <div className={`filter interval ${!isIntervalFilterOpened ? 'hidden' : ''}`}>
            <button type="button" onClick={this.toggleIntervalFilter}>
              <span className="filter__title">Выбрать интервал времени</span>
              <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
            </button>
            <hr className="filter__devider" />
            {renderIntervalFilter}
          </div>
        </div>
        <div className={`table-controlls-wrapper__filter ${currentEntity === 'coins' ? '' : 'hidden'}`}>
          <button onClick={this.toggleCoinsFilter} type="button">
            <span className="caption">Фильтр монет</span>
            <FontAwesomeIcon icon={faCaretDown} className="icon" />
          </button>
          <div className={`filter ${!isCoinsFilterOpened ? 'hidden' : ''}`}>
            <button type="button" onClick={this.toggleCoinsFilter}>
              <span className="filter__title">Фильтр монет</span>
              <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
            </button>
            <hr className="filter__devider" />
            {renderedCoinsFilter}
          </div>
        </div>
        <div className={`table-controlls-wrapper__filter ${currentEntity === 'coins' ? 'hidden' : ''}`}>
          <button type="button" onClick={this.toggleEnvelopesFilter}>
            <span className="caption">Фильтр конвертов</span>
            <FontAwesomeIcon icon={faCaretDown} className="icon" />
          </button>
          <div className={`filter ${!isEnvelopesFilteredOpened ? 'hidden' : ''}`}>
            <button type="button" onClick={this.toggleEnvelopesFilter}>
              <span className="filter__title">Фильтр конвертов</span>
              <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
            </button>
            <hr className="filter__devider" />
            {renderedEnvelopesFilter}
          </div>
        </div>
        <div className="table-controlls-wrapper__filter">
          <button type="button" onClick={this.toggleCityFilter}>
            <span className="caption">Фильтр городов</span>
            <FontAwesomeIcon icon={faCaretDown} className="icon" />
          </button>
          <div className={`filter ${!isCityFilterOpened ? 'hidden' : ''}`}>
            <button type="button" onClick={this.toggleCityFilter}>
              <span className="filter__title">Фильтр городов</span>
              <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
            </button>
            <hr className="filter__devider" />
            {renderedCitiesFilter}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { showExportStatisticsPopup },
)(TableControlls);
