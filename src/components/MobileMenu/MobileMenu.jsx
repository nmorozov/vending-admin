import React, { Component } from 'react';

import Drawer from 'rc-drawer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import MobileNavigation from '../Navigation/MobileNavigation';
import Search from '../Search';

import checkInCoinLogo from '../Header/images/check_in_coin_logo.png';

import 'rc-drawer/assets/index.css';
import './MobileMenu.css';

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isDrawerOpened: false };
  }

  toggleDrawer = () => {
    this.setState(previousState => ({ isDrawerOpened: !previousState.isDrawerOpened }));
  };

  render() {
    const { isDrawerOpened } = this.state;
    const { ownerFullName, currentPath, onChange, value, submit } = this.props;
    return (
      <div className="mobile-menu-container">
        <button className="mobile-menu-container__open_drawer_button" type="button" onClick={this.toggleDrawer}>
          <span className="mobile-menu-container__mobile-menu_count" />
          <FontAwesomeIcon icon={faBars} className="mobile-menu-container__mobile-menu_icon" />
        </button>
        <Drawer
          open={isDrawerOpened}
          placement="right"
          handler={false}
          showMask={false}
          onMaskClick={this.toggleDrawer}
          level={null}
          width="100%"
          height="98%"
        >
          <a href="/">
            <img className="mobile-menu-container__logo" src={checkInCoinLogo} alt="Check in coin" />
          </a>
          <button className="mobile-menu-container__close_drawer_button" type="button" onClick={this.toggleDrawer} />
          <div className="mobile-menu-container__owner-full-name">{ownerFullName}</div>
          <MobileNavigation toggleDrawer={this.toggleDrawer} currentPath={currentPath} />
          <Search
            fullWidth
            onChange={onChange}
            value={value}
            submit={() => {
              submit();
              this.toggleDrawer();
            }}
            placeholder="Поиск по разделу"
          />
        </Drawer>
      </div>
    );
  }
}

export default MobileMenu;
