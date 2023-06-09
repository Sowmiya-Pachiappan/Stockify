import Axios from 'axios';
import {
  INVOICE_CREATE_ERROR,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_DETAILS_ERROR,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_LIST_ERROR,
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_SUCCESS,
} from '../constants/invoiceConstants';
export const createInvoice =
  (invoiceData) => async (dispatch, getState) => {
    console.log(invoiceData);
    try {
      dispatch({ type: INVOICE_CREATE_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.post(
          '/api/invoices',
          invoiceData
        );
        dispatch({
          type: INVOICE_CREATE_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: INVOICE_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listInvoices = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVOICE_LIST_REQUEST });
    const {
      signin: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await Axios.get('/api/invoices/all');
      dispatch({
        type: INVOICE_LIST_SUCCESS,
        payload: data.invoices,
      });
    } else {
      throw new Error('You are not authorized');
    }
  } catch (error) {
    dispatch({
      type: INVOICE_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message || error.message.name,
    });
  }
};

export const detailsInvoice =
  (invoiceId) => async (dispatch, getState) => {
    try {
      dispatch({ type: INVOICE_DETAILS_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.get(
          `/api/invoices/${invoiceId}`
        );
        dispatch({
          type: INVOICE_DETAILS_SUCCESS,
          payload: data.invoice,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: INVOICE_DETAILS_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
