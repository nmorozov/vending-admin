import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import ReCAPTCHA from 'react-google-recaptcha';
import { message } from 'antd';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerOwner } from '../../../store/actions/AddEditOwnerActions';

let recaptcha = false;

const submitFunction = (ownerData, dispatch) => {
  if (recaptcha) {
    dispatch(registerOwner(ownerData, dispatch));
  } else {
    message.error('Подтвердите что вы не робот');
  }
};

const validate = values => {
  const errors = {};
  if (values.password) {
    if (values.password.length < 8) {
      errors.password = 'Минимальная длина пароля 8 символов';
    }
    if (!/[a-z]/.test(values.password) || !/[A-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
      errors.password = 'Пароль должен содержать заглавные и строчные буквы и цифры';
    }
  }

  if (values.password_repeat) {
    if (!values.password || values.password !== values.password_repeat) {
      errors.password_repeat = 'Пароли не совпадают';
    }
  }

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

  if (values.caretakerEmail) {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.caretakerEmail,
      )
    ) {
      errors.caretakerEmail = 'Некорректно заполнено поле';
    }
  }

  if (values.username) {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.username,
      )
    ) {
      errors.username = 'Некорректно заполнено поле';
    }
  }

  if (values.phone) {
    if (values.phone.replace(/ /g, '').length < 12) {
      errors.phone = 'Некорректно заполнено поле';
    }
  }

  if (values.caretakerPhone) {
    if (values.caretakerPhone.replace(/ /g, '').length < 12) {
      errors.caretakerPhone = 'Некорректно заполнено поле';
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

const OwnerRegistrationForm = props => {
  const { pristine, submitting, handleSubmit, invalid } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="owner-registration-popup__title_container">
        <div className="owner-registration-popup__title">Регистрация</div>
      </div>
      <div className="owner-registration-popup__body">
        <div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__full_name"
              name="fullCompanyName"
              className="popup-form-input text-input"
              component={renderField}
              required
              type="text"
              label="Полное наименование компании"
            />
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__short_name"
              name="shortCompanyName"
              className="popup-form-input text-input short-company-name"
              component="input"
              required
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="owner-registration-popup__short_name">
              Краткое наименование компании
            </label>
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__country"
              name="country"
              className="popup-form-input text-input"
              component="input"
              required
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="owner-registration-popup__country">
              Страна
            </label>
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__city"
              name="city"
              className="popup-form-input text-input"
              component="input"
              required
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="owner-registration-popup__city">
              Город
            </label>
          </div>
        </div>
        <div className="owner-registration-popup__half_form">
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__firstname_lastname_middlename"
              name="ownerFullName"
              className="popup-form-input text-input"
              component="input"
              required
              type="text"
            />
            <label
              className="form-control-placeholder"
              htmlFor="owner-registration-popup__firstname_lastname_middlename"
            >
              ФИО Руководителя
            </label>
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              name="phone"
              className="popup-form-input text-input"
              id="owner-registration-popup__phone"
              component={renderPhone}
              label="Телефон руководителя"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__owner_email"
              name="ownerEmail"
              className="popup-form-input text-input"
              component={renderField}
              required
              type="text"
              label="E-mail руководителя"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__caretaker_firstname_lastname_middlename"
              name="caretakerFullName"
              className="popup-form-input text-input"
              component="input"
              required
              type="text"
            />
            <label
              className="form-control-placeholder"
              htmlFor="owner-registration-popup__caretaker_firstname_lastname_middlename"
            >
              ФИО ответственного лица
            </label>
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              name="caretakerPhone"
              className="popup-form-input text-input"
              id="owner-registration-popup__caretaker_Phone"
              component={renderPhone}
              label="Телефон ответственного лица"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__caretaker_email"
              name="caretakerEmail"
              className="popup-form-input text-input"
              required
              type="text"
              component={renderField}
              label="E-mail ответсвенного лица"
            />
          </div>
        </div>
        <div className="owner-registration-popup__half_form">
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__username"
              name="username"
              className="popup-form-input text-input"
              required
              component={renderField}
              label="E-mail/Логин"
              type="text"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__password"
              name="password"
              className="popup-form-input text-input"
              component={renderField}
              required
              type="password"
              label="Пароль"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <Field
              id="owner-registration-popup__password_repeat"
              name="password_repeat"
              className="popup-form-input text-input"
              component={renderField}
              required
              type="password"
              label="Повторите новый пароль"
            />
          </div>
          <div className="form-group popup-form-group popup-form-group--width260">
            <ReCAPTCHA
              style={{ display: 'inline-block' }}
              sitekey="6LeE7YsUAAAAANk5srKzSOg_SMygAnmnELZQ3dF0"
              onChange={value => (recaptcha = value)}
            />
          </div>
        </div>
      </div>
      <div className="owner-registration-popup__buttons">
        <button
          disabled={pristine || submitting || invalid}
          className="popup__button popup__button--filled"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

OwnerRegistrationForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const OwnerRegistrationFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'add_edit_owner_form',
  validate,
})(OwnerRegistrationForm);

export default connect(state => ({ initialValues: state.OwnerRegistrationReducer }))(OwnerRegistrationFormWrapped);
