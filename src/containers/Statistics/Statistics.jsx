import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import MomentLocaleUtils from 'react-day-picker/moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import TableControlls from './TableControlls';
import SalesStatisticsTable from './SalesStatisticsTable';
import SalesChart from './SalesChart';

import 'react-day-picker/lib/style.css';

import { fetchStatCoins, fetchStatEnvelopes } from '../../store/actions/StatisticsAction';

class Statistics extends Component {
  defaultSort = { sort: 'id' };

  state = {
    currentEntity: 'coins',
    coinsFilter: [],
    envelopesFilter: [],
    citiesFilter: [],
    from: undefined,
    to: undefined,
    chartPeriod: 'day',
    sort: '',
  };

  componentWillMount() {
    const { fetchStatCoins, fetchStatEnvelopes } = this.props;
    const { coinsFilter, envelopesFilter, citiesFilter, from, to } = this.state;

    if (!localStorage.getItem('statisticsSort')) {
      localStorage.setItem('statisticsSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('statisticsSort'));
    if (this.state.currentEntity === 'coins') {
      fetchStatCoins(0, { sort: sorting.sort, coins: coinsFilter.join(','), cities: citiesFilter.join(','), from, to });
    } else {
      fetchStatEnvelopes(0, { sort: sorting.sort, envelopes: envelopesFilter.join(','), cities: citiesFilter.join(','), from, to });
    }

    this.setState({
      sort: sorting.sort || this.defaultSort.sort,
    });
  }

  toogleCurrentEntity = entity => {
    const { fetchStatCoins, fetchStatEnvelopes } = this.props;
    const { sort, coinsFilter, envelopesFilter, citiesFilter, from, to } = this.state;

    this.setState({ currentEntity: entity });

    if (entity === 'coins') {
      fetchStatCoins(0, { sort, coins: coinsFilter.join(','), cities: citiesFilter.join(','), from, to });
    } else {
      fetchStatEnvelopes(0, { sort, envelopes: envelopesFilter.join(','), cities: citiesFilter.join(','), from, to });
    }
  };

  setChartPeriod = chartPeriod => this.setState({ chartPeriod });

  toggleFilter = (entityId, filter, filterName) => {
    const { fetchStatCoins, fetchStatEnvelopes } = this.props;

    if (filter.includes(entityId)) {
      const idx = _.indexOf(filter, entityId);
      filter.splice(idx, 1);
    } else {
      filter.push(entityId);
    }

    const newState = {};
    newState[filterName] = filter;
    this.setState(newState);

    let changedState = this.state;
    changedState[filterName] = filter;
    const { coinsFilter, envelopesFilter, citiesFilter, from, to, currentEntity } = this.state;

    if (currentEntity === 'coins') {
      fetchStatCoins(0, { sort: this.state.sort, coins: coinsFilter.join(','), cities: citiesFilter.join(','), from, to });
    } else {
      fetchStatEnvelopes(0, { sort: this.state.sort, envelopes: envelopesFilter.join(','), cities: citiesFilter.join(','), from, to });
    }
  };

  renderCoinsFilter = () => {
    const coins = this.props.data;
    const { coinsFilter } = this.state;
    return (
      <ul className="filter__list">
        {coins.map(coin => (
          <li
            key={coin.id}
            onClick={() => this.toggleFilter(coin.id, coinsFilter, 'coinsFilter')}
            className={`filter__list_item ${coinsFilter.includes(coin.id) ? 'filter__list_item_selected' : ''}`}
          >
            {coin.name}
          </li>
        ))}
      </ul>
    );
  };

  renderEnvelopesFilter = () => {
    const envelopes = this.props.data;
    const { envelopesFilter } = this.state;
    return (
      <ul className="filter__list">
        {envelopes.map(envelope => (
          <li
            key={envelope.id}
            onClick={() => this.toggleFilter(envelope.id, envelopesFilter, 'envelopesFilter')}
            className={`filter__list_item ${envelopesFilter.includes(envelope.id) ? 'filter__list_item_selected' : ''}`}
          >
            {envelope.name}
          </li>
        ))}
      </ul>
    );
  };

  renderCitiesFilter = () => {
    const cities = this.props.cities.map(c => ({id: c, name: c}));
    const { citiesFilter } = this.state;
    return (
      <ul className="filter__list">
        {cities.map(city => (
          <li
            key={city.id}
            onClick={() => this.toggleFilter(city.id, citiesFilter, 'citiesFilter')}
            className={`filter__list_item ${citiesFilter.includes(city.id) ? 'filter__list_item_selected' : ''}`}
          >
            {city.name}
          </li>
        ))}
      </ul>
    );
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('statisticsSort'));
    if (currentSorting.sort === column) column = '-' + column;
    const { fetchStatCoins } = this.props;
    const sorting = { sort: column };
    localStorage.setItem('statisticsSort', JSON.stringify(sorting));
    fetchStatCoins(0, sorting);
    this.setState({
      sort: sorting.sort,
    });
  };

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);

    const { fetchStatCoins, fetchStatEnvelopes } = this.props;
    const { currentEntity, sort, coinsFilter, envelopesFilter, citiesFilter } = this.state;
    const { from, to } = range;

    if (currentEntity === 'coins') {
      fetchStatCoins(0, { sort, coins: coinsFilter.join(','), cities: citiesFilter.join(','), from, to });
    } else {
      fetchStatEnvelopes(0, { sort, envelopes: envelopesFilter.join(','), cities: citiesFilter.join(','), from, to });
    }
  };

  renderIntervalFilter = () => {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <DayPicker
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          localeUtils={MomentLocaleUtils}
          locale="ru"
        />
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
      </div>
    );
  };

  render() {
    const { cities, data, cityData, dateData } = this.props;
    const { currentEntity, sort, chartPeriod, coinsFilter, envelopesFilter, citiesFilter, from, to } = this.state;
    return (
      <div className="white-page-wrapper">
        <h1 className="header-title-one white-page-wrapper__header-title-one">Статистика продаж</h1>
        <TableControlls
          renderedCoinsFilter={this.renderCoinsFilter()}
          renderedEnvelopesFilter={this.renderEnvelopesFilter()}
          renderedCitiesFilter={this.renderCitiesFilter()}
          renderIntervalFilter={this.renderIntervalFilter()}
          toogleCurrentEntity={this.toogleCurrentEntity}
          currentEntity={currentEntity}
          filter={{ sort, coins: coinsFilter.join(','), envelopes: envelopesFilter.join(','), cities: citiesFilter.join(','), from, to }}
        />
        <SalesStatisticsTable
          cities={cities}
          data={data}
          currentEntity={currentEntity}
          cityData={cityData}
          sort={sort}
          doSort={this.doSort}
        />
        <SalesChart chartPeriod={chartPeriod} setChartPeriod={this.setChartPeriod} dateData={dateData} data={data} from={from} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.StatisticsReducer.toJS().cities,
    data: state.StatisticsReducer.toJS().data,
    cityData: state.StatisticsReducer.toJS().cityData,
    dateData: state.StatisticsReducer.toJS().dateData,
  };
}

export default connect(
  mapStateToProps,
  { fetchStatCoins, fetchStatEnvelopes },
)(Statistics);
