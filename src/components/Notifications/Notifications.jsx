import React, { Component } from 'react';

import Drawer from 'rc-drawer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Notification from './Notification';

import 'rc-drawer/assets/index.css';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { isDrawerOpened: false };
  }

  toggleDrawer = () => {
    this.setState(previousState => ({ isDrawerOpened: !previousState.isDrawerOpened }));
  };

  render() {
    const { isDrawerOpened } = this.state;
    return (
      <div className="notifications-container">
        <button className="notifications-container__open_drawer_button" type="button" onClick={this.toggleDrawer}>
          <span className="notifications-container__notifications_count" />
          <FontAwesomeIcon icon={faBell} className="notifications-container__notifications_icon" />
        </button>
        <Drawer
          open={isDrawerOpened}
          placement="right"
          handler={false}
          showMask={false}
          onMaskClick={this.toggleDrawer}
          level={null}
          width="560px"
        >
          <div className="notifications-container">
            <span className="notifications-container__notifications_count">12</span>
            <FontAwesomeIcon
              icon={faBell}
              className="notification-container__notifications_icon notification-container__notifications_icon_black"
            />
          </div>
          <button className="notifications-container__close_drawer_button" type="button" onClick={this.toggleDrawer} />
          <div className="notifications-container__notifications_title">Уведомления</div>
          <Notification
            date="18.03.2018"
            text="Гений естественно оспособляет принцип восприятия, tertium nоn datur. Даосизм индуцирует дуализм. Вещь в себе создает непредвиденный бабувизм. Катарсис абстрактен. "
          />
          <Notification
            date="18.03.2018"
            text="Гений естественно оспособляет принцип восприятия, tertium nоn datur. Даосизм индуцирует дуализм. Вещь в себе создает непредвиденный бабувизм. Катарсис абстрактен. "
          />
          <Notification
            date="18.03.2018"
            text="Гений естественно оспособляет принцип восприятия, tertium nоn datur. Даосизм индуцирует дуализм. Вещь в себе создает непредвиденный бабувизм. Катарсис абстрактен. "
          />
          <Notification
            date="18.03.2018"
            text="Гений естественно оспособляет принцип восприятия, tertium nоn datur. Даосизм индуцирует дуализм. Вещь в себе создает непредвиденный бабувизм. Катарсис абстрактен. "
          />
          <Notification
            date="18.03.2018"
            text="Гений естественно оспособляет принцип восприятия, tertium nоn datur. Даосизм индуцирует дуализм. Вещь в себе создает непредвиденный бабувизм. Катарсис абстрактен. "
          />
        </Drawer>
      </div>
    );
  }
}

export default Notifications;
