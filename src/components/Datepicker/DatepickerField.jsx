import React from 'react';

import PropTypes from 'prop-types';

import { Field } from 'redux-form';

class DatepickerField extends React.Component {
  render() {
    const { label, name, id } = this.props;
    return (
      <div>
        <Field
          id={id}
          name={name}
          className="popup-form-input text-input"
          component="input"
          required
          type="text"
          autoComplete="off"
          {...this.props}
        />
        <label className="form-control-placeholder" htmlFor="add-edit-order-popup__date">
          {label}
        </label>
      </div>
    );
  }
}

DatepickerField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DatepickerField;
