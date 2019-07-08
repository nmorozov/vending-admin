import React from 'react';

import PropTypes from 'prop-types';

import './Notification.css';

const Notification = ({ date, text }) => (
  <div className="notification-container">
    <div className="notification-container__date">{date}</div>
    <div className="notification-container__text">{text}</div>
  </div>
);

Notification.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Notification;
