import {
  PRODUCT_CREATE_ERROR,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_ERROR,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/ProductConstants';
import Axios from 'axios';

export const createProduct =
  (productData) => async (dispatch, getState) => {
    console.log(productData);
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.post(
          '/api/products',
          productData
        );
        dispatch({
          type: PRODUCT_CREATE_SUCCESS,
          payload: data.product,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const {
      signin: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await Axios.get('/api/products/all');
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.products,
      });
    } else {
      throw new Error('You are not authorized');
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsProduct =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.get(
          `/api/products/${productId}`
        );
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editProduct =
  (productId, productData) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.put(
          `/api/products/${productId}`,
          productData
        );
        dispatch({
          type: PRODUCT_UPDATE_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeProduct =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const {
        signin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await Axios.delete(
          `/api/products/${productId}`
        );
        dispatch({
          type: PRODUCT_DELETE_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error('You are not authorized');
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
