import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';

import envelopeTypes from '../../../types/envelopeTypes';

import { createEnvelope, updateEnvelope } from '../../../store/actions/AddEditEnvelopeActions';
import { deleteEnvelope } from '../../../store/actions/EnvelopeActions';
import { showConfirmPopup } from '../../../store/actions/ConfirmPopup';

import { SERVER_URL } from '../../../core/request';

const submitFunction = (envelopeData, dispatch) => {
  if (envelopeData.id) {
    dispatch(updateEnvelope(envelopeData, dispatch));
  } else {
    createEnvelope(envelopeData, dispatch);
  }
};

class AddEditEnvelopeForm extends Component {
  getSubmitButtonCaption(creation) {
    return creation ? 'Создать' : 'Сохранить';
  }

  previewFile = async e => {
    const { dispatch } = this.props;
    const preview = document.querySelector('.preview');
    const picture = e.target.files[0];

    if (!picture) {
      preview.src = '';
      return false;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
      preview.src = e.target.result;
      dispatch(changeFieldValue('add_envelope_form', 'picture', picture));
    };

    reader.readAsDataURL(picture);

    return true;
  };

  isDeleteButtonVisible(creation) {
    return !creation;
  }

  render() {
    const { pristine, submitting, handleSubmit, initialValues, dispatch } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="add-edit-envelope-popup__body">
          <div>
            <div className="add-edit-envelope-popup__little_caption" />
            <div className="add-edit-envelope-popup__big_caption">Создание конверта</div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-envelope-popup__name"
                required
                name="name"
                className="popup-form-input text-input"
                type="text"
                component="input"
              />
              <label className="form-control-placeholder" htmlFor="add-edit-envelope-popup__name">
                Название
              </label>
            </div>
            <div className="form-group popup-form-group">
              <input
                id="add-edit-envelope-popup__picture"
                className="popup-form-input file-input"
                type="file"
                onChange={e => {
                  this.previewFile(e);
                }}
                ref={input => {
                  this.frontsidePictureInput = input;
                  return true;
                }}
              />
              <label htmlFor="add-edit-envelope-popup__picture" className="file-input-label">
                Добавить изображение
              </label>
            </div>
            <div className="add-edit-envelope-popup__buttons">
              <button disabled={pristine || submitting} className="popup__button" type="submit">
                {this.getSubmitButtonCaption(!initialValues.id)}
              </button>
              {this.isDeleteButtonVisible(!initialValues.id) && (
                <button
                  className="popup__button"
                  type="button"
                  onClick={() => {
                    dispatch(
                      showConfirmPopup(() => {
                        dispatch(deleteEnvelope(initialValues.id));
                      }),
                    );
                  }}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
          <div className="add-edit-envelope-popup__half_form">
            <div>
              <Field
                id="add-edit-envelope-popup__note"
                name="note"
                className="add-edit-envelope-popup__note popup-form-textarea"
                type="text"
                component="textarea"
                placeholder="Примечание"
              />
            </div>
          </div>
          <div className="add-edit-envelope-popup__envelope_constructor">
            <div className="add-edit-envelope-popup__little_caption" />
            <button
              onClick={() => {
                this.frontsidePictureInput.click();
              }}
              className="add-edit-envelope-popup__upload_frontside_picture_button"
              type="button"
            >
              <img src={`${SERVER_URL}/${initialValues.picture}`} alt="" className="preview" />
            </button>
            <Field className="hidden" name="picture" required type="hidden" component="input" />
          </div>
        </div>
      </form>
    );
  }
}

AddEditEnvelopeForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: envelopeTypes.isRequired,
};

const AddEditEnvelopeFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'add_envelope_form',
})(AddEditEnvelopeForm);

export default connect(state => ({
  initialValues: state.AddEditEnvelopeReducer,
}))(AddEditEnvelopeFormWrapped);
