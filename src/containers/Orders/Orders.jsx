import React, { Component } from 'react';

import _ from 'lodash';

import BottomScrollListener from 'react-bottom-scroll-listener';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import orderTypes from '../../types/orderTypes';

import BigTableActionsBar from '../../components/BigTableActionsBar';
import OrdersTable from './OrdersTable';
import OrdersMobile from './OrdersMobile';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddEditOrderPopup from '../Popups/AddEditOrderPopup';

import { fetchOrders } from '../../store/actions/OrderActions';
import { showAddEditOrderPopup } from '../../store/actions/AddEditOrderActions';

import Config from '../../core/config';

import newOrderIcon from './svg/new_order_icon.svg';

class Orders extends Component {
  defaultVisibleColumns = ['id', 'date', 'order1cNumber', 'company', 'country', 'city', 'total'];

  defaultSort = { sort: 'id' };

  state = { userVisibleColumns: [], sort: '', page: 1 };

  componentDidMount() {
    const { fetchOrders } = this.props;

    if (!localStorage.getItem('ordersColumn')) {
      localStorage.setItem('ordersColumn', JSON.stringify(this.defaultVisibleColumns));
    }

    if (!localStorage.getItem('ordersSort')) {
      localStorage.setItem('ordersSort', JSON.stringify(this.defaultSort));
    }

    const sorting = JSON.parse(localStorage.getItem('ordersSort'));
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    fetchOrders(0, sorting);

    this.setState({
      userVisibleColumns: JSON.parse(localStorage.getItem('ordersColumn')),
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
    localStorage.setItem('ordersColumn', JSON.stringify(userVisibleColumns));
    this.setState({ userVisibleColumns });
  };

  actionButton = () => {
    const { showAddEditOrderPopup } = this.props;
    return {
      buttonAction: showAddEditOrderPopup,
      svgIcon: newOrderIcon,
      title: 'Добавить новый заказ',
    };
  };

  loadMore = () => {
    const { fetchOrders, isLoadingFinished, isLoading } = this.props;

    if (isLoadingFinished || isLoading) {
      return false;
    }

    const { page } = this.state;
    const sorting = JSON.parse(localStorage.getItem('ordersSort'));

    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }

    fetchOrders(page * 10, sorting);
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
          onClick={() => this.toggleColumn('date')}
          className={`filter__list_item ${userVisibleColumns.includes('date') ? 'filter__list_item_selected' : ''}`}
        >
          Дата
        </li>
        <li
          onClick={() => this.toggleColumn('order1cNumber')}
          className={`filter__list_item ${
            userVisibleColumns.includes('order1cNumber') ? 'filter__list_item_selected' : ''
          }`}
        >
          Номер заказа
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
          onClick={() => this.toggleColumn('total')}
          className={`filter__list_item ${userVisibleColumns.includes('total') ? 'filter__list_item_selected' : ''}`}
        >
          Сумма
        </li>
      </ul>
    );
  };

  doSort = column => {
    const currentSorting = JSON.parse(localStorage.getItem('ordersSort'));
    if (currentSorting.sort === column) column = `-${column}`;
    const { fetchOrders } = this.props;
    const sorting = { sort: column };
    if (Config.get('search_string')) {
      sorting.searchString = Config.get('search_string');
    }
    fetchOrders(0, sorting);
    delete sorting.searchString;
    localStorage.setItem('ordersSort', JSON.stringify(sorting));
    this.setState({
      sort: sorting.sort,
    });
  };

  render() {
    const { orders, isLoading, showAddEditOrderPopup } = this.props;
    const { userVisibleColumns, sort } = this.state;

    return (
      <div>
        <BigTableActionsBar renderFilter={this.renderFilter} actionButton={this.actionButton()} />
        <OrdersTable
          visibleColumns={userVisibleColumns}
          editOrderMethod={showAddEditOrderPopup}
          orders={orders}
          sort={sort}
          doSort={this.doSort}
        />
        <OrdersMobile editOrderMethod={showAddEditOrderPopup} orders={orders} />
        <LoadingSpinner loading={isLoading} color="#c3a94d" size={10} />
        <AddEditOrderPopup />
        <BottomScrollListener
          onBottom={() => {
            this.loadMore();
          }}
        />
      </div>
    );
  }
}

Orders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  showAddEditOrderPopup: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(orderTypes),
  isLoading: PropTypes.bool.isRequired,
};

Orders.defaultProps = {
  orders: [],
};

function mapStateToProps(state) {
  return {
    orders: state.OrdersReducer.toJS().orders,
    loadFrom: state.OrdersReducer.get('loadFrom'),
    isLoading: state.OrdersReducer.get('isLoading'),
    isLoadingFinished: state.OrdersReducer.get('isLoadingFinished'),
  };
}

export default connect(
  mapStateToProps,
  { fetchOrders, showAddEditOrderPopup },
)(Orders);
