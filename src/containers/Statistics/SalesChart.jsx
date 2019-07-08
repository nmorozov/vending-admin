/*eslint no-loop-func: 0*/
import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';

import './SalesChart.css';

const colors = [
  '#729800',
  '#CCCC33',
  '#66FFFF',
  '#0033FF',
  '#9966FF',
  '#CC66CC',
  '#CC0066',
  '#996666',
  '#CC6600',
  '#FFCC33',
  '#FFFF33',
];

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

class SalesChart extends Component {
  render() {
    const { dateData, setChartPeriod, chartPeriod, data, from } = this.props;
    let labels = [];
    let datasets = [];
    let startTime, endTime;
    let colorIndex = 0;
    let maxCount = 0;
    let stepSize = 1;

    if (dateData && Object.keys(dateData).length) {
      let lines = Object.keys(dateData);

      lines.map(line => {
        let dataChart = [];

        switch (chartPeriod) {
          case 'day':
            startTime = (from && from.getTime()) || (Date.now() - 1000 * 60 * 60 * 24);
            endTime = startTime + 1000 * 60 * 60 * 24;
            console.log(from, startTime);
            for (let i = 0; i < 24; i++) {
              let time = new Date(startTime);
              time.setHours(i);
              let curHour = time.getHours();
              !~labels.indexOf(`${curHour}:00`) && labels.push(`${curHour}:00`);
              let count = 0;
              dateData[line].map(s => s >= startTime && s < endTime && new Date(s).getHours() === curHour && count++);
              dataChart.push(count);
              maxCount = Math.max(maxCount, count);
            }
            break;

          case 'week':
            startTime = (from && from.getTime()) || (Date.now() - 1000 * 60 * 60 * 24 * 7);
            endTime = startTime + 1000 * 60 * 60 * 24 * 7;
            for (let i = 0; i < 7; i++) {
              let time = new Date(startTime + 1000 * 60 * 60 * 24 * i);
              let curDay = time.getDay();
              !~labels.indexOf(days[curDay]) && labels.push(days[curDay]);
              let count = 0;
              dateData[line].map(s => s >= startTime && s < endTime && new Date(s).getDay() === curDay && count++);
              dataChart.push(count);
              maxCount = Math.max(maxCount, count);
            }
            break;

          case 'month':
            startTime = (from && from.getTime()) || (Date.now() - 1000 * 60 * 60 * 24 * 30);
            endTime = startTime + 1000 * 60 * 60 * 24 * 30;
            for (let i = 0; i < 30; i++) {
              let time = new Date(startTime + 1000 * 60 * 60 * 24 * i);
              let curDate = time.getDate();
              let curMonth = time.getMonth();
              !~labels.indexOf(`${curDate}.${months[curMonth]}`) && labels.push(`${curDate}.${months[curMonth]}`);
              let count = 0;
              dateData[line].map(s => s >= startTime && s < endTime && new Date(s).getDate() === curDate && count++);
              dataChart.push(count);
              maxCount = Math.max(maxCount, count);
            }
            break;

          case 'year':
            startTime = (from && from.getTime()) || (Date.now() - 1000 * 60 * 60 * 24 * 365);
            endTime = startTime + 1000 * 60 * 60 * 24 * 365;
            let time = new Date(startTime);
            time.setDate(1);
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0);
            for (let i = 0; i < 12; i++) {
              time.setMonth(time.getMonth() + 1);
              let curMonth = time.getMonth();
              !~labels.indexOf(months[curMonth]) && labels.push(months[curMonth]);
              let count = 0;
              dateData[line].map(s => s >= startTime && s < endTime && new Date(s).getMonth() === curMonth && count++);
              dataChart.push(count);
              maxCount = Math.max(maxCount, count);
            }
            break;

          default: break;
        }

        let color = colors[colorIndex++];

        datasets.push({
          label: data.find(d => `${d.id}` === `${line}`).name,
          fill: false,
          borderWidth: 2,
          lineTension: 0.1,
          backgroundColor: color,
          borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: color,
          pointBackgroundColor: color,
          pointBorderWidth: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: '#d7debd',
          pointHoverBorderWidth: 6,
          pointRadius: 3,
          pointHitRadius: 6,
          data: dataChart,
        });

        return true;
      });
    }

    const chartData = {
      labels,
      datasets,
    };

    if (maxCount > 20) {
      stepSize = maxCount / 15;
      if (stepSize < 10) stepSize = Math.floor(stepSize);
      else stepSize = Math.floor(stepSize / 10) * 10;
    }

    return (
      <div className="sales-chart-wrapper">
        <div className="chart-period-wrapper">
          <div
            className={`chart-period-wrapper__item ${chartPeriod === 'day' ? 'chart-period-wrapper__item_active' : ''}`}
          >
            <button
              onClick={() => {
                setChartPeriod('day');
              }}
              type="button"
            >
              День
            </button>
          </div>
          <div
            className={`chart-period-wrapper__item ${
              chartPeriod === 'week' ? 'chart-period-wrapper__item_active' : ''
            }`}
          >
            {' '}
            <button
              onClick={() => {
                setChartPeriod('week');
              }}
              type="button"
            >
              Неделя
            </button>
          </div>
          <div
            className={`chart-period-wrapper__item ${
              chartPeriod === 'month' ? 'chart-period-wrapper__item_active' : ''
            }`}
          >
            {' '}
            <button
              onClick={() => {
                setChartPeriod('month');
              }}
              type="button"
            >
              Месяц
            </button>
          </div>
          <div
            className={`chart-period-wrapper__item ${
              chartPeriod === 'year' ? 'chart-period-wrapper__item_active' : ''
            }`}
          >
            {' '}
            <button
              onClick={() => {
                setChartPeriod('year');
              }}
              type="button"
            >
              Год
            </button>
          </div>
        </div>
        <Line
          data={chartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default SalesChart;
