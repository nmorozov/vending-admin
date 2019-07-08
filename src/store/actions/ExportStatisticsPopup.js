import { SHOW_EXPORT_STATISTICS_POPUP, HIDE_EXPORT_STATISTICS_POPUP } from '../constants/exportStatisticsPopup';
import Request from '../../core/request';

const generateShowPopupObject = coinData => ({
  type: SHOW_EXPORT_STATISTICS_POPUP,
  payload: { ...coinData, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_EXPORT_STATISTICS_POPUP,
  payload: { isOpen: false },
});

export function showExportStatisticsPopup(entity) {
  return dispatch => {
    dispatch(generateShowPopupObject({ entity }));
  };
}

export function hideExportStatisticsPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function exportStatistics(entity, filters) {
  console.log(entity);
  return dispatch => {
    Request.doGetInterlanContent('doExportStat', { entity, ...filters }).then(response => {
      dispatch(generateHidePopupObject());
    });
  };
}
