import {
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT_ERROR,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
} from '../constants/AuthConstants';

export const signin = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });
    await localStorage.setItem('userInfo', JSON.stringify(userInfo));
    const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
    dispatch({ type: SIGNIN_SUCCESS, payload: userInfoData });
  } catch (error) {
    dispatch({
      type: SIGNIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => async (dispatch) => {
  try {
    dispatch({ type: SIGNOUT_REQUEST });
    await localStorage.removeItem('userInfo');
    dispatch({ type: SIGNOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: SIGNOUT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
