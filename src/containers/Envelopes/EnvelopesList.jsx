import React from 'react';

import { connect } from 'react-redux';
import { message } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { fetchEnvelopes } from '../../store/actions/EnvelopeActions';
import { fetchDevices } from '../../store/actions/DeviceActions';

import Request, { SERVER_URL } from '../../core/request';

import Search from '../../components/Search';

import './EnvelopesList.css';

class EnvelopesList extends React.Component {
  state = {
    selectedEnvelopes: [],
    searchString: '',
    isDeviceFilterOpened: false,
    devicesFilter: 0,
  };

  componentDidMount() {
    const { fetchDevices, fetchEnvelopes } = this.props;
    const sorting = { sort: 'id', forDevicePopup: true };
    fetchEnvelopes(0, sorting);
    fetchDevices(0, sorting);
  }

  handeSearchStringChange = element => {
    this.setState({ searchString: element.target.value });
  };

  toggleSelectedEnvelope = envelopeId => {
    this.setState(previousState => {
      const { selectedEnvelopes } = previousState;

      if (!selectedEnvelopes.includes(envelopeId)) {
        if (selectedEnvelopes.length > 3) {
          return { selectedEnvelopes };
        }
        selectedEnvelopes.push(envelopeId);
        return { selectedEnvelopes };
      }
      const envelopeIndex = selectedEnvelopes.indexOf(envelopeId);
      selectedEnvelopes.splice(envelopeIndex, 1);

      return { selectedEnvelopes };
    });

    return true;
  };

  toggleDeviceFilter = () => {
    this.setState(prevState => ({ isDeviceFilterOpened: !prevState.isDeviceFilterOpened }));
  };

  toggleFilter = deviceId => {
    const { devices } = this.props;
    const envelopes = [];
    _.find(devices, { id: deviceId }).envelopes.map(envelope => envelopes.push(envelope.id));
    this.setState({ devicesFilter: deviceId, selectedEnvelopes: envelopes });
  };

  renderDevicesFilter = () => {
    const { devicesFilter } = this.state;
    const { devices } = this.props;
    return (
      <ul className="filter__list">
        {devices.map(device => (
          <li
            key={device.id}
            onClick={() => this.toggleFilter(device.id)}
            className={`filter__list_item ${devicesFilter === device.id ? 'filter__list_item_selected' : ''}`}
          >
            {device.placementAddress}
          </li>
        ))}
      </ul>
    );
  };

  renderEnvelopes = () => {
    const { envelopes } = this.props;
    const { searchString, selectedEnvelopes } = this.state;
    let filteredEnvelopesList = envelopes;

    if (envelopes.length === 0) {
      return <div />;
    }

    filteredEnvelopesList = envelopes.filter(value => value.name.toLowerCase().includes(searchString.toLowerCase()));

    return filteredEnvelopesList.map(envelope => {
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
            <img className="customer_envelope_image" src={`${SERVER_URL}/${envelope.picture}`} alt={envelope.name} />
          </div>
          <div className="five-coins-container__title">{envelope.name}</div>
        </button>
      );
    });
  };

  doSetEnvelopes = () => {
    const { selectedEnvelopes, devicesFilter } = this.state;
    Request.doSetEnvelopes(devicesFilter, selectedEnvelopes)
      .then(() => {
        message.success('Изменения сохранены');
      })
      .catch(() => {
        message.error('Не сохранить изменения');
      });
  };

  getSelectedDevice = () => {
    const { devicesFilter } = this.state;
    const { devices } = this.props;
    const deviceName = 'Аппарат не выбран';
    if (devicesFilter === 0) {
      return deviceName;
    }

    return devices[_.findKey(devices, { id: devicesFilter })].placementAddress;
  };

  render() {
    const { searchString, isDeviceFilterOpened, devicesFilter } = this.state;
    return (
      <div className="envelopes-page-wrapper">
        <div className="search-and-caption">
          <div className="caption">Конверты</div>
          <Search onChange={this.handeSearchStringChange} value={searchString} placeholder="Поиск по названию" />
        </div>
        <div className="device-filter">
          <div className="table-controlls-wrapper__filter">
            <button type="button" onClick={this.toggleDeviceFilter}>
              <span className="caption">Выбор аппарата</span>
              <FontAwesomeIcon icon={faCaretDown} className="icon" />
            </button>
            <div className={`filter ${!isDeviceFilterOpened ? 'hidden' : ''}`}>
              <button type="button" onClick={this.toggleDeviceFilter}>
                <span className="filter__title">Выбор аппарата</span>
                <FontAwesomeIcon icon={faCaretUp} className="filter__icon" />
              </button>
              <hr className="filter__devider" />
              {this.renderDevicesFilter()}
            </div>
          </div>
          <div className="current-device">{this.getSelectedDevice()}</div>
        </div>

        <div className="envelopes-list">{this.renderEnvelopes()}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => this.doSetEnvelopes()}
            disabled={!devicesFilter}
            className="popup__button popup__button--filled"
            type="button"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    envelopes: state.EnvelopesReducer.toJS().envelopes,
    devices: state.DevicesReducer.toJS().devices,
  };
}

export default connect(
  mapStateToProps,
  { fetchEnvelopes, fetchDevices },
)(EnvelopesList);
