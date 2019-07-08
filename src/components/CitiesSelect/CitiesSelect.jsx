import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Config from '../../core/config';

class CitiesSelect extends React.Component {
  constructor(props) {
    super(props);
    const { value, selectCity } = this.props;

    this.state = {
      cities: [],
      isLoading: true,
      selectedCity: value,
    };

    selectCity(value);
  }

  getCurrentCityIndex = city => {
    const { cities } = this.props;
    return _.findIndex(cities, ['value', city]);
  };

  handleCityChange = v => {
    const { selectCity } = this.props;
    this.setState({ selectedCity: v.value });
    selectCity(v.value);
  };

  render() {
    const { selectedCity } = this.state;
    const { cities } = this.props;
    return (
      <Select
        onChange={this.handleCityChange}
        className="basic-single"
        classNamePrefix="select"
        value={cities[this.getCurrentCityIndex(selectedCity)]}
        isSearchable
        name="city"
        options={cities}
        placeholder="Страна"
        required
        isDisabled={!Config.isAdmin()}
      />
    );
  }
}

export default CitiesSelect;
