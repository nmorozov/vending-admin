import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Config from '../../core/config';

import { adminNavigation, ownerNavigation } from '../../store/constants/navigation';

import './Navigation.css';

const Navigation = ({ currentPath, editProfileMethod }) => {
  const getMenuItemClass = itemPath =>
    currentPath === itemPath ? 'navigation__navigation_item navigation_item_active' : 'navigation__navigation_item';

  const renderNavigationItems = items =>
    items.map(navigationItem => (
      <li className={getMenuItemClass(navigationItem.link)} key={navigationItem.id}>
        <Link className="navigation__navigation_link" to={navigationItem.link}>
          {navigationItem.name}
        </Link>
      </li>
    ));

  const getNavagationObject = () => (Config.isAdmin() ? adminNavigation : ownerNavigation);

  return (
    <nav>
      <ul className="navigation">
        {renderNavigationItems(getNavagationObject())}
        <li className="navigation__navigation_item">
          <button onClick={editProfileMethod} className="navigation__navigation_link" type="button">
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
