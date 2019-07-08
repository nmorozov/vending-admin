import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import userTypes from '../../types/userTypes';

import Search from '../Search';
import Navigation from '../Navigation';

import Config from '../../core/config';

import ProfileEditForm from '../../containers/Popups/ProfileEditPopup';

import checkInCoinLogo from './images/check_in_coin_logo.png';
// import Notifications from '../Notifications';
import MobileMenu from '../MobileMenu';

import { OWNERS, DEVICES, COINS, ENVELOPES, ORDERS } from '../../store/constants/routeConstants';
import { fetchOwners } from '../../store/actions/OwnerActions';
import { fetchDevices } from '../../store/actions/DeviceActions';
import { fetchCoins } from '../../store/actions/CoinActions';
import { fetchEnvelopes } from '../../store/actions/EnvelopeActions';
import { fetchOrders } from '../../store/actions/OrderActions';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    const searchString = Config.get('search_string');
    this.state = {
      searchString: searchString || '',
    };
  }

  onSearchStringChange = e => {
    this.setState({ searchString: e.target.value });
  };

  componentWillReceiveProps() {
    this.setState({ searchString: '' });
  }

  doSearch = () => {
    const { currentPath, dispatch } = this.props;
    const { searchString } = this.state;
    // Config.set('search_string', searchString);
    switch (currentPath) {
      case OWNERS:
        const ownersSort = JSON.parse(localStorage.getItem('ownersSort'));
        delete ownersSort.searchString;
        dispatch(fetchOwners(0, { searchString, ...ownersSort }));
        break;
      case DEVICES:
        const devicesSort = JSON.parse(localStorage.getItem('devicesSort'));
        delete devicesSort.searchString;
        dispatch(fetchDevices(0, { searchString, ...devicesSort }));
        break;
      case COINS:
        const coinsSort = JSON.parse(localStorage.getItem('coinsSort'));
        const coinsCategory = localStorage.getItem('coinsCategory');
        const coinsCountry = localStorage.getItem('coinsCountry');
        const coinsCity = localStorage.getItem('coinsCity');
        delete coinsSort.searchString;
        dispatch(
          fetchCoins(0, {
            searchString,
            ...coinsSort,
            category: coinsCategory,
            country: coinsCountry,
            city: coinsCity,
          }),
        );
        break;
      case ENVELOPES:
        const envelopesSort = JSON.parse(localStorage.getItem('envelopesSort'));
        delete envelopesSort.searchString;
        dispatch(fetchEnvelopes(0, { searchString, ...envelopesSort }));
        break;
      case ORDERS:
        const ordersSort = JSON.parse(localStorage.getItem('ordersSort'));
        delete ordersSort.searchString;
        dispatch(fetchOrders(0, { searchString, ...ordersSort }));
        break;
      default:
        break;
    }
  };

  render() {
    const { user, currentPath, editProfileMethod } = this.props;
    const { searchString } = this.state;
    return (
      <header className="header">
        <a href="/">
          <img className="header__logo" src={checkInCoinLogo} alt="Check in coin" />
        </a>
        <div className="header__main_menu">
          <Search
            onChange={this.onSearchStringChange}
            value={searchString}
            submit={this.doSearch}
            placeholder="Поиск по разделу"
          />
          <div className="header__devider" />
          <button className="header__username" type="button">
            {user.ownerFullName}
          </button>
          {/* <Notifications /> */}
        </div>
        <MobileMenu
          ownerFullName={user.ownerFullName}
          currentPath={currentPath}
          onChange={this.onSearchStringChange}
          value={searchString}
          submit={this.doSearch}
        />
        <ProfileEditForm />
        <Navigation
          editProfileMethod={() => {
            editProfileMethod({
              ownerFullName: user.ownerFullName,
              ownerPhone: user.ownerPhone,
              ownerEmail: user.ownerEmail,
              id: user.id,
            });
          }}
          currentPath={currentPath}
        />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.AuthReducer.toJS().user,
});

Header.propTypes = {
  user: userTypes.isRequired,
  currentPath: PropTypes.string.isRequired,
  editProfileMethod: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
