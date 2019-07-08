import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Request from '../../core/request';
import CitiesSelect from '../CitiesSelect';
import Config from '../../core/config';

import './CountriesSelect.css';

class CountriesSelect extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      countries: [],
      cities: [],
      isLoading: true,
      selectedCountry: value,
    };
  }

  componentDidMount() {
    Request.doGetCountries()
      .then(response => {
        this.setState({ isLoading: false, countries: response.countries });
        const { selectCountry, value } = this.props;
        selectCountry(value);
        Request.doGetCities(value)
          .then(response => this.setState({ cities: response.cities }))
          .catch();
      })
      .catch(() => this.setState({ isLoading: false }));
  }

  getCurrentCountryIndex = country => {
    const { countries } = this.state;
    return _.findIndex(countries, ['value', country]);
  };

  handleCountryChange = v => {
    const { selectCountry } = this.props;
    selectCountry(v.value);
    this.setState({ selectedCountry: v.value });
    Request.doGetCities(v.value)
      .then(response => this.setState({ cities: response.cities }))
      .catch();
  };

  render() {
    const { countries, isLoading, cities, selectedCountry } = this.state;
    const { city, selectCity } = this.props;
    return (
      <div>
        <Select
          onChange={this.handleCountryChange}
          className="basic-single"
          classNamePrefix="select"
          value={countries[this.getCurrentCountryIndex(selectedCountry)]}
          isLoading={isLoading}
          isSearchable
          name="country"
          options={countries}
          placeholder="Город"
          isDisabled={!Config.isAdmin()}
        />
        <div className="countries-select__separator" />
        <CitiesSelect selectCity={selectCity} value={city} cities={cities} />
        <div className="countries-select__separator" />
      </div>
    );
  }
}

export default CountriesSelect;
