import {
  INVOICE_CREATE_ERROR,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_RESET,
  INVOICE_CREATE_SUCCESS,
  INVOICE_DETAILS_ERROR,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_RESET,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_LIST_ERROR,
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_SUCCESS,
} from '../constants/invoiceConstants';

export const invoiceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_CREATE_REQUEST:
      return { loading: true };
    case INVOICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case INVOICE_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case INVOICE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const invoiceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_DETAILS_REQUEST:
      return { loading: true };
    case INVOICE_DETAILS_SUCCESS:
      return {
        loading: false,
        invoice: action.payload,
      };
    case INVOICE_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case INVOICE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const invoiceListReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_LIST_REQUEST:
      return { loading: true };
    case INVOICE_LIST_SUCCESS:
      return { loading: false, invoices: action.payload };
    case INVOICE_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
