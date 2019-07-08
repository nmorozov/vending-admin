import React, { Component } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import BottomScrollListener from 'react-bottom-scroll-listener';

import { connect } from 'react-redux';
import { showAddEditOwnerPopup } from '../../store/actions/AddEditOwnerActions';

import { showConfirmPopup } from '../../store/actions/ConfirmPopup';

import ownerTypes from '../../types/ownerTypes';

import Config from '../../core/config';

import BigTableActionsBar from '../../components/BigTableActionsBar';
import OwnersTable from './OwnersTable';
import SendMessagePopup from '../Popups/SendMessagePopup';
import AddEditOwnerPopup from '../Popups/AddEditOwnerPopup';

import { showSendMessagePopup } from '../../store/actions/SendMessageActions';
import LoadingSpinner from '../../components/LoadingSpinner';

import { fetchOwners, deleteOwner } from '../../store/actions/OwnerActions';

import OwnersMobile from './OwnersMobile';

import newUserIcon from './svg/new_user_icon.svg';

class Owners extends Component {
  defaultVisibleColumns = ['id', 'company', 'country', 'city', 'status', 'caretaker', 'phone', 'email'];

  defaultSort = { sort: 'id' };

  state = { userVisibleColumns: [], sort: '', page: 1 };

  componentWillMount() {
    const { fetchOwners } = this.props;
    if (!localStorage.getItem('ownersColumn')) {
      localStorage.setItem('ownersColumn', JSON.stringify(this.defaultVisibleColumns));
    }

    if (!localStorage.getItem('ownersSort')) {
      localStorage.setItem('ownersSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('ownersSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchOwners(0, sorting);

    this.setState({
      userVisibleColumns: JSON.parse(localStorage.getItem('ownersColumn')),
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
    localStorage.setItem('ownersColumn', JSON.stringify(userVisibleColumns));
    this.setState({ userVisibleColumns });
  };

  actionButton = () => {
    const { showAddEditOwnerPopup } = this.props;
    return {
      buttonAction: showAddEditOwnerPopup,
      svgIcon: newUserIcon,
      title: 'Зарегистрировать нового владельца',
    };
  };

  loadMore = () => {
    const { fetchOwners, isLoadingFinished, isLoading } = this.props;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('ownersSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchOwners(page * 10, sorting);
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
          onClick={() => this.toggleColumn('country')}
          className={`filter__list_item ${userVisibleColumns.includes('country') ? 'filter__list_item_selected' : ''}`}
        >
          Страна
        </li>
        <li
          onClick={() => this.toggleColumn('city')}
          className={`filter__list_item ${userVisibleColumns.includes('city') ? 'filter__list_item_selected' : ''}`}
        >
          Город
        </li>
        <li
          onClick={() => this.toggleColumn('status')}
          className={`filter__list_item ${userVisibleColumns.includes('status') ? 'filter__list_item_selected' : ''}`}
        >
          СВ
        </li>
        <li
          onClick={() => this.toggleColumn('caretaker')}
          className={`filter__list_item ${
            userVisibleColumns.includes('caretaker') ? 'filter__list_item_selected' : ''
          }`}
        >
          Ответственное лицо
        </li>
        <li
          onClick={() => this.toggleColumn('phone')}
          className={`filter__list_item ${userVisibleColumns.includes('phone') ? 'filter__list_item_selected' : ''}`}
        >
          Телефон
        </li>
        <li
          onClick={() => this.toggleColumn('email')}
          className={`filter__list_item ${userVisibleColumns.includes('email') ? 'filter__list_item_selected' : ''}`}
        >
          E-mail владельца
        </li>
      </ul>
    );
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('ownersSort'));
    if (currentSorting.sort === column) column = `-${column}`;
    const { fetchOwners } = this.props;
    const sorting = { sort: column };
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    fetchOwners(0, sorting);
    delete sorting.searchString;
    localStorage.setItem('ownersSort', JSON.stringify(sorting));
    this.setState({
      sort: sorting.sort,
    });
  };

  render() {
    const {
      showSendMessagePopup,
      showAddEditOwnerPopup,
      owners,
      isLoading,
      deleteOwner,
      showConfirmPopup,
    } = this.props;
    const { userVisibleColumns, sort } = this.state;
    return (
      <div>
        <BigTableActionsBar renderFilter={this.renderFilter} actionButton={this.actionButton()} />
        <OwnersTable
          visibleColumns={userVisibleColumns}
          owners={owners}
          sendMessageMethod={showSendMessagePopup}
          editOwnerMethod={showAddEditOwnerPopup}
          deleteOwnerMethod={deleteOwner}
          showConfirmPopup={showConfirmPopup}
          sort={sort}
          doSort={this.doSort}
        />
        <SendMessagePopup />
        <AddEditOwnerPopup />
        <LoadingSpinner loading={isLoading} color="#c3a94d" size={10} />
        <OwnersMobile
          sendMessageMethod={showSendMessagePopup}
          deleteOwnerMethod={deleteOwner}
          editOwnerMethod={showAddEditOwnerPopup}
          owners={owners}
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

Owners.propTypes = {
  showAddEditOwnerPopup: PropTypes.func.isRequired,
  showSendMessagePopup: PropTypes.func.isRequired,
  fetchOwners: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(ownerTypes),
  isLoading: PropTypes.bool.isRequired,
  deleteOwner: PropTypes.func.isRequired,
};

Owners.defaultProps = {
  owners: [],
};

function mapStateToProps(state) {
  return {
    owners: state.OwnersReducer.toJS().owners,
    loadFrom: state.OwnersReducer.get('loadFrom'),
    isLoading: state.OwnersReducer.get('isLoading'),
    isLoadingFinished: state.OwnersReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  { showAddEditOwnerPopup, showSendMessagePopup, fetchOwners, deleteOwner, showConfirmPopup },
)(Owners);
