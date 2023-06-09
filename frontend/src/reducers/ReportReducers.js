import {
  STOCK_HISTORY_ERROR,
  STOCK_HISTORY_REQUEST,
  STOCK_HISTORY_SUCCESS,
} from '../constants/ReportConstants';

export const stockHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_HISTORY_REQUEST:
      return { loading: true };
    case STOCK_HISTORY_SUCCESS:
      return { loading: false, stockHistory: action.payload };
    case STOCK_HISTORY_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
