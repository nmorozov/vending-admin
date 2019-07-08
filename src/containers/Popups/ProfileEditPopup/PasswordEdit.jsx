import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { doChangePassword } from '../../../store/actions/AddEditOwnerActions';

const validate = values => {
  const errors = {};
  if (values.newPassword) {
    if (values.newPassword.length < 8) {
      errors.newPassword = 'Минимальная длина пароля 8 символов';
    }

    if (!/[a-z]/.test(values.newPassword) || !/[A-Z]/.test(values.newPassword) || !/[0-9]/.test(values.newPassword)) {
      errors.newPassword = 'Пароль должен содержать заглавные и строчные буквы и цифры';
    }
  }

  if (!values.newPassword || values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (!values.oldPassword) {
    errors.oldPassword = 'Введите текущий пароль';
  }

  return errors;
};

const submitFunction = (passwordData, dispatch) => {
  dispatch(doChangePassword(passwordData, dispatch));
};

class PasswordEdit extends React.Component {
  renderField = ({ input, id, required, className, label, type, meta: { touched, error } }) => (
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

  render() {
    const { pristine, submitting, handleSubmit, invalid } = this.props;
    return (
      <form className="profile-edit-popup__half_form" onSubmit={handleSubmit}>
        <div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__oldPassword"
              name="oldPassword"
              className="popup-form-input text-input"
              component={this.renderField}
              required
              type="password"
              label="Текущий пароль"
            />
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__newPassword"
              name="newPassword"
              className="popup-form-input text-input"
              component={this.renderField}
              required
              type="password"
              label="Новый пароль"
            />
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="owner-registration-popup__confirmPassword"
              name="confirmPassword"
              className="popup-form-input text-input"
              component={this.renderField}
              required
              type="password"
              label="Повторите новый пароль"
            />
          </div>
        </div>
        <div className="profile-edit-popup__buttons">
          <button
            disabled={pristine || submitting || invalid}
            className="popup__button popup__button--filled"
            type="submit"
          >
            Изменить пароль
          </button>
        </div>
      </form>
    );
  }
}

const PasswordEditWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'password_edit_form',
  validate,
})(PasswordEdit);

export default connect(state => ({
  initialValues: state.ProfileEditReducer,
}))(PasswordEditWrapped);
