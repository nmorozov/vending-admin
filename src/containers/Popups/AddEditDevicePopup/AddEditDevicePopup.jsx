import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideAddEditDevicePopup } from '../../../store/actions/AddEditDeviceActions';

import PopupWrapper from '../../../components/PopupWrapper';
import AddEditDeviceForm from './AddEditDeviceForm';

const AddEditDevicePopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper
    isOpen={isOpen}
    hidePopup={hidePopup}
    overlayClasses="popup-overlay--add-edit-device"
    popupClasses="add-edit-device-popup"
  >
    <AddEditDeviceForm />
  </PopupWrapper>
);

AddEditDevicePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.AddEditDeviceReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideAddEditDevicePopup },
)(AddEditDevicePopup);
