import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './OwnersMobile.css';

function getPointColor(userStatus) {
  return userStatus ? 'table-ful-width__point_green' : 'table-ful-width__point_red';
}

const OwnersMobile = ({ owners, editOwnerMethod, deleteOwnerMethod, sendMessageMethod, showConfirmPopup }) => {
  function renderOwners(owners) {
    return owners.map(owner => (
      <div className="owner-mobile__wrap">
        <div
          key={owner.id}
          onClick={() => {
            editOwnerMethod(owner.id);
          }}
          className="owner-mobile__owner"
        >
          <div className="owner-mobile__owner_captions">
            <div className="owner-mobile__owner_caption">ID</div>
            <div className="owner-mobile__owner_caption">Компания</div>
            <div className="owner-mobile__owner_caption">Страна</div>
            <div className="owner-mobile__owner_caption">Город</div>
            <div className="owner-mobile__owner_caption">СВ</div>
            <div className="owner-mobile__owner_caption">Ответственное лицо</div>
            <div className="owner-mobile__owner_caption">Телефон</div>
            <div className="owner-mobile__owner_caption">E-mail владельца</div>
          </div>
          <div className="owner-mobile__owner_values">
            <div className="owner-mobile__owner_value">{owner.id}</div>
            <div className="owner-mobile__owner_value owner-mobile__owner_value--bold">{owner.shortCompanyName}</div>
            <div className="owner-mobile__owner_value">{owner.country}</div>
            <div className="owner-mobile__owner_value">{owner.city}</div>
            <div className="owner-mobile__owner_value">
              <div className={`table-full-width__point ${getPointColor(owner.status)}`} />
            </div>
            <div className="owner-mobile__owner_value">{owner.caretakerFullName}</div>
            <div className="owner-mobile__owner_value">{owner.caretakerPhone}</div>
            <div className="owner-mobile__owner_value">{owner.ownerEmail}</div>
          </div>
        </div>
        <div className="table-full-width__actions_block" style={{ textAlign: 'center' }}>
          {owner.id > 2 && (
            <button
              onClick={() => {
                showConfirmPopup(() => {
                  deleteOwnerMethod(owner.id);
                });
              }}
              className="table-full-width__actions_block_button"
              type="button"
            >
              <FontAwesomeIcon className="table-full-width__action_icon" icon={faTrashAlt} />
            </button>
          )}
          <button
            onClick={() => {
              editOwnerMethod(owner.id);
            }}
            className="table-full-width__actions_block_button"
            type="button"
          >
            <FontAwesomeIcon className="table-full-width__action_icon" icon={faPen} />
          </button>
          <button
            className="table-full-width__actions_block_button"
            type="button"
            onClick={() => {
              sendMessageMethod(owner.caretakerEmail, owner.shortCompanyName);
            }}
          >
            <FontAwesomeIcon className="table-full-width__action_icon" icon={faEnvelope} />
          </button>
        </div>
      </div>
    ));
  }
  return <div className="owners-mobile">{renderOwners(owners)}</div>;
};

export default OwnersMobile;
