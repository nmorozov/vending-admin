import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import { createOwner, updateOwner } from '../../../store/actions/AddEditOwnerActions';
import CountriesSelect from '../../../components/CountriesSelect';

const submitFunction = (ownerData, dispatch) => {
  if (ownerData.id) {
    dispatch(updateOwner(ownerData, dispatch));
  } else {
    dispatch(createOwner(ownerData, dispatch));
  }
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

  if (values.ownerPhone) {
    if (values.ownerPhone.replace(/ /g, '').length < 12) {
      errors.ownerPhone = 'Некорректно заполнено поле';
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

class AddEditOwnerForm extends React.Component {
  selectCountry = country => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_owner_form', 'country', country));
  };

  selectCity = city => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_owner_form', 'city', city));
  };

  render() {
    const { pristine, submitting, handleSubmit, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="add-edit-owner-popup__title_container">
          <div className="add-edit-owner-popup__title">
            {initialValues.shortCompanyName ? initialValues.shortCompanyName : 'Регистрация владельца'}
          </div>
          <div className="add-edit-owner-popup__switcher_container">
            <span className="add-edit-owner-popup__switcher_title">Владелец подтвержден</span>
            <label className="switcher-wrapper">
              <Field name="status" className="switcher__input" component="input" type="checkbox" />
              <span className="switcher-wrapper__switcher" />
            </label>
          </div>
        </div>
        <div className="add-edit-owner-popup__body">
          <div className="add-edit-owner-popup__first_half_form">
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-owner-popup__full_name"
                name="fullCompanyName"
                className="popup-form-input text-input"
                component="input"
                required
                type="text"
              />
              <label className="form-control-placeholder" htmlFor="add-edit-owner-popup__full_name">
                Полное наименование компании
              </label>
            </div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-owner-popup__short_name"
                name="shortCompanyName"
                className="popup-form-input text-input short-company-name"
                component="input"
                required
                type="text"
              />
              <label className="form-control-placeholder" htmlFor="add-edit-owner-popup__short_name">
                Краткое наименование компании
              </label>
            </div>
            <div className="form-group popup-form-group">
              <CountriesSelect
                selectCountry={this.selectCountry}
                selectCity={this.selectCity}
                value={initialValues.country ? initialValues.country : 'Россия'}
                city={initialValues.city ? initialValues.city : 'Москва'}
              />
            </div>
          </div>
          <div className="add-edit-owner-popup__half_form">
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="add-edit-owner-popup__firstname_lastname_middlename"
                name="ownerFullName"
                className="popup-form-input text-input"
                component="input"
                required
                type="text"
              />
              <label className="form-control-placeholder" htmlFor="add-edit-owner-popup__firstname_lastname_middlename">
                ФИО Руководителя
              </label>
            </div>
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="add-edit-owner-popup__phone"
                name="ownerPhone"
                className="popup-form-input text-input"
                required
                type="text"
                component={renderPhone}
                label="Телефон руководителя"
              />
            </div>
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="add-edit-owner-popup__caretaker_firstname_lastname_middlename"
                name="caretakerFullName"
                className="popup-form-input text-input"
                component="input"
                required
                type="text"
              />
              <label
                className="form-control-placeholder"
                htmlFor="add-edit-owner-popup__caretaker_firstname_lastname_middlename"
              >
                ФИО ответственного лица
              </label>
            </div>
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="add-edit-owner-popup__caretaker_Phone"
                name="caretakerPhone"
                className="popup-form-input text-input"
                required
                type="text"
                component={renderPhone}
                label="Телефон ответственного лица"
              />
            </div>
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="owner-registration-popup__caretaker_email"
                name="caretakerEmail"
                className="popup-form-input text-input"
                component={renderField}
                required
                type="text"
                label="E-mail ответсвенного лица"
              />
            </div>
            <div className="form-group popup-form-group popup-form-group--width260">
              <Field
                id="add-edit-owner-popup__email"
                name="ownerEmail"
                className="popup-form-input text-input"
                component={renderField}
                required
                type="text"
                label="E-mail владельца"
              />
            </div>
          </div>
        </div>
        <div className="add-edit-owner-popup__buttons">
          <button disabled={pristine || submitting} className="popup__button popup__button--filled" type="submit">
            Сохранить изменения
          </button>
        </div>
      </form>
    );
  }
}

AddEditOwnerForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const AddEditOwnerFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'add_edit_owner_form',
  validate,
})(AddEditOwnerForm);

export default connect(state => ({ initialValues: state.AddEditOwnerReducer }))(AddEditOwnerFormWrapped);
