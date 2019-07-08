import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Config from '../../core/config';

import { adminNavigation, ownerNavigation } from '../../store/constants/navigation';

import './MobileNavigation.css';

const Navigation = ({ currentPath, editProfileMethod, toggleDrawer }) => {
  const getMenuItemClass = itemPath =>
    currentPath === itemPath
      ? 'mobile-navigation__navigation_item navigation_item_active'
      : 'mobile-navigation__navigation_item';

  const renderNavigationItems = items =>
    items.map(navigationItem => (
      <li className={getMenuItemClass(navigationItem.link)} key={navigationItem.id}>
        <Link className="mobile-navigation__navigation_link" onClick={toggleDrawer} to={navigationItem.link}>
          {navigationItem.name}
        </Link>
      </li>
    ));

  const getNavagationObject = () => (Config.isAdmin() ? adminNavigation : ownerNavigation);

  return (
    <nav>
      <ul className="mobile-navigation">
        {renderNavigationItems(getNavagationObject())}
        <li className="mobile-navigation__navigation_item">
          <button onClick={editProfileMethod} className="mobile-navigation__navigation_link" type="button">
            Настройки
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  currentPath: PropTypes.string.isRequired,
  editProfileMethod: PropTypes.func.isRequired,
};

export default Navigation;
