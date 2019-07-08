import React from 'react';

import PropTypes from 'prop-types';

import { message } from 'antd';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { generateHidePopupObject } from '../../../store/actions/SendMessageActions';

import { SERVER_URL, ROUTE_MESSAGE } from '../../../core/request';

const FILE_FIELD_NAME = 'file';

const SendMessageForm = props => {
  const { pristine, reset, submitting, handleSubmit } = props;
  const onFormSubmit = (data, dispatch) => {
    const body = new FormData();
    Object.keys(data).forEach(key => {
      body.append(key, data[key]);
    });
    if (data.file) {
      body.append('attachment', data.file[0]);
    }

    fetch(`${SERVER_URL}${ROUTE_MESSAGE}/send`, {
      method: 'POST',
      body,
    })
      .then(() => {
        message.success('Сообщение успешно отправлено');
        dispatch(generateHidePopupObject());
      })
      .catch(() => {
        message.error('Ошибка отправки сообщения');
        dispatch(generateHidePopupObject());
      });
  };

  const renderDropzoneInput = field => {
    const files = field.input.value;
    return (
      <div>
        <Dropzone
          className="drop-zone"
          multiple={false}
          name={field.name}
          onDrop={filesToUpload => field.input.onChange(filesToUpload)}
        >
          <div>
            Прикрепить фаил{' '}
            <span>
              <FontAwesomeIcon icon={faPaperclip} className="drop-zone-icon" />
            </span>
          </div>
        </Dropzone>
        {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
        {files &&
          Array.isArray(files) && (
            <ul>
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="send-message-popup__body">
        <div>
          <Field name="username" component="input" type="hidden" />
          <div className="form-group popup-form-group">
            <Field
              id="send-message-popup__owner_name"
              required
              name="ownerName"
              className="popup-form-input text-input"
              type="text"
              component="input"
            />
            <label className="form-control-placeholder" htmlFor="send-message-popup__owner_name">
              Кому
            </label>
          </div>
          <div className="form-group popup-form-group">
            <Field
              id="send-message-popup__theme"
              name="theme"
              className="popup-form-input text-input"
              component="input"
              required
              type="text"
            />
            <label className="form-control-placeholder" htmlFor="send-message-popup__theme">
              Тема сообщения
            </label>
          </div>
          <div className="popup-form-group">
            <Field name={FILE_FIELD_NAME} component={renderDropzoneInput} />
          </div>
        </div>
        <div>
          <Field
            name="message"
            component="textarea"
            placeholder="Сообщение"
            className="send-message-popup__message popup-form-textarea"
          />
        </div>
      </div>
      <div className="send-message-popup__buttons">
        <button
          disabled={pristine || submitting}
          onClick={reset}
          className="send-message-popup__button popup__button"
          type="button"
        >
          Очистить
        </button>
        <button disabled={pristine || submitting} className="send-message-popup__button popup__button" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

SendMessageForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

const SendMessageFormWrapped = reduxForm({
  form: 'send_message_form',
})(SendMessageForm);

export default connect(state => ({
  initialValues: state.SendMessageReducer,
}))(SendMessageFormWrapped);
