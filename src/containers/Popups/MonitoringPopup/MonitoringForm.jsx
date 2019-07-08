import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Request from '../../../core/request';

class MonitoringForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email1: '',
      email2: '',
      email3: '',
      email4: '',
      email5: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.props.deviceEmails.map((deviceEmail, index) => this.setState({ [`email${index + 1}`]: deviceEmail.email }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const emails = [];
    const { deviceId } = this.props;

    const { email1, email2, email3, email4, email5 } = this.state;

    if (email1) {
      emails.push(email1);
    }
    if (email2) {
      emails.push(email2);
    }
    if (email3) {
      emails.push(email3);
    }
    if (email4) {
      emails.push(email4);
    }
    if (email5) {
      emails.push(email5);
    }

    Request.doGetInterlanContent('doSetDeviceEmails', { deviceId, emails }).then(() => {
      message.success('Список email изменён');
    });
  }

  sendCommandToDevice(deviceId, commandName, commandValue) {
    Request.doGetInterlanContent('doSendCommandToDevice', { deviceId, commandName, commandValue }).then(() => {
      message.success('Команда поставлена в очередь на исполнение');
    });
  }

  getPrinterStatus(printerStatusId) {
    const printerStatuses = [
      'Не определено',
      'Выключен',
      'В процессе',
      'Готов к печати',
      'Ошибка бумаги',
      'Нет бумаги',
      'Глобальная ошибка',
    ];

    return printerStatuses[printerStatusId];
  }

  getPaymentStatus(paymentStatusId) {
    return !paymentStatusId ? 'выключена' : 'включена';
  }

  getEnvelopeStatusRow(statusObject, number) {
    if (!statusObject) {
      return <tr />;
    }
    const status = statusObject.statusId;
    if (status === 0) {
      return (
        <tr>
          <td>{number}</td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td />
          <td />
        </tr>
      );
    }
    if (status === 1) {
      return (
        <tr>
          <td>{number}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      );
    }
    if (status === 2) {
      return (
        <tr>
          <td>{number}</td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_red" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_red" />
          </td>
          <td />
          <td />
          <td />
        </tr>
      );
    }

    if (status === 3) {
      return (
        <tr>
          <td>{number}</td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_red" />
          </td>
          <td />
          <td />
          <td />
        </tr>
      );
    }
    if (status === 4) {
      return (
        <tr>
          <td>{number}</td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_green" />
          </td>
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_red" />
          </td>
          <td />
          <td />
        </tr>
      );
    }
    if (status === 5) {
      return (
        <tr>
          <td>{number}</td>
          <td />
          <td />
          <td />
          <td className="monitoring-popup__status-cell">
            <div className="monitoring-popup__point monitoring-popup__point_red" />
          </td>
          <td />
        </tr>
      );
    }

    return (
      <tr>
        <td>{number}</td>
        <td />
        <td />
        <td />
        <td />
        <td className="monitoring-popup__status-cell">
          <div className="monitoring-popup__point monitoring-popup__point_red" />
        </td>
      </tr>
    );
  }

  render() {
    const {
      version,
      externalId,
      printerStatus,
      currentPage,
      payment,
      envelopeModuleStatuses,
      lastPrinting,
      coinStatus,
    } = this.props;
    return (
      <div>
        <div className="monitoring-popup__title">Мониторинг</div>
        <div>
          <table className="">
            <thead>
              <tr>
                <td>ID</td>
                <td>Версия ПО</td>
                <td>Текущая страница</td>
                <td>Оплата</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{externalId}</td>
                <td>{version}</td>
                <td>{currentPage}</td>
                <td>{this.getPaymentStatus(payment)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div>
          <table>
            <tbody>
              <tr>
                <td>Email:</td>
                <td>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      1{' '}
                      <input
                        name="email1"
                        value={this.state.email1}
                        onChange={this.handleInputChange}
                        className="popup-form-input text-input"
                        type="email"
                      />
                    </div>
                    <div>
                      2{' '}
                      <input
                        value={this.state.email2}
                        onChange={this.handleInputChange}
                        name="email2"
                        className="popup-form-input text-input"
                        type="email"
                      />
                    </div>
                    <div>
                      3{' '}
                      <input
                        value={this.state.email3}
                        onChange={this.handleInputChange}
                        name="email3"
                        className="popup-form-input text-input"
                        type="email"
                      />
                    </div>
                    <div>
                      4{' '}
                      <input
                        value={this.state.email4}
                        onChange={this.handleInputChange}
                        name="email4"
                        className="popup-form-input text-input"
                        type="email"
                      />
                    </div>
                    <div>
                      5{' '}
                      <input
                        value={this.state.email5}
                        onChange={this.handleInputChange}
                        name="email5"
                        className="popup-form-input text-input"
                        type="email"
                      />
                    </div>
                    <div>
                      <button style={{ marginTop: 20 }} className="popup__button popup__button--filled" type="submit">
                        Сохранить
                      </button>
                    </div>
                  </form>
                </td>
                <td width="100">
                  <div>
                    <button
                      onClick={() => this.sendCommandToDevice(externalId, 'payment', 1)}
                      className="popup__button popup__button--filled"
                      type="button"
                    >
                      Отключить оплату
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => this.sendCommandToDevice(externalId, 'payment', 2)}
                      style={{ marginTop: 20 }}
                      className="popup__button popup__button--filled"
                      type="button"
                    >
                      Включить оплату
                    </button>
                  </div>
                  <div>
                    <button
                      style={{ marginTop: 20 }}
                      onClick={() => this.sendCommandToDevice(externalId, 'vendingRestart', 1)}
                      className="popup__button popup__button--filled"
                      type="button"
                    >
                      Перезагрузка ВА
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="monitoring-popup__title">Конверты</div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Наличие катрижда</td>
                        <td>Наличие конверта</td>
                        <td>Толкатель</td>
                        <td>Ошибка концевика</td>
                        <td>Ошибка при выдаче</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.getEnvelopeStatusRow(envelopeModuleStatuses[0], 1)}
                      {this.getEnvelopeStatusRow(envelopeModuleStatuses[1], 2)}
                      {this.getEnvelopeStatusRow(envelopeModuleStatuses[2], 3)}
                      {this.getEnvelopeStatusRow(envelopeModuleStatuses[3], 4)}
                    </tbody>
                  </table>
                </td>
                <td />
                <td width="100">
                  <button
                    onClick={() => this.sendCommandToDevice(externalId, 'envelopeRestart', 1)}
                    className="popup__button popup__button--filled"
                    type="button"
                  >
                    Перезагрузка конвертов
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="monitoring-popup__title">Принтер</div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div>статус: {this.getPrinterStatus(printerStatus)}</div>
                  <div>монеты: {coinStatus === 1 ? 'Нет' : 'Есть'}</div>
                  <div>результат последней печати: {lastPrinting === 1 ? 'Ошибка' : 'Ок'}</div>
                </td>
                <td />
                <td width="100">
                  <button
                    onClick={() => this.sendCommandToDevice(externalId, 'printerRestart', 1)}
                    className="popup__button popup__button--filled"
                    type="button"
                  >
                    Перезагрузка принтера
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    version: state.MonitoringReducer.version ? state.MonitoringReducer.version : 'N/A',
    externalId: state.MonitoringReducer.device ? state.MonitoringReducer.device.externalId : 'N/A',
    deviceId: state.MonitoringReducer.deviceId,
    printerStatus:
      typeof state.MonitoringReducer.printerStatus !== 'undefined' ? state.MonitoringReducer.printerStatus : 'N/A',
    currentPage: state.MonitoringReducer.currentPage,
    payment: state.MonitoringReducer.payment,
    envelopeModuleStatuses:
      typeof state.MonitoringReducer.envelopeModuleStatuses !== 'undefined'
        ? JSON.parse(state.MonitoringReducer.envelopeModuleStatuses)
        : '',
    lastPrinting: state.MonitoringReducer.lastPrinting,
    coinStatus: state.MonitoringReducer.coinStatus,
    deviceEmails: state.MonitoringReducer.device_emails,
  };
}

export default connect(mapStateToProps)(MonitoringForm);
