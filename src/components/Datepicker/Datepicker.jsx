import React from 'react';

import PropTypes from 'prop-types';

import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'moment/locale/ru';

import DatepickerField from './DatepickerField';

import 'react-day-picker/lib/style.css';
import './Datepicker.css';

class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    if (!props.value) {
      props.onChange(new Date().toUTCString());
    }
  }

  render() {
    const { onChange, label, name, id, value } = this.props;
    return (
      <DayPickerInput
        selectedDay={value}
        placeholder=""
        onDayChange={onChange}
        formatDate={formatDate}
        format="DD/MM/YYYY"
        parseDate={parseDate}
        keepFocus
        value={formatDate(value, 'DD/MM/YYYY', 'ru')}
        dayPickerProps={{
          locale: 'ru',
          localeUtils: MomentLocaleUtils,
          format: 'DD/MM/YYYY',
        }}
        component={props => <DatepickerField id={id} label={label} name={name} props={props} />}
      />
    );
  }
}

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

Datepicker.defaultProps = {
  value: new Date().toUTCString(),
};

export default Datepicker;
