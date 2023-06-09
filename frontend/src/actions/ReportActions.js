import {
  STOCK_HISTORY_ERROR,
  STOCK_HISTORY_REQUEST,
  STOCK_HISTORY_SUCCESS,
} from '../constants/ReportConstants';
import Axios from 'axios';
export const listStockHistory =
  ({ startDate, endDate }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: STOCK_HISTORY_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.get(
          `/api/reports/stockHistory/${startDate}/${endDate}`
        );
        dispatch({
          type: STOCK_HISTORY_SUCCESS,
          payload: data.stockHistory,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: STOCK_HISTORY_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
