import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';
import Search from '../Search';

import Config from '../../core/config';
import { fetchCoins } from '../../store/actions/CoinActions';

import { SERVER_URL } from '../../core/request';

import './CoinsList.css';

class FiveCoins extends Component {
  constructor(props) {
    super(props);

    const { selectedCoinsExternal, selectCoins } = props;

    this.state = {
      filterVariants: [
        { label: 'Все', value: 'all' },
        { label: 'Достопримечательность', value: 'sight' },
        { label: 'Кот', value: 'cat' },
        { label: 'Дух', value: 'spirit' },
      ],
      searchString: '',
      category: Config.isAdmin() ? 'all' : 'sight',
      selectedCoins: [].concat(selectedCoinsExternal),
      page: 1,
    };

    const { selectedCoins } = this.state;

    selectCoins(selectedCoins);
  }

  componentWillMount() {
    const { fetchCoins } = this.props;
    fetchCoins(0, { forDevicePopup: true });
  }

  handeSearchStringChange = element => {
    this.setState({ searchString: element.target.value });
  };

  handleFilterChange = element => {
    this.setState({ category: element.value });
  };

  toggleSelectedCoin = coinId => {
    const { isCoinsSelectable, selectCoins } = this.props;

    if (!isCoinsSelectable) {
      return false;
    }

    this.setState(previousState => {
      const { selectedCoins } = previousState;
      if (!selectedCoins.includes(coinId)) {
        selectedCoins.push(coinId);
        selectCoins(selectedCoins);

        return { selectedCoins };
      }
      const coinIndex = selectedCoins.indexOf(coinId);
      selectedCoins.splice(coinIndex, 1);
      selectCoins(selectedCoins);

      return { selectedCoins };
    });

    return true;
  };

  renderCaption = () => {
    const { coinsTypeCaption } = this.props;
    return coinsTypeCaption !== '' ? (
      <div className="five-coins-container__caption">{`Выбор монеты «${coinsTypeCaption}»`}</div>
    ) : (
      <div />
    );
  };

  renderSearch = () => {
    const { allowSearch } = this.props;
    const { searchString } = this.state;
    return allowSearch === true ? (
      <Search onChange={this.handeSearchStringChange} value={searchString} placeholder="Поиск по городу" />
    ) : (
      <div />
    );
  };

  renderFilter = () => {
    const { filterVariants, category } = this.state;
    if (!Config.isAdmin()) {
      return <div />;
    }

    return (
      <div style={{ width: 200 }}>
        <Select
          onChange={this.handleFilterChange}
          value={filterVariants[category]}
          placeholder="Все"
          options={filterVariants}
        />
      </div>
    );
  };

  loadMore = () => {
    const { fetchCoins, isLoadingFinished, isLoading } = this.props;
    const { category } = this.state;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('coinsSort'));
    sorting.category = category;

    fetchCoins(page * 10, sorting);
    const newPage = page + 1;
    this.setState({ page: newPage });
  };

  renderCoins = () => {
    const { searchString, selectedCoins, category } = this.state;
    const { showCoinCaptions, coins } = this.props;
    if (coins.length === 0) return <div />;
    let filteredCoinsList = coins;

    filteredCoinsList = coins.filter(value => {
      if (category && !searchString) {
        if (category === 'all') {
          return true;
        }
        return value.categoryCode === category;
      }
      if (!category && searchString) {
        return value.city.toLowerCase().includes(searchString.toLowerCase());
      }

      if (category !== 'all') {
        return value.city.toLowerCase().includes(searchString.toLowerCase()) && value.categoryCode === category;
      }
      return value.city.toLowerCase().includes(searchString.toLowerCase());
    });

    return filteredCoinsList.map(coin => {
      const selectedClass = selectedCoins.includes(coin.id) ? 'five-coins-container__coin_selected' : '';
      return (
        <button
          onClick={() => {
            this.toggleSelectedCoin(coin.id);
          }}
          type="button"
          key={coin.id}
          className={`five-coins-container__coin ${selectedClass}`}
        >
          <div className="five-coins-container__tick" />
          <div>
            <img
              className="five-coins-container__coin_image"
              src={`${SERVER_URL}/${coin.frontPicture}`}
              alt={coin.name}
            />
          </div>
          <div className="five-coins-container__title">{showCoinCaptions === true ? coin.name : ''}</div>
        </button>
      );
    });
  };

  render() {
    return (
      <div className="five-coins-container">
        <div className="five-coins-container__search_caption">
          {this.renderCaption()} {this.renderSearch()} {this.renderFilter()}
        </div>
        <div className="five-coins-container__list">{this.renderCoins()}</div>
      </div>
    );
  }
}

FiveCoins.propTypes = {
  coinsTypeCaption: PropTypes.string,
  showCoinCaptions: PropTypes.bool,
  allowSearch: PropTypes.bool,
  isCoinsSelectable: PropTypes.bool,
  selectCoins: PropTypes.func.isRequired,
  selectedCoinsExternal: PropTypes.arrayOf(PropTypes.number).isRequired,
};

FiveCoins.defaultProps = {
  coinsTypeCaption: '',
  showCoinCaptions: false,
  allowSearch: false,
  isCoinsSelectable: false,
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
  { fetchCoins },
)(FiveCoins);
