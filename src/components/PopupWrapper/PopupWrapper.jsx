import React from 'react';

import Modal from 'react-modal';

import PropTypes from 'prop-types';

const PopupWrapper = ({ children, isOpen, hidePopup, overlayClasses, popupClasses }) => {
  Modal.setAppElement('#root');

  return (
    <Modal
      onRequestClose={hidePopup}
      isOpen={isOpen}
      overlayClassName={`popup-overlay ${overlayClasses}`}
      className={`${popupClasses} popup `}
    >
      <button
        onClick={() => {
          hidePopup();
        }}
        type="button"
        className="close-popup"
      />
      {children}
    </Modal>
  );
};

PopupWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
  overlayClasses: PropTypes.string,
  popupClasses: PropTypes.string,
};

PopupWrapper.defaultProps = {
  overlayClasses: '',
  popupClasses: '',
};

export default PopupWrapper;
