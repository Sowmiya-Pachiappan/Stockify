import Axios from 'axios';
import {
  FILE_DOWNLOAD_FAIL,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_SUCCESS,
} from '../constants/FileConstants';
import { saveAs } from 'file-saver';
import { createInvoicePdf } from '../utils/functions';

export const fileDownload =
  (invoiceId) => async (dispatch, getState) => {
    try {
      dispatch({ type: FILE_DOWNLOAD_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.get(
          `/api/invoices/download/${invoiceId}`
        );
        console.log(data.invoice, data.invoiceItems);
        const invoiceData = {
          ...data.invoice,
          items: data.invoiceItems,
        };

        dispatch({
          type: FILE_DOWNLOAD_SUCCESS,
          payload: invoiceData,
        });
      }
    } catch (error) {
      dispatch({
        type: FILE_DOWNLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
