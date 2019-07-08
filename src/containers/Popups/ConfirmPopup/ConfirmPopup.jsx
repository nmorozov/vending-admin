import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideConfirmPopup } from '../../../store/actions/ConfirmPopup';

import PopupWrapper from '../../../components/PopupWrapper';

const ConfirmPopup = ({ isOpen, hidePopup, deleteMethod }) => (
  <PopupWrapper
    isOpen={isOpen}
    hidePopup={hidePopup}
    overlayClasses="confirm-popup-overlay"
    popupClasses="export-statistics-popup"
  >
    <div className="export-statistics-popup__caption">Вы уверены что хотите удалить эту запись?</div>
    <div className="export-statistics-popup__buttons">
      <button
        onClick={() => {
          deleteMethod.entity();
          hidePopup();
        }}
        type="button"
      >
        Ок
      </button>
      <button
        onClick={() => {
          hidePopup();
        }}
        type="button"
      >
        Отмена
      </button>
    </div>
  </PopupWrapper>
);

ConfirmPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.ConfirmPopupReducer.isOpen,
    deleteMethod: state.ConfirmPopupReducer.deleteMethod,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideConfirmPopup },
)(ConfirmPopup);
