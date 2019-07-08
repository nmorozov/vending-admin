import React from 'react';

import PropTypes from 'prop-types';

import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import orderTypes from '../../../types/orderTypes';

import Datepicker from '../../../components/Datepicker';

import { updateOrder, createOrder } from '../../../store/actions/AddEditOrderActions';
import { deleteOrder } from '../../../store/actions/OrderActions';
import { showConfirmPopup } from '../../../store/actions/ConfirmPopup';
import CountriesSelect from '../../../components/CountriesSelect';

const submitFunction = (orderData, dispatch) => {
  if (orderData.id) {
    updateOrder(orderData, dispatch);
  } else {
    createOrder(orderData, dispatch);
  }
};

const validate = values => {
  const errors = {};
  if (values.order1cNumber) {
    if (!/[1-9]/.test(values.order1cNumber)) {
      errors.order1cNumber = 'Некорректно заполнено поле';
    }
  }

  if (values.coinsCount) {
    if (!/[1-9]/.test(values.coinsCount)) {
      errors.coinsCount = 'Некорректно заполнено поле';
    }
  }

  if (values.envelopesCount) {
    if (!/[1-9]/.test(values.envelopesCount)) {
      errors.envelopesCount = 'Некорректно заполнено поле';
    }
  }

  if (values.total) {
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(values.total)) {
      errors.total = 'Некорректно заполнено поле';
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

const AddEditOrderForm = props => {
  const { pristine, submitting, handleSubmit, initialValues, dispatch } = props;

  function onDateChange(day) {
    dispatch(changeFieldValue('order_edit_form', 'date', day));
  }

  function selectCountry(country) {
    const { dispatch } = props;
    dispatch(changeFieldValue('order_edit_form', 'country', country));
  }

  function selectCity(city) {
    const { dispatch } = props;
    dispatch(changeFieldValue('order_edit_form', 'city', city));
  }

  function getPopupCaption(creation) {
    return creation ? 'Создание заказа' : 'Редактирование заказа';
  }

  function isDeleteButtonVisible(creation) {
    return !creation;
  }

  function getSubmitButtonCaption(creation) {
    return creation ? 'Создать' : 'Сохранить';
  }

  return (
    <div>
      <div className="add-edit-order-popup__title">{getPopupCaption(!initialValues.id)}</div>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-order-popup__body">
          <div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-order-popup__company"
                required
                name="company"
                className="popup-form-input text-input"
                type="text"
                component="input"
              />
              <label className="form-control-placeholder" htmlFor="add-edit-order-popup__company">
                Компания
              </label>
            </div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-order-popup__order-1c-number"
                name="order1cNumber"
                className="popup-form-input text-input"
                component={renderField}
                required
                type="text"
                label="Номер заказа из 1С"
              />
            </div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-order-popup__coins-count"
                name="coinsCount"
                className="popup-form-input text-input"
                component={renderField}
                required
                type="text"
                label="Монеты шт."
              />
            </div>
            <div className="form-group popup-form-group">
              <Field
                id="add-edit-order-popup__envelopes-count"
                name="envelopesCount"
                className="popup-form-input text-input"
                component={renderField}
                required
                type="text"
                label="Конверты шт."
              />
            </div>
          </div>
          <div className="add-edit-order-popup__half_form">
            <div className="form-group popup-form-group">
              <Datepicker
                label="Дата"
                name="date"
                id="add-edit-order-popup__date"
                onChange={onDateChange}
                value={initialValues.date}
              />
            </div>
            <div className="form-group popup-form-group">
              <CountriesSelect
                selectCountry={selectCountry}
                selectCity={selectCity}
                value={initialValues.country ? initialValues.country : 'Россия'}
                city={initialValues.city ? initialValues.city : 'Москва'}
              />
            </div>
            <div className="form-group popup-form-group" style={{ marginTop: -8 }}>
              <Field
                id="add-edit-order-popup__total"
                name="total"
                className="popup-form-input text-input"
                required
                component={renderField}
                label="Сумма"
                type="text"
              />
            </div>
          </div>
          <div className="add-edit-order-popup__half_form">
            <div>
              <Field
                id="add-edit-order-popup__note"
                required
                name="note"
                className="add-edit-order-popup__note popup-form-textarea"
                type="text"
                component="textarea"
                placeholder="Примечание"
              />
            </div>
          </div>
        </div>
        <div className="add-edit-order-popup__buttons">
          <button disabled={pristine || submitting} className="popup__button" type="submit">
            {getSubmitButtonCaption(!initialValues.id)}
          </button>
          {isDeleteButtonVisible(!initialValues.id) && (
            <button
              className="popup__button"
              type="button"
              onClick={e => {
                e.preventDefault();
                dispatch(
                  showConfirmPopup(() => {
                    dispatch(deleteOrder(initialValues.id));
                  }),
                );
              }}
            >
              Удалить
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

AddEditOrderForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  initialValues: orderTypes.isRequired,
};

const AddEditOrderFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'order_edit_form',
  validate,
})(AddEditOrderForm);

export default connect(state => ({
  initialValues: state.AddEditOrderReducer,
}))(AddEditOrderFormWrapped);
