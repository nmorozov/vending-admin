import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.css';

const Search = ({ placeholder, onChange, value, submit, fullWidth }) => (
  <div className="search" style={{ width: fullWidth ? '100%' : '385px' }}>
    <input
      onKeyDown={e => {
        if (e.keyCode === 13) {
          submit();
        }
      }}
      onChange={onChange}
      value={value}
      className="search_search_input"
      type="text"
      placeholder={placeholder}
    />
    <button type="button" onClick={() => submit()}>
      <FontAwesomeIcon icon={faSearch} className="search_search_icon" />
    </button>
  </div>
);

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  submit: PropTypes.func,
};

Search.defaultProps = {
  value: '',
  fullWidth: false,
  submit: () => {},
};

export default Search;
