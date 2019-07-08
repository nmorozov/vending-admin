import React from 'react';

import { connect } from 'react-redux';
import { message } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { fetchCoins } from '../../store/actions/CoinActions';
import { fetchDevices } from '../../store/actions/DeviceActions';
import Config from '../../core/config';

import Request, { SERVER_URL } from '../../core/request';

import Search from '../../components/Search';

import './CoinsList.css';

class CoinsList extends React.Component {
  state = {
    selectedCoins: [],
    searchString: '',
    isDeviceFilterOpened: false,
    devicesFilter: 0,
  };

  componentWillMount() {
    const { fetchDevices, fetchCoins } = this.props;
    const sorting = { sort: 'id', forDevicePopup: true };
    fetchCoins(0, sorting);
    fetchDevices(0, sorting);
  }

  handeSearchStringChange = element => {
    this.setState({ searchString: element.target.value });
  };

  toggleSelectedCoin = coinId => {
    this.setState(previousState => {
      const { selectedCoins } = previousState;
      if (!selectedCoins.includes(coinId)) {
        if (selectedCoins.length < 3) {
          selectedCoins.push(coinId);
        }

        return { selectedCoins };
      }
      const coinIndex = selectedCoins.indexOf(coinId);
      selectedCoins.splice(coinIndex, 1);

      return { selectedCoins };
    });

    return true;
  };

  toggleDeviceFilter = () => {
    this.setState(prevState => ({ isDeviceFilterOpened: !prevState.isDeviceFilterOpened }));
  };

  toggleFilter = deviceId => {
    const { devices } = this.props;
    const coins = [];
    _.find(devices, { id: deviceId }).coins.map(coin => coins.push(coin.id));
    this.setState({ devicesFilter: deviceId, selectedCoins: coins });
  };

  renderDevicesFilter = () => {
    const { devicesFilter } = this.state;
    const { devices } = this.props;
    return (
      <ul className="filter__list">
        {devices.map(device => (
          <li
            key={device.id}
            onClick={() => this.toggleFilter(device.id)}
            className={`filter__list_item ${devicesFilter === device.id ? 'filter__list_item_selected' : ''}`}
          >
            {device.placementAddress}
          </li>
        ))}
      </ul>
    );
  };

  renderCoins = () => {
    const { coins } = this.props;
    const { searchString, selectedCoins } = this.state;
    let filteredCoinsList = coins;

    if (coins.length === 0) {
      return <div />;
    }

    filteredCoinsList = coins.filter(value => value.city.toLowerCase().includes(searchString.toLowerCase()));
    if (!Config.isAdmin()) {
      filteredCoinsList = filteredCoinsList.filter(value => value.categoryCode === 'sight');
    }
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
          <div className="five-coins-container__title">{coin.name}</div>
        </button>
      );
    });
  };

  doSetCoins = () => {
    const { selectedCoins, devicesFilter } = this.state;
    Request.doSetCoins(devicesFilter, selectedCoins)
      .then(() => {
        message.success('Изменения сохранены');
      })
      .catch(() => {
        message.error('Не сохранить изменения');
      });
  };

  getSelectedDevice = () => {
    const { devicesFilter } = this.state;
    const { devices } = this.props;
    const deviceName = 'Аппарат не выбран';
    if (devicesFilter === 0) {
      return deviceName;
    }

    return devices[_.findKey(devices, { id: devicesFilter })].placementAddress;
  };

  render() {
    const { searchString, isDeviceFilterOpened, devicesFilter } = this.state;
    return (
      <div className="coins-page-wrapper">
        <div className="search-and-caption">
          <div className="caption">Монеты</div>
          <Search onChange={this.handeSearchStringChange} value={searchString} placeholder="Поиск по городу" />
        </div>
        <div className="device-filter">
          <div className="table-controlls-wrapper__filter">
            <button type="button" onClick={this.toggleDeviceFilter}>
              <span className="caption">Выбор аппарата</span>
              <FontAwesomeIcon icon={faCaretDown} className="icon" />
            </button>
            <div className={`filter ${!isDeviceFilterOpened ? 'hidden' : ''}`}>
              <button type="button" onClick={this.toggleDeviceFilter}>
                <span className="filter__title">Выбор аппарата</span>
                <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
              </button>
              <hr className="filter__devider" />
              {this.renderDevicesFilter()}
            </div>
          </div>
          <div className="current-device">{this.getSelectedDevice()}</div>
        </div>

        <div className="coins-list">{this.renderCoins()}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => this.doSetCoins()}
            disabled={!devicesFilter}
            className="popup__button popup__button--filled"
            type="button"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coins: state.CoinsReducer.toJS().coins,
    devices: state.DevicesReducer.toJS().devices,
  };
}

export default connect(
  mapStateToProps,
  { fetchCoins, fetchDevices },
)(CoinsList);
