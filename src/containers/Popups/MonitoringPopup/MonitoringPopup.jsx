import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideMonitoringPopup } from '../../../store/actions/MonitoringActions';

import PopupWrapper from '../../../components/PopupWrapper';
import MonitoringForm from './MonitoringForm';

const MonitoringPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="monitoring-popup">
    <MonitoringForm />
  </PopupWrapper>
);

MonitoringPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.MonitoringReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideMonitoringPopup },
)(MonitoringPopup);
