import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Search from '../Search';

import { fetchEnvelopes } from '../../store/actions/EnvelopeActions';

import { SERVER_URL } from '../../core/request';

import './EnvelopesList.css';

class EnvelopesList extends Component {
  constructor(props) {
    super(props);

    const { selectedEnvelopesExternal, selectEnvelopes } = props;

    this.state = {
      filterVariants: [
        { label: 'Все', value: 'all' },
        { label: 'Достопримечательность', value: 'sight' },
        { label: 'Кот', value: 'cat' },
        { label: 'Дух', value: 'spirit' },
      ],
      searchString: '',
      selectedEnvelopes: [].concat(selectedEnvelopesExternal),
      page: 1,
    };

    const { selectedEnvelopes } = this.state;

    selectEnvelopes(selectedEnvelopes);
  }

  componentWillMount() {
    const { fetchEnvelopes } = this.props;
    fetchEnvelopes(0, { forDevicePopup: true });
  }

  handeSearchStringChange = element => {
    this.setState({ searchString: element.target.value });
  };

  toggleSelectedEnvelope = envelopeId => {
    const { selectEnvelopes } = this.props;
    this.setState(previousState => {
      const { selectedEnvelopes } = previousState;
      if (!selectedEnvelopes.includes(envelopeId)) {
        if (selectedEnvelopes.length > 3) {
          return { selectedEnvelopes };
        }
        selectedEnvelopes.push(envelopeId);
        selectEnvelopes(selectedEnvelopes);

        return { selectedEnvelopes };
      }
      const coinIndex = selectedEnvelopes.indexOf(envelopeId);
      selectedEnvelopes.splice(coinIndex, 1);
      selectEnvelopes(selectedEnvelopes);

      return { selectedEnvelopes };
    });

    return true;
  };

  renderCaption = () => {
    const { coinsTypeCaption } = this.props;
    return coinsTypeCaption !== '' ? (
      <div className="five-coins-container__caption">{`Выбор монеты «${coinsTypeCaption}»`}</div>
    ) : (
      <div />
    );
  };

  renderSearch = () => {
    const { allowSearch } = this.props;
    const { searchString } = this.state;
    return allowSearch === true ? (
      <Search onChange={this.handeSearchStringChange} value={searchString} placeholder="Поиск по городу" />
    ) : (
      <div />
    );
  };

  renderEnvelopes = () => {
    const { selectedEnvelopes } = this.state;
    const { envelopes } = this.props;
    if (envelopes.length === 0) return <div />;

    return envelopes.map(envelope => {
      const selectedClass = selectedEnvelopes.includes(envelope.id) ? 'five-coins-container__coin_selected' : '';
      return (
        <button
          onClick={() => {
            this.toggleSelectedEnvelope(envelope.id);
          }}
          type="button"
          key={envelope.id}
          className={`five-coins-container__coin ${selectedClass}`}
        >
          <div className="five-coins-container__tick" />
          <div>
            <img
              className="five-coins-container__coin_image"
              src={`${SERVER_URL}/${envelope.picture}`}
              alt={envelope.name}
            />
          </div>
          <div className="five-coins-container__title">{envelope.name}</div>
        </button>
      );
    });
  };

  render() {
    return (
      <div className="five-coins-container">
        <div className="five-coins-container__search_caption">{this.renderCaption()}</div>
        <div className="five-coins-container__list">{this.renderEnvelopes()}</div>
      </div>
    );
  }
}

EnvelopesList.propTypes = {
  coinsTypeCaption: PropTypes.string,
  allowSearch: PropTypes.bool,
  selectEnvelopes: PropTypes.func.isRequired,
  selectedCoinsExternal: PropTypes.arrayOf(PropTypes.number).isRequired,
};

EnvelopesList.defaultProps = {
  coinsTypeCaption: '',
  allowSearch: false,
};

function mapStateToProps(state) {
  return {
    envelopes: state.EnvelopesReducer.toJS().envelopes,
    loadFrom: state.CoinsReducer.get('loadFrom'),
    isLoading: state.CoinsReducer.get('isLoading'),
    isLoadingFinished: state.CoinsReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  { fetchEnvelopes },
)(EnvelopesList);
