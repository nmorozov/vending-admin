import React from 'react';

import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';

import { showOwnerRegistrationPopup } from '../../store/actions/AddEditOwnerActions';
import { doRecoverPassword } from '../../store/actions/AuthActions';
import OwnerRegistrationPopup from '../Popups/OwnerRegistrationPopup';

const submitFunction = (values, dispatch) => {
  doRecoverPassword(values.loginOrPhone, dispatch);
};

const PasswordResetForm = props => {
  const { pristine, submitting, handleSubmit } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="password-reset">
          <div className="form-group">
            <Field
              id="password-reset__email_input"
              name="loginOrPhone"
              required
              className="text-input"
              component="input"
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="password-reset__email_input">
              e-mail
            </label>
          </div>
          <button
            disabled={pristine || submitting}
            className="btn btn-primary password-reset__submit_button"
            type="submit"
          >
            Выслать пароль
          </button>
          <button
            onClick={() => {
              props.dispatch(showOwnerRegistrationPopup());
            }}
            type="button"
            className="password-reset__registration_link"
          >
            Регистрация
          </button>
          <a className="password-reset__password_resset_link" href="/login">
            Авторизация
          </a>
        </div>
      </Form>
      <OwnerRegistrationPopup />
    </div>
  );
};

PasswordResetForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const PasswordResetFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'password_reset_form',
})(PasswordResetForm);

export default connect(state => ({
  initialValues: state.PasswordResetReducer,
}))(PasswordResetFormWrapped);
