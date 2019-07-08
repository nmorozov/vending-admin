import React from 'react';
import { SERVER_URL } from '../../core/request';

import './CoinsMobile.css';

const CoinsMobile = ({ coins, editCoinMethod }) => {
  function renderCoins(coins) {
    return coins.map(coin => (
      <div key={coin.id} onClick={() => editCoinMethod(coin.id)} className="coin-mobile__coin">
        <div className="coin-mobile__coin_captions">
          <div className="coin-mobile__coin_caption">ID</div>
          <div className="coin-mobile__coin_caption">Имя</div>
          <div className="coin-mobile__coin_caption">Тип</div>
          <div className="coin-mobile__coin_caption">Город</div>
          <div className="coin-mobile__coin_caption">Страна</div>
          <div className="coin-mobile__coin_caption">Изображение</div>
        </div>
        <div className="coin-mobile__coin_values">
          <div className="coin-mobile__coin_value">{coin.id}</div>
          <div className="coin-mobile__coin_value coin-mobile__coin_value--bold">{coin.name}</div>
          <div className="coin-mobile__coin_value">{coin.category}</div>
          <div className="coin-mobile__coin_value">{coin.city}</div>
          <div className="coin-mobile__coin_value">{coin.country}</div>
          <div className="coin-mobile__coin_value">
            <img className="coins-mobile__coin_image" src={`${SERVER_URL}/${coin.frontPicture}`} alt={coin.name} />
          </div>
        </div>
      </div>
    ));
  }
  return <div className="coins-mobile">{renderCoins(coins)}</div>;
};

export default CoinsMobile;
