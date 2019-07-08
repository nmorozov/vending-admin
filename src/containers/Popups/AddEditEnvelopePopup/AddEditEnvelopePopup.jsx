import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideAddEditEnvelopePopup } from '../../../store/actions/AddEditEnvelopeActions';

import PopupWrapper from '../../../components/PopupWrapper';
import AddEditEnvelopeForm from './AddEditEnvelopeForm';

const AddEditEnvelopePopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="add-edit-envelope-popup">
    <AddEditEnvelopeForm />
  </PopupWrapper>
);

AddEditEnvelopePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.AddEditEnvelopeReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideAddEditEnvelopePopup },
)(AddEditEnvelopePopup);
