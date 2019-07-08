import React from 'react';

import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';

import { showOwnerRegistrationPopup } from '../../store/actions/AddEditOwnerActions';
import { doLogin } from '../../store/actions/AuthActions';
import OwnerRegistrationPopup from '../Popups/OwnerRegistrationPopup';

const submitFunction = (values, dispatch) => {
  doLogin(values.username, values.password, dispatch);
};

const LoginForm = props => {
  const { pristine, submitting, handleSubmit } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className="form-group">
            <Field
              id="login-form__email_input"
              name="username"
              required
              className="text-input"
              component="input"
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="login-form__email_input">
              e-mail
            </label>
          </div>
          <div className="form-group login-form__password_group" id="login-form__password_group">
            <Field
              id="login-form__password_input"
              required
              name="password"
              className="text-input"
              type="password"
              component="input"
            />
            <label className="form-control-placeholder" htmlFor="login-form__password_input">
              пароль
            </label>
          </div>
          <button disabled={pristine || submitting} className="btn btn-primary login-form__submit_button" type="submit">
            Отправить
          </button>
          <button
            onClick={() => {
              props.dispatch(showOwnerRegistrationPopup());
            }}
            type="button"
            className="login-form__registration_link"
          >
            Регистрация
          </button>
          <a className="login-form__password_resset_link" href="/password-resset">
            Восстановление пароля
          </a>
        </div>
      </Form>
      <OwnerRegistrationPopup />
    </div>
  );
};

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const LoginFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'login_form',
})(LoginForm);

export default connect(state => ({
  initialValues: state.ProfileEditReducer,
}))(LoginFormWrapped);
