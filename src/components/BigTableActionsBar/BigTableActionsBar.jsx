import React from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import actionButtonTypes from '../../types/actionButtonTypes';

import Config from '../../core/config';

import './BigTableActionsBar.css';

class BigTableActionsBar extends React.Component {
  state = { isFilterOpened: false };

  toggleFilter = () => {
    this.setState(prevState => ({ isFilterOpened: !prevState.isFilterOpened }));
  };

  render() {
    const { actionButton, renderFilter } = this.props;
    const { isFilterOpened } = this.state;
    return (
      <div className="big-table-actions-bar">
        {Config.isAdmin() && (
          <button className="big-table-actions-bar__button" type="button" onClick={actionButton.buttonAction}>
            {actionButton.title}
            <img className="big-table-actions-bar__icon" src={actionButton.svgIcon} alt={actionButton.title} />
          </button>
        )}
        <div className="big-table-actions-bar__filter">
          <button type="button" onClick={this.toggleFilter}>
            <span className="big-table-actions-bar__filter_title">Добавить фильтр</span>
            <FontAwesomeIcon icon={faCaretDown} className="big-table-actions-bar__filter_icon" />
          </button>
          <div className={`filter ${!isFilterOpened ? 'hidden' : ''}`}>
            <button type="button" onClick={this.toggleFilter}>
              <span className="big-table-actions-bar__filter_title filter__title">Добавить фильтр</span>
              <FontAwesomeIcon icon={faCaretUp} className="big-table-actions-bar__filter_icon" />
            </button>
            <hr className="filter__devider" />
            {renderFilter()}
          </div>
        </div>
      </div>
    );
  }
}

BigTableActionsBar.propTypes = {
  actionButton: actionButtonTypes.isRequired,
  renderFilter: PropTypes.func.isRequired,
};

export default BigTableActionsBar;
