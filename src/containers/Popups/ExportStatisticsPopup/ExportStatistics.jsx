import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideExportStatisticsPopup, exportStatistics } from '../../../store/actions/ExportStatisticsPopup';

import PopupWrapper from '../../../components/PopupWrapper';

const ExportStatisticsPopup = (props) => {
  let { isOpen, entity, hidePopup, exportStatistics, filter } = props;
  console.log({ isOpen, entity, hidePopup, exportStatistics, filter });
  return (
  <PopupWrapper isOpen={isOpen} hidePopup={hidePopup} popupClasses="export-statistics-popup">
    <div className="export-statistics-popup__caption">Выгрузить таблицу в Excel</div>
    <div className="export-statistics-popup__buttons">
      <button
        onClick={() => {
          exportStatistics(entity, filter);
        }}
        type="button"
      >
        Со включенными фильтрами
      </button>
      <button
        onClick={() => {
          exportStatistics(entity);
        }}
        type="button"
      >
        Без фильтров, со всеми данными
      </button>
    </div>
  </PopupWrapper>
)};

ExportStatisticsPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
  exportStatistics: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isOpen: state.ExportStatisticsReducer.isOpen,
    entity: state.ExportStatisticsReducer.entity,
  };
}

export default connect(
  mapStateToProps,
  { hidePopup: hideExportStatisticsPopup, exportStatistics },
)(ExportStatisticsPopup);
