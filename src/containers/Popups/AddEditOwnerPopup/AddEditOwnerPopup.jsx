import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideAddEditOwnerPopup } from '../../../store/actions/AddEditOwnerActions';

import AddEditOwnerForm from './AddEditOwnerForm';
import PopupWrapper from '../../../components/PopupWrapper';

const AddEditOwnerPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="add-edit-owner-popup">
    <AddEditOwnerForm />
  </PopupWrapper>
);

AddEditOwnerPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.AddEditOwnerReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideAddEditOwnerPopup },
)(AddEditOwnerPopup);
