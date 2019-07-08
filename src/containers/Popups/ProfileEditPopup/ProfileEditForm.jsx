import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import userTypes from '../../../types/userTypes';

import PasswordEdit from './PasswordEdit';

import { updateUser } from '../../../store/actions/ProfileEditActions';

const submitFunction = (userData, dispatch) => {
  dispatch(updateUser(userData, dispatch));
};

const validate = values => {
  const errors = {};

  if (values.ownerEmail) {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.ownerEmail,
      )
    ) {
      errors.ownerEmail = 'Некорректно заполнено поле';
    }
  }

  if (values.ownerPhone) {
    if (values.ownerPhone.replace(/ /g, '').replace('+', '').length < 11) {
      errors.ownerPhone = 'Некорректно заполнено поле';
    }
  }

  return errors;
};

const renderField = ({ input, id, required, className, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input required={required} className={className} id={id} {...input} type={type} />
      <label className="form-control-placeholder" htmlFor={id}>
        {label}
      </label>
      {touched && (error && <span className="validation-error">{error}</span>)}
    </div>
  </div>
);

const renderPhone = ({ input, id, className, label, meta: { touched, error } }) => (
  <div>
    <InputMask {...input} id={id} className={className} mask="+7 999 999 99 99" maskChar=" " required />
    <label className="form-control-placeholder" htmlFor={id}>
      {label}
    </label>
    {touched && (error && <span className="validation-error">{error}</span>)}
  </div>
);

const ProfileEditForm = props => {
  const { pristine, submitting, handleSubmit, initialValues } = props;
  return (
    <div>
      <div className="profile-edit-popup__title">{initialValues.ownerFullName}</div>
      <div className="two-forms">
        <form onSubmit={handleSubmit}>
          <div className="profile-edit-popup__body">
            <div>
              <div className="form-group popup-form-group">
                <Field
                  id="profile-edit-popup__last_name_firstname_middlename"
                  required
                  name="ownerFullName"
                  className="popup-form-input text-input"
                  type="text"
                  component="input"
                />
                <label
                  className="form-control-placeholder"
                  htmlFor="profile-edit-popup__last_name_firstname_middlename"
                >
                  ФИО
                </label>
              </div>
              <div className="form-group popup-form-group">
                <Field
                  id="profile-edit-popup__phone"
                  name="ownerPhone"
                  className="popup-form-input text-input"
                  component={renderPhone}
                  required
                  type="text"
                  label="Телефон"
                />
              </div>
              <div className="form-group popup-form-group">
                <Field
                  id="profile-edit-popup__email"
                  name="ownerEmail"
                  className="popup-form-input text-input"
                  component={renderField}
                  required
                  label="E-mail"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="profile-edit-popup__buttons">
            <button disabled={pristine || submitting} className="popup__button popup__button--filled" type="submit">
              Сохранить изменения
            </button>
          </div>
        </form>
        <PasswordEdit />
      </div>
    </div>
  );
};

ProfileEditForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: userTypes.isRequired,
};

const ProfileEditFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'profile_edit_form',
  validate,
})(ProfileEditForm);

export default connect(state => ({
  initialValues: state.ProfileEditReducer,
}))(ProfileEditFormWrapped);
