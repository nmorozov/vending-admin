import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideProfileEditPopup } from '../../../store/actions/ProfileEditActions';

import ProfileEditForm from './ProfileEditForm';
import PopupWrapper from '../../../components/PopupWrapper';

const ProfileEditPopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="profile-edit-popup">
    <ProfileEditForm />
  </PopupWrapper>
);

ProfileEditPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.ProfileEditReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideProfileEditPopup },
)(ProfileEditPopup);
