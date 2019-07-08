import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideSendMessagePopup } from '../../../store/actions/SendMessageActions';

import SendMessageForm from './SendMessageForm';
import PopupWrapper from '../../../components/PopupWrapper';

const SendMessagePopup = ({ isOpen, hidePopup }) => (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="send-message-popup">
    <div className="send-message-popup__title">Отправка сообщения пользователю</div>
    <SendMessageForm />
  </PopupWrapper>
);

SendMessagePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.SendMessageReducer.isOpen,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideSendMessagePopup },
)(SendMessagePopup);
