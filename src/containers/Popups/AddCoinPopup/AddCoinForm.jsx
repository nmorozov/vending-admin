import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';

import Select from 'react-select';
import coinTypes from '../../../types/coinTypes';

import { createCoin, updateCoin } from '../../../store/actions/AddCoinActions';
import { deleteCoin } from '../../../store/actions/CoinActions';
import { showConfirmPopup } from '../../../store/actions/ConfirmPopup';

import coinCategories from '../../../store/constants/coinCategories';

import Request, { SERVER_URL } from '../../../core/request';
import { getCircularText } from '../../../core/utils';

const submitFunction = (coinData, dispatch) => {
  if (coinData.id) {
    dispatch(updateCoin(coinData, dispatch));
  } else {
    createCoin(coinData, dispatch);
  }
};

class AddCoinForm extends Component {
  constructor(props) {
    const { initialValues, dispatch } = props;

    super(props);
    this.state = {
      currentCategory: !initialValues.categoryCode
        ? { value: 'spirit', label: 'Дух' }
        : { value: initialValues.categoryCode, label: initialValues.category },
      currentSide: 'front',
      country: initialValues.country || '',
      city: initialValues.city || '',
      name: initialValues.name || '',
      'frontPicture-preview': initialValues.frontPicture && `${SERVER_URL}/${initialValues.frontPicture}`,
      categories: [
        { label: 'Достопримечательность', value: 'sight' },
        { label: 'Кот', value: 'cat' },
        { label: 'Дух', value: 'spirit' },
      ],
    };

    const { currentCategory } = this.state;

    dispatch(changeFieldValue('add_coin_form', 'categoryCode', currentCategory));
  }

  componentDidUpdate() {
    this.setPreview('frontPicture');
    this.setPreview('backPicture');
  }

  setPreview = async side => {
    const style = {
      fontFamily: 'Montserrat',
      fontSize: '38px',
      kerning: -1.9,
      color: this.state[`${side}-preview`] ? 'white' : 'black',
    };

    const container = document.querySelector(`.${side}-preview`);

    const size = 525;
    const padding = 10;
    let upText = '';
    let downText = '';

    if (side === 'frontPicture') {
      upText = `${this.state.city}⁕${this.state.country}`.toUpperCase();
      downText = new Date()
        .getFullYear()
        .toString()
        .toUpperCase();
    } else {
      upText = 'CHECK•IN•COIN';
      downText = `${this.state.name}`.toUpperCase();
    }

    const circleUpText = getCircularText(upText, size - padding * 2, 0, 'center', true, true, style);
    const circleDownText = getCircularText(downText, size - padding * 2, 180, 'center', true, false, style);

    const circleText = document.createElement('canvas');
    circleText.width = size;
    circleText.height = size;

    container.innerHTML = '';
    container.appendChild(circleText);

    circleText.style.width = 208;
    circleText.style.height = 208;

    const ctContext = circleText.getContext('2d');
    ctContext.fillStyle = '#fff';
    ctContext.fillRect(150, 150, 200, 200);
    if (this.state[`${side}-preview`]) {
      const imageEl = new Image();
      imageEl.src = this.state[`${side}-preview`];
      await new Promise(
        resolve =>
          (imageEl.onload = () => {
            ctContext.drawImage(imageEl, 0, 0);
            resolve();
          }),
      );
    }
    ctContext.drawImage(circleUpText, padding, padding);
    ctContext.drawImage(circleDownText, padding, padding);
  };

  getCategoryByCategoryCode = categoryCode => {
    const coinCategory = coinCategories.find(x => x.categoryCode === categoryCode);
    return coinCategory && coinCategory.category;
  };

  getSubmitButtonCaption(creation) {
    return creation ? 'Создать' : 'Сохранить';
  }

  selectCategory = category => {
    const { dispatch } = this.props;
    this.setState({ currentCategory: category.key });
    dispatch(changeFieldValue('add_coin_form', 'categoryCode', category.value));
    dispatch(changeFieldValue('add_coin_form', 'category', category.label));
  };

  previewFile = async (e, side) => {
    const { dispatch } = this.props;
    const picture = e.target.files[0];

    const picturePreview = picture && (await Request.doConvertCoinPicture({ picture }));

    this.setState({ [`${side}-preview`]: picturePreview && picturePreview.base64 });

    await this.setPreview(side, picturePreview && picturePreview.base64, 'CHECK IN COIN', 'KREMLIN');
    dispatch(changeFieldValue('add_coin_form', side, picture));
  };

  switchSideTo = side => this.setState({ currentSide: side });

  changeCountry = e => {
    this.setState({ country: e.target.value });
  };

  changeCity = e => {
    this.setState({ city: e.target.value });
  };

  changeName = e => {
    this.setState({ name: e.target.value });
  };

  isDeleteButtonVisible(creation) {
    return !creation;
  }

  renderMenu = () => {
    const { categories, currentCategory } = this.state;

    return (
      <div style={{ width: 200 }}>
        <Select
          onChange={this.selectCategory}
          value={currentCategory}
          placeholder="Категория"
          required
          options={categories}
        />
      </div>
    );
  };

  render() {
    const { pristine, submitting, handleSubmit, initialValues, dispatch } = this.props;
    const { currentSide } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <div className="add-coin-popup__body">
          <div>
            <div className="add-coin-popup__big_caption">Лицевая сторона</div>
            <div className="form-group popup-form-group">
              <Field
                id="add-coin-popup__country"
                required
                name="country"
                className="popup-form-input text-input"
                type="text"
                component="input"
                onChange={this.changeCountry}
              />
              <label className="form-control-placeholder" htmlFor="add-coin-popup__country">
                Страна
              </label>
            </div>
            <div className="form-group popup-form-group">
              <Field
                id="add-coin-popup__city"
                required
                name="city"
                className="popup-form-input text-input"
                type="text"
                component="input"
                onChange={this.changeCity}
              />
              <label className="form-control-placeholder" htmlFor="add-coin-popup__city">
                Город
              </label>
            </div>
            <div className={`form-group popup-form-group ${currentSide === 'front' ? '' : 'hidden'}`}>
              <input
                id="add-coin-popup__picture"
                className="popup-form-input file-input"
                type="file"
                onChange={e => {
                  this.previewFile(e, 'frontPicture');
                }}
                ref={input => {
                  this.frontsidePictureInput = input;
                  return true;
                }}
              />
              <label htmlFor="add-coin-popup__picture" className="file-input-label">
                Добавить изображение
              </label>
            </div>
            <div className={`form-group popup-form-group ${currentSide === 'back' ? '' : 'hidden'}`}>
              <input
                id="add-coin-popup__backPicture"
                className="popup-form-input file-input"
                type="file"
                onChange={e => {
                  this.previewFile(e, 'backPicture');
                }}
                ref={input => {
                  this.backsidePictureInput = input;
                  return true;
                }}
              />
              <label htmlFor="add-coin-popup__backPicture" className="file-input-label">
                Добавить изображение
              </label>
            </div>
            <div className="add-coin-popup__buttons">
              <button disabled={pristine || submitting} className="popup__button" type="submit">
                {this.getSubmitButtonCaption(!initialValues.id)}
              </button>
              {this.isDeleteButtonVisible(!initialValues.id) && (
                <button
                  className="popup__button"
                  type="button"
                  onClick={() => {
                    dispatch(
                      showConfirmPopup(() => {
                        dispatch(deleteCoin(initialValues.id));
                      }),
                    );
                  }}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
          <div className="add-coin-popup__half_form">
            <div className="add-coin-popup__big_caption">Обратная сторона</div>
            <div className="form-group popup-form-group">
              <Field
                id="add-coin-popup__name"
                required
                name="name"
                className="popup-form-input text-input"
                type="text"
                component="input"
                onChange={this.changeName}
              />
              <label className="form-control-placeholder" htmlFor="add-coin-popup__name">
                Имя
              </label>
            </div>
            <div className="form-group popup-form-group">
              {this.renderMenu()}
              <Field id="add-coin-popup__category" required name="categoryCode" type="hidden" component="input" />
            </div>
          </div>
          <div className="add-coin-popup__coin_constructor">
            <div className="add-coin-popup__little_caption" />
            <div className="add-coin-popup__coins_side_select_buttons">
              <button
                onClick={() => {
                  this.switchSideTo('front');
                }}
                className={`small-btn small-btn__btn_${currentSide === 'front' ? 'white' : 'primary'}`}
                type="button"
              >
                Лицевая сторона
              </button>
              <button
                onClick={() => {
                  this.switchSideTo('back');
                }}
                className={`small-btn small-btn__btn_${currentSide === 'back' ? 'white' : 'primary'}`}
                type="button"
              >
                Обратная сторона
              </button>
            </div>
            <button
              onClick={() => {
                this.frontsidePictureInput.click();
              }}
              className={`add-coin-popup__upload_frontside_picture_button frontPicture-preview ${
                currentSide === 'front' ? '' : 'hidden'
              }`}
              type="button"
            />
            <button
              className={`add-coin-popup__upload_backside_picture_button backPicture-preview ${
                currentSide === 'back' ? '' : 'hidden'
              }`}
              type="button"
            />
            <Field className="hidden" name="frontPicture" required type="hidden" component="input" />
          </div>
        </div>
      </form>
    );
  }
}

AddCoinForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: coinTypes.isRequired,
};

const AddCoinFormWrapped = reduxForm({
  onSubmit: submitFunction,
  form: 'add_coin_form',
})(AddCoinForm);

export default connect(state => ({
  initialValues: state.AddCoinReducer,
}))(AddCoinFormWrapped);
