import React, { Component } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import Config from '../../../core/config';

import Request from '../../../core/request';

import { FiveCoins } from '../../../components/CoinsList';
import EnvelopesList from '../../../components/EnvelopesList';
import { createDevice, updateDevice } from '../../../store/actions/AddEditDeviceActions';
import CountriesSelect from '../../../components/CountriesSelect';

import coinsType from '../../../types/coinTypes';

const submitFunction = (deviceData, dispatch) => {
  if (deviceData.id) {
    dispatch(updateDevice(deviceData, dispatch));
  } else {
    createDevice(deviceData, dispatch);
  }
};

class AddEditDeviceForm extends Component {
  state = {
    selectedOwner: 0,
    currentEntity: 'coins',
  };

  componentDidMount() {
    const { dispatch, initialValues } = this.props;
    if (!Object.prototype.hasOwnProperty.call(initialValues, 'id')) {
      Request.doGetDevicesCount().then(count => {
        const newDeviceId = count + 1;
        dispatch(changeFieldValue('add_edit_device_form', 'externalId', newDeviceId));
        return true;
      });
    } else {
      this.setState({ selectedOwner: initialValues.user.id });
    }
  }

  getSelectedCoinsExternal = () => {
    const { selectedCoinsExternal } = this.props;
    const selectedCoins = [];

    if (!selectedCoinsExternal) {
      return selectedCoins;
    }

    selectedCoinsExternal.map(coin => selectedCoins.push(coin.id));

    return selectedCoins;
  };

  getSelectedEnvelopesExternal = () => {
    const { selectedEnvelopesExternal } = this.props;
    const selectedEnvelopes = [];

    if (!selectedEnvelopesExternal) {
      return selectedEnvelopes;
    }

    selectedEnvelopesExternal.map(envelope => selectedEnvelopes.push(envelope.id));

    return selectedEnvelopes;
  };

  getCurrentOwnerIndex = owner => {
    const { owners } = this.props;
    const formattedOwners = this.renderOwnersList(owners);
    return _.findIndex(formattedOwners, ['value', owner]);
  };

  selectSpiritCoins = spiritCoins => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_device_form', 'spiritCoins', spiritCoins.join(' ')));
  };

  selectEnvelopes = envelopes => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_device_form', 'envelopes', envelopes.join(' ')));
  };

  selectCountry = country => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_device_form', 'country', country));
  };

  selectCity = city => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_device_form', 'city', city));
  };

  selectOwner = owner => {
    const { dispatch } = this.props;
    dispatch(changeFieldValue('add_edit_device_form', 'userId', owner.value));
    this.setState({ selectedOwner: owner.value });
  };

  renderOwnersList = owners => {
    const formattedOwners = [];
    owners.forEach(owner => {
      formattedOwners.push({ label: owner.shortCompanyName, value: owner.id });
    });

    return formattedOwners;
  };

  toogleCurrentEntity = entity => {
    this.setState({ currentEntity: entity });
  };

  render() {
    const { pristine, submitting, handleSubmit, owners, initialValues } = this.props;
    const { selectedOwner, currentEntity } = this.state;
    return (
      <div>
        <div className="profile-edit-popup__title">{`${
          !Object.prototype.hasOwnProperty.call(initialValues, 'id')
            ? 'Регистрация аппарата'
            : 'Редактирование аппарата'
        }`}</div>
        <form onSubmit={handleSubmit}>
          <div className="add-edit-device-popup__body">
            <div className="add-edit-device-popup__first_half_form">
              <div className="form-group popup-form-group">
                <Field
                  id="add-edit-device-popup__device_id"
                  required
                  name="externalId"
                  className="popup-form-input text-input"
                  type="text"
                  component="input"
                  disabled={!Config.isAdmin()}
                />
                <label className="form-control-placeholder" htmlFor="add-edit-device-popup__device_id">
                  ID
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
              <div className="form-group popup-form-group">
                <Field
                  id="add-edit-device-popup__placement_address"
                  name="placementAddress"
                  className="popup-form-input text-input"
                  component="input"
                  required
                  type="text"
                  disabled={!Config.isAdmin()}
                />
                <label className="form-control-placeholder" htmlFor="add-edit-device-popup__placement_address">
                  Адрес установки
                </label>
              </div>
            </div>
            <div className="add-edit-device-popup__half_form">
              <div className="form-group popup-form-group popup-form-group--width260">
                <Field
                  id="add-edit-device-popup__software_version"
                  name="softwareVersion"
                  className="popup-form-input text-input"
                  component="input"
                  required
                  type="text"
                  disabled={!Config.isAdmin()}
                />
                <label className="form-control-placeholder" htmlFor="add-edit-device-popup__software_version">
                  Версия ПО
                </label>
              </div>
              <div className="form-group popup-form-group popup-form-group--width260">
                <Field
                  id="add-edit-device-popup__model"
                  name="model"
                  className="popup-form-input text-input"
                  component="input"
                  required
                  type="text"
                  disabled={!Config.isAdmin()}
                />
                <label className="form-control-placeholder" htmlFor="add-edit-device-popup__model">
                  Модель
                </label>
              </div>
              <div className="form-group popup-form-group popup-form-group--width260">
                <Field
                  id="add-edit-device-popup__serial_number"
                  name="serialNumber"
                  className="popup-form-input text-input"
                  component="input"
                  required
                  type="text"
                  disabled={!Config.isAdmin()}
                />
                <label className="form-control-placeholder" htmlFor="add-edit-device-popup__serial_number">
                  Серийный номер
                </label>
              </div>
              {/* <div className="form-group popup-form-group popup-form-group--width260 popup-form-group--vertical-align-center ">
            <span className="add-edit-owner-popup__switcher_title">Статус аппарата</span>
            <label className="switcher-wrapper">
              <Field name="status" className="switcher__input" component="input" type="checkbox" />
              <span className="switcher-wrapper__switcher" />
            </label>
          </div> */}
              {Config.isAdmin() && (
                <div className="form-group popup-form-group popup-form-group--width260">
                  <Select
                    onChange={this.selectOwner}
                    value={this.renderOwnersList(owners)[this.getCurrentOwnerIndex(selectedOwner)]}
                    placeholder="Владелец"
                    options={this.renderOwnersList(owners)}
                  />
                  <Field name="userId" component="input" type="hidden" />
                </div>
              )}
            </div>
          </div>
          <Field name="spiritCoins" component="input" type="hidden" />
          <Field name="envelopes" component="input" type="hidden" />
          <div className="table-controlls-wrapper__switch_buttons">
            <button
              onClick={() => {
                this.toogleCurrentEntity('coins');
              }}
              className={`small-btn ${currentEntity === 'coins' ? 'small-btn__btn_primary' : 'small-btn__btn_white'}`}
              type="button"
            >
              Монеты
            </button>
            <button
              onClick={() => {
                this.toogleCurrentEntity('envelopes');
              }}
              className={`small-btn ${currentEntity === 'coins' ? 'small-btn__btn_white' : 'small-btn__btn_primary'}`}
              type="button"
            >
              Конверты
            </button>
          </div>
          {currentEntity === 'coins' && (
            <FiveCoins
              selectCoins={this.selectSpiritCoins}
              coinsTypeCaption=""
              showCoinCaptions
              allowSearch
              isCoinsSelectable
              selectedCoinsExternal={this.getSelectedCoinsExternal()}
            />
          )}
          {currentEntity === 'envelopes' && (
            <EnvelopesList
              selectedEnvelopesExternal={this.getSelectedEnvelopesExternal()}
              selectEnvelopes={this.selectEnvelopes}
            />
          )}
          <div className="add-edit-device-popup__coins_separator" />
          <div className="add-edit-device-popup__buttons">
            <button disabled={pristine || submitting} className="popup__button popup__button--filled" type="submit">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.AddEditDeviceReducer,
    selectedCoinsExternal: state.AddEditDeviceReducer.coins,
    selectedEnvelopesExternal: state.AddEditDeviceReducer.envelopes,
    owners: state.OwnersReducer.toJS().owners,
  };
}

AddEditDeviceForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedCoinsExternal: PropTypes.arrayOf(coinsType),
  initialValues: PropTypes.arrayOf(coinsType),
};

AddEditDeviceForm.defaultProps = {
  selectedCoinsExternal: undefined,
  initialValues: {},
};

const AddEditDeviceFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'add_edit_device_form',
})(AddEditDeviceForm);

export default connect(mapStateToProps)(AddEditDeviceFormWrapped);
