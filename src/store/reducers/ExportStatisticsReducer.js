import { SHOW_EXPORT_STATISTICS_POPUP, HIDE_EXPORT_STATISTICS_POPUP } from '../constants/exportStatisticsPopup';

const initialState = {
  isOpen: false,
  entity: 'coin',
};

const ExportStatisticsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_EXPORT_STATISTICS_POPUP:
      newState = action.payload;
      break;
    case HIDE_EXPORT_STATISTICS_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default ExportStatisticsReducer;
