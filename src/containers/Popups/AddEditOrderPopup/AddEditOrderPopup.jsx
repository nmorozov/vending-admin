import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideAddEditOrderPopup } from '../../../store/actions/AddEditOrderActions';

import PopupWrapper from '../../../components/PopupWrapper';
import AddEditOrderForm from './AddEditOrderForm';

const AddEditOrderPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="add-edit-order-popup">
    <AddEditOrderForm />
  </PopupWrapper>
);

AddEditOrderPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.AddEditOrderReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideAddEditOrderPopup },
)(AddEditOrderPopup);
