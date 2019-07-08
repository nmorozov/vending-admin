import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideOwnerRegistrationPopup } from '../../../store/actions/AddEditOwnerActions';

import OwnerRegistrationForm from './OwnerRegistrationForm';
import PopupWrapper from '../../../components/PopupWrapper';

const OwnerRegistrationPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="owner-registration-popup">
    <OwnerRegistrationForm />
  </PopupWrapper>
);

OwnerRegistrationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.OwnerRegistrationReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideOwnerRegistrationPopup },
)(OwnerRegistrationPopup);
