import React from 'react';
import { SERVER_URL } from '../../core/request';

import './EnvelopesMobile.css';

const EnvelopesMobile = ({ envelopes, editEnvelopeMethod }) => {
  function renderEnvelopes(envelopes) {
    return envelopes.map(envelope => (
      <div
        key={envelope.id}
        onClick={() => {
          editEnvelopeMethod(envelope.id);
        }}
        className="envelope-mobile__envelope"
      >
        <div className="envelope-mobile__envelope_captions">
          <div className="envelope-mobile__envelope_caption">ID</div>
          <div className="envelope-mobile__envelope_caption">Имя</div>
          <div className="envelope-mobile__envelope_caption">Изображение</div>
          <div className="envelope-mobile__envelope_caption">Примечание</div>
        </div>
        <div className="envelope-mobile__envelope_values">
          <div className="envelope-mobile__envelope_value">{envelope.id}</div>
          <div className="envelope-mobile__envelope_value">{envelope.name}</div>
          <div className="envelope-mobile__envelope_value">
            <img
              className="envelopes-mobile__envelope_image"
              src={`${SERVER_URL}/${envelope.picture}`}
              alt={envelope.name}
            />
          </div>
          <div className="envelope-mobile__envelope_value">{envelope.note}</div>
        </div>
      </div>
    ));
  }
  return <div className="envelopes-mobile">{renderEnvelopes(envelopes)}</div>;
};

export default EnvelopesMobile;
