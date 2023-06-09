import {
  FILE_DOWNLOAD_FAIL,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_RESET,
  FILE_DOWNLOAD_SUCCESS,
  FILE_VIEW_FAIL,
  FILE_VIEW_REQUEST,
  FILE_VIEW_RESET,
  FILE_VIEW_SUCCESS,
} from '../constants/FileConstants';

export const fileDownloadReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_DOWNLOAD_REQUEST:
      return { loading: true };
    case FILE_DOWNLOAD_SUCCESS:
      return {
        loading: false,
        invoiceData: action.payload,
      };
    case FILE_DOWNLOAD_FAIL:
      return { loading: false, error: action.payload };
    case FILE_DOWNLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const fileViewReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_VIEW_REQUEST:
      return { loading: true };
    case FILE_VIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case FILE_VIEW_FAIL:
      return { loading: false, error: action.payload };
    case FILE_VIEW_RESET:
      return {};
    default:
      return state;
  }
};
