import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import BottomScrollListener from 'react-bottom-scroll-listener';

import PropTypes from 'prop-types';
import deviceTypes from '../../types/deviceTypes';

import { showConfirmPopup } from '../../store/actions/ConfirmPopup';

import BigTableActionsBar from '../../components/BigTableActionsBar';
import DevicesTable from './DevicesTable';
import SendMessagePopup from '../Popups/SendMessagePopup';
import AddEditDevicePopup from '../Popups/AddEditDevicePopup';
import MonitoringPopup from '../Popups/MonitoringPopup';
import LoadingSpinner from '../../components/LoadingSpinner';

import { showSendMessagePopup } from '../../store/actions/SendMessageActions';
import { showAddEditDevicePopup } from '../../store/actions/AddEditDeviceActions';
import { showMonitoringPopup } from '../../store/actions/MonitoringActions';
import { fetchDevices, setStatus, deleteDevice } from '../../store/actions/DeviceActions';

import DevicesMobile from './DevicesMobile';

import Config from '../../core/config';

import newDeviceIcon from './svg/new_device_icon.svg';

class Devices extends Component {
  defaultVisibleColumns = [
    'id',
    'company',
    'city',
    'placementAddress',
    'softwareVersion',
    'model',
    'status',
    'userStatus',
    'caretakerFullName',
    'caretakerPhone',
    'caretakerEmail',
  ];

  defaultSort = { sort: 'id' };

  state = { userVisibleColumns: [], sort: '', page: 1 };

  componentWillMount() {
    const { fetchDevices } = this.props;

    if (!localStorage.getItem('devicesColumn')) {
      localStorage.setItem('devicesColumn', JSON.stringify(this.defaultVisibleColumns));
    }

    if (!localStorage.getItem('devicesSort')) {
      localStorage.setItem('devicesSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('devicesSort'));
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchDevices(0, sorting);

    this.setState({
      userVisibleColumns: JSON.parse(localStorage.getItem('devicesColumn')),
      sort: sorting.sort || this.defaultSort.sort,
    });
  }

  toggleColumn = columnCode => {
    const { userVisibleColumns } = this.state;
    if (userVisibleColumns.includes(columnCode)) {
      const idx = _.indexOf(userVisibleColumns, columnCode);
      userVisibleColumns.splice(idx, 1);
    } else {
      userVisibleColumns.push(columnCode);
    }
    localStorage.setItem('devicesColumn', JSON.stringify(userVisibleColumns));
    this.setState({ userVisibleColumns });
  };

  actionButton = () => {
    const { showAddEditDevicePopup } = this.props;
    return {
      buttonAction: showAddEditDevicePopup,
      svgIcon: newDeviceIcon,
      title: 'Зарегистрировать новый аппарат',
    };
  };

  loadMore = () => {
    const { fetchDevices, isLoadingFinished, isLoading } = this.props;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('devicesSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchDevices(page * 10, sorting);
    const newPage = page + 1;
    this.setState({ page: newPage });
  };

  renderFilter = () => {
    const { userVisibleColumns } = this.state;
    return (
      <ul className="filter__list">
        <li
          onClick={() => this.toggleColumn('id')}
          className={`filter__list_item ${userVisibleColumns.includes('id') ? 'filter__list_item_selected' : ''}`}
        >
          ID
        </li>
        <li
          onClick={() => this.toggleColumn('company')}
          className={`filter__list_item ${userVisibleColumns.includes('company') ? 'filter__list_item_selected' : ''}`}
        >
          Компания
        </li>
        <li
          onClick={() => this.toggleColumn('city')}
          className={`filter__list_item ${userVisibleColumns.includes('city') ? 'filter__list_item_selected' : ''}`}
        >
          Город
        </li>
        <li
          onClick={() => this.toggleColumn('placementAddress')}
          className={`filter__list_item ${
            userVisibleColumns.includes('placementAddress') ? 'filter__list_item_selected' : ''
          }`}
        >
          Адрес установки
        </li>
        <li
          onClick={() => this.toggleColumn('softwareVersion')}
          className={`filter__list_item ${
            userVisibleColumns.includes('softwareVersion') ? 'filter__list_item_selected' : ''
          }`}
        >
          ПО
        </li>
        <li
          onClick={() => this.toggleColumn('model')}
          className={`filter__list_item ${userVisibleColumns.includes('model') ? 'filter__list_item_selected' : ''}`}
        >
          Модель
        </li>
        <li
          onClick={() => this.toggleColumn('status')}
          className={`filter__list_item ${userVisibleColumns.includes('status') ? 'filter__list_item_selected' : ''}`}
        >
          Статус аппарата
        </li>
        <li
          onClick={() => this.toggleColumn('userStatus')}
          className={`filter__list_item ${
            userVisibleColumns.includes('userStatus') ? 'filter__list_item_selected' : ''
          }`}
        >
          СВ
        </li>
        <li
          onClick={() => this.toggleColumn('caretakerFullName')}
          className={`filter__list_item ${
            userVisibleColumns.includes('caretakerFullName') ? 'filter__list_item_selected' : ''
          }`}
        >
          Ответственное лицо
        </li>
        <li
          onClick={() => this.toggleColumn('caretakerPhone')}
          className={`filter__list_item ${
            userVisibleColumns.includes('caretakerPhone') ? 'filter__list_item_selected' : ''
          }`}
        >
          Телефон
        </li>
        <li
          onClick={() => this.toggleColumn('caretakerEmail')}
          className={`filter__list_item ${
            userVisibleColumns.includes('caretakerEmail') ? 'filter__list_item_selected' : ''
          }`}
        >
          E-mail ответственного лица
        </li>
      </ul>
    );
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('devicesSort'));
    if (currentSorting.sort === column) column = `-${column}`;
    const { fetchDevices } = this.props;
    const sorting = { sort: column };
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    fetchDevices(0, sorting);
    delete sorting.searchString;
    localStorage.setItem('devicesSort', JSON.stringify(sorting));
    this.setState({
      sort: sorting.sort,
    });
  };

  render() {
    const {
      showSendMessagePopup,
      showAddEditDevicePopup,
      isLoading,
      devices,
      setStatus,
      deleteDevice,
      showConfirmPopup,
      showMonitoringPopup,
    } = this.props;
    const { userVisibleColumns, sort } = this.state;

    return (
      <div>
        <BigTableActionsBar renderFilter={this.renderFilter} actionButton={this.actionButton()} />
        <DevicesTable
          sendMessageMethod={showSendMessagePopup}
          devices={devices}
          editDeviceMethod={showAddEditDevicePopup}
          monitoringMethod={showMonitoringPopup}
          deleteDeviceMethod={deleteDevice}
          setStatusMethod={setStatus}
          visibleColumns={userVisibleColumns}
          showConfirmPopup={showConfirmPopup}
          sort={sort}
          doSort={this.doSort}
        />
        <SendMessagePopup />
        <AddEditDevicePopup />
        <MonitoringPopup />
        <LoadingSpinner loading={isLoading} color="#c3a94d" size={10} />
        <DevicesMobile
          sendMessageMethod={showSendMessagePopup}
          deleteOwnerMethod={deleteDevice}
          editDeviceMethod={showAddEditDevicePopup}
          devices={devices}
          showConfirmPopup={showConfirmPopup}
        />
        <BottomScrollListener
          onBottom={() => {
            this.loadMore();
          }}
        />
      </div>
    );
  }
}

Devices.propTypes = {
  showAddEditDevicePopup: PropTypes.func.isRequired,
  showSendMessagePopup: PropTypes.func.isRequired,
  fetchDevices: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setStatus: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(deviceTypes),
  deleteDevice: PropTypes.func.isRequired,
};

Devices.defaultProps = {
  devices: [],
};

function mapStateToProps(state) {
  return {
    devices: state.DevicesReducer.toJS().devices,
    loadFrom: state.DevicesReducer.get('loadFrom'),
    isLoading: state.DevicesReducer.get('isLoading'),
    isLoadingFinished: state.DevicesReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  {
    showSendMessagePopup,
    showAddEditDevicePopup,
    fetchDevices,
    setStatus,
    deleteDevice,
    showConfirmPopup,
    showMonitoringPopup,
  },
)(Devices);
