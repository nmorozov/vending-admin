import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import Select from 'react-select';

import BottomScrollListener from 'react-bottom-scroll-listener';

import PropTypes from 'prop-types';
import coinTypes from '../../types/coinTypes';

import BigTableActionsBar from '../../components/BigTableActionsBar';
import CoinsTable from './CoinsTable';
import CoinsList from './CoinsList';
import AddCoinPopup from '../Popups/AddCoinPopup';

import LoadingSpinner from '../../components/LoadingSpinner';

import { showAddCoinPopup } from '../../store/actions/AddCoinActions';
import { fetchCoins } from '../../store/actions/CoinActions';

import CoinsMobile from './CoinsMobile';

import Request from '../../core/request';

import Config from '../../core/config';

import newCoinIcon from './svg/new_coin_icon.svg';

class Coins extends Component {
  defaultVisibleColumns = ['id', 'name', 'categoryCode', 'city', 'country', 'frontPicture'];

  defaultSort = { sort: 'id' };

  state = {
    userVisibleColumns: [],
    sort: '',
    page: 1,
    filterTypeVariants: [
      { label: 'Все', value: 'all' },
      { label: 'Достопримечательность', value: 'sight' },
      { label: 'Кот', value: 'cat' },
      { label: 'Дух', value: 'spirit' },
    ],
    category: 'all',
    country: 'Все',
    city: 'Все',
    countries: [],
    cities: [],
  };

  componentWillMount() {
    const { fetchCoins } = this.props;
    const { category } = this.state;
    Config.set('coinsCategory', 'all');
    Config.set('coinsCountry', 'Все');
    Config.set('coinsCity', 'Все');

    if (!localStorage.getItem('coinsColumn')) {
      localStorage.setItem('coinsColumn', JSON.stringify(this.defaultVisibleColumns));
    }

    if (!localStorage.getItem('coinsSort')) {
      localStorage.setItem('coinsSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('coinsSort'));
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.category = category;

    if (Config.isAdmin()) {
      fetchCoins(0, sorting);
    }
    Request.doGetCoinCountries().then(response => this.setState({ countries: response.countries }));
    Request.doGetCoinCities().then(response => this.setState({ cities: response.cities }));

    this.setState({
      userVisibleColumns: JSON.parse(localStorage.getItem('coinsColumn')),
      sort: sorting.sort || this.defaultSort.sort,
    });
  }

  actionButton = () => {
    const { showAddCoinPopup } = this.props;
    return {
      buttonAction: showAddCoinPopup,
      svgIcon: newCoinIcon,
      title: 'Создать новую монету',
    };
  };

  toggleColumn = columnCode => {
    const { userVisibleColumns } = this.state;
    if (userVisibleColumns.includes(columnCode)) {
      const idx = _.indexOf(userVisibleColumns, columnCode);
      userVisibleColumns.splice(idx, 1);
    } else {
      userVisibleColumns.push(columnCode);
    }
    localStorage.setItem('coinsColumn', JSON.stringify(userVisibleColumns));
    this.setState({ userVisibleColumns });
  };

  loadMore = () => {
    const { fetchCoins, isLoadingFinished, isLoading } = this.props;
    const { category, country, city } = this.state;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.category = category;
    sorting.country = country;
    sorting.city = city;

    fetchCoins(page * 10, sorting);
    const newPage = page + 1;
    this.setState({ page: newPage });
  };

  renderFilter = () => {
    const { userVisibleColumns } = this.state;
    return (
      <ul className="filter__list">
        <li
          onClick={() => this.toggleColumn('id')}
          className={`filter__list_item ${userVisibleColumns.includes('id') ? 'filter__list_item_selected' : ''}`}
        >
          ID
        </li>
        <li
          onClick={() => this.toggleColumn('name')}
          className={`filter__list_item ${userVisibleColumns.includes('name') ? 'filter__list_item_selected' : ''}`}
        >
          Имя
        </li>
        <li
          onClick={() => this.toggleColumn('categoryCode')}
          className={`filter__list_item ${
            userVisibleColumns.includes('categoryCode') ? 'filter__list_item_selected' : ''
          }`}
        >
          Тип
        </li>
        <li
          onClick={() => this.toggleColumn('city')}
          className={`filter__list_item ${userVisibleColumns.includes('city') ? 'filter__list_item_selected' : ''}`}
        >
          Город
        </li>
        <li
          onClick={() => this.toggleColumn('country')}
          className={`filter__list_item ${userVisibleColumns.includes('country') ? 'filter__list_item_selected' : ''}`}
        >
          Страна
        </li>
        <li
          onClick={() => this.toggleColumn('frontPicture')}
          className={`filter__list_item ${
            userVisibleColumns.includes('frontPicture') ? 'filter__list_item_selected' : ''
          }`}
        >
          Изображение
        </li>
      </ul>
    );
  };

  selectCountry = country => {
    const { fetchCoins } = this.props;
    const { category, city } = this.state;
    this.setState({ country, page: 1 });
    Config.set('coinsCountry', country);
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.country = country;
    sorting.category = category;
    sorting.city = city;

    fetchCoins(0, sorting);
  };

  selectCity = city => {
    const { fetchCoins } = this.props;
    const { category, country } = this.state;
    this.setState({ city, page: 1 });
    Config.set('coinsCity', city);
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.country = country;
    sorting.category = category;
    sorting.city = city;

    fetchCoins(0, sorting);
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('coinsSort'));
    const { category } = this.state;
    if (currentSorting.sort === column) column = `-${column}`;
    const { fetchCoins } = this.props;
    const sorting = { sort: column };
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    sorting.category = category;
    fetchCoins(0, sorting);
    delete sorting.searchString;
    localStorage.setItem('coinsSort', JSON.stringify(sorting));
    this.setState({
      sort: sorting.sort,
    });
  };

  handleFilterTypeChange = element => {
    const { fetchCoins } = this.props;
    const { country, city } = this.state;
    this.setState({ category: element.value, page: 1 });
    Config.set('coinsCategory', element.value);
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.category = element.value;
    sorting.country = country;
    sorting.city = city;
    fetchCoins(0, sorting);
  };

  handleFilterCountryChange = element => {
    const { fetchCoins } = this.props;
    const { category, city } = this.state;
    this.setState({ country: element.value, page: 1 });
    Config.set('coinsCountry', element.value);
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.category = category;
    sorting.country = element.value;
    sorting.city = city;
    fetchCoins(0, sorting);
  };

  handleFilterCityChange = element => {
    const { fetchCoins } = this.props;
    const { category, country } = this.state;
    this.setState({ city: element.value, page: 1 });
    Config.set('coinsCity', element.value);
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    sorting.category = category;
    sorting.country = country;
    sorting.city = element.value;
    fetchCoins(0, sorting);
  };

  renderCategoryFilter = () => {
    const { filterTypeVariants, category } = this.state;
    if (!Config.isAdmin()) {
      return <div />;
    }

    return (
      <div style={{ width: 200 }}>
        <Select
          onChange={this.handleFilterTypeChange}
          value={filterTypeVariants[category]}
          placeholder="Все"
          options={filterTypeVariants}
        />
      </div>
    );
  };

  renderCountryFilter = () => {
    const { countries, country } = this.state;
    if (!Config.isAdmin()) {
      return <div />;
    }

    return (
      <div style={{ width: 200 }}>
        <Select
          onChange={this.handleFilterCountryChange}
          value={countries[country]}
          placeholder="Все"
          options={countries}
        />
      </div>
    );
  };

  renderCityFilter = () => {
    const { cities, city } = this.state;
    if (!Config.isAdmin()) {
      return <div />;
    }

    return (
      <div style={{ width: 200 }}>
        <Select onChange={this.handleFilterCityChange} value={cities[city]} placeholder="Все" options={cities} />
      </div>
    );
  };

  render() {
    const { isLoading, coins, showAddCoinPopup } = this.props;
    const { userVisibleColumns, sort } = this.state;

    return (
      <div>
        {Config.isAdmin() && <BigTableActionsBar renderFilter={this.renderFilter} actionButton={this.actionButton()} />}
        {Config.isAdmin() && (
          <div className="coins-filter-admin">
            {this.renderCategoryFilter()} {this.renderCountryFilter()}
            {this.renderCityFilter()}
          </div>
        )}
        {Config.isAdmin() && (
          <CoinsTable
            visibleColumns={userVisibleColumns}
            coins={coins}
            editCoinMethod={showAddCoinPopup}
            sort={sort}
            doSort={this.doSort}
          />
        )}
        {Config.isAdmin() && <AddCoinPopup />}
        {!Config.isAdmin() && <CoinsList />}
        <LoadingSpinner loading={isLoading} color="#c3a94d" size={10} />
        <CoinsMobile editCoinMethod={showAddCoinPopup} coins={coins} />
        <BottomScrollListener
          onBottom={() => {
            this.loadMore();
          }}
        />
      </div>
    );
  }
}

Coins.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
  showAddCoinPopup: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  coins: PropTypes.arrayOf(coinTypes),
};

Coins.defaultProps = {
  coins: [],
};

function mapStateToProps(state) {
  return {
    coins: state.CoinsReducer.toJS().coins,
    loadFrom: state.CoinsReducer.get('loadFrom'),
    isLoading: state.CoinsReducer.get('isLoading'),
    isLoadingFinished: state.CoinsReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  { fetchCoins, showAddCoinPopup },
)(Coins);
