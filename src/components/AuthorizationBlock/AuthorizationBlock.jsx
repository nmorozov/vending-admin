import React from 'react';

import PropTypes from 'prop-types';

import checkInCoinLogo from './images/check_in_coin_logo.png';

import './AuthorizationBlock.css';

const AuthorizationBlock = ({ blockCaption, children }) => {
  function renderLogo() {
    return (
      <div className="authorization-block-wrapper__check-in-coin-logo">
        <img src={checkInCoinLogo} alt="Check in coin" />
      </div>
    );
  }

  function renderForm() {
    return (
      <div>
        <h1 className="header-title-one authorization-block-wrapper__header_title">{blockCaption}</h1>
        {children}
      </div>
    );
  }

  function renderWrapper() {
    return (
      <div className="authorization-block-wrapper">
        {renderLogo()}
        {renderForm()}
      </div>
    );
  }

  return renderWrapper();
};

AuthorizationBlock.propTypes = {
  blockCaption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthorizationBlock;
