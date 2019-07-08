import React from 'react';
import { formatDate } from 'react-day-picker/moment';
import NumberFormat from 'react-number-format';

import './OrdersMobile.css';

const OrdersMobile = ({ orders, editOrderMethod }) => {
  function renderOrders(orders) {
    return orders.map(order => (
      <div key={order.id} className="order-mobile__order">
        <div className="order-mobile__order_captions">
          <div className="order-mobile__order_caption">ID</div>
          <div className="order-mobile__order_caption">Дата</div>
          <div className="order-mobile__order_caption">Номер заказа</div>
          <div className="order-mobile__order_caption">Компания</div>
          <div className="order-mobile__order_caption">Город</div>
          <div className="order-mobile__order_caption">Страна</div>
          <div className="order-mobile__order_caption">Сумма</div>
        </div>
        <div className="order-mobile__order_values">
          <div className="order-mobile__order_value">{order.id}</div>
          <div className="order-mobile__order_value order-mobile__order_value--date">
            {formatDate(order.date, 'DD.MM.YYYY', 'ru')}
          </div>
          <div className="order-mobile__order_value">{order.order1cNumber}</div>
          <div className="order-mobile__order_value">{order.company}</div>
          <div className="order-mobile__order_value">{order.city}</div>
          <div className="order-mobile__order_value">{order.country}</div>
          <div className="order-mobile__order_value">
            <NumberFormat value={order.total} displayType="text" thousandSeparator=" " suffix=" руб." />
          </div>
        </div>
      </div>
    ));
  }
  return <div className="orders-mobile">{renderOrders(orders)}</div>;
};

export default OrdersMobile;
