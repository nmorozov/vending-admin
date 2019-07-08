import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideAddCoinPopup } from '../../../store/actions/AddCoinActions';

import PopupWrapper from '../../../components/PopupWrapper';
import AddCoinForm from './AddCoinForm';

const AddCoinPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="add-coin-popup">
    <AddCoinForm />
  </PopupWrapper>
);

AddCoinPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.AddCoinReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideAddCoinPopup },
)(AddCoinPopup);
