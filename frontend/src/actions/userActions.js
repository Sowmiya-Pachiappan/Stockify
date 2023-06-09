import {
  USER_UPDATE_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/UserConstants';

export const editUser = (userData) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  const {
    signin: { userInfo },
  } = getState();

  try {
    if (userInfo) {
      await localStorage.setItem(
        'userInfo',
        JSON.stringify(userData)
      );
      const userInfoData = JSON.parse(
        localStorage.getItem('userInfo')
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: userInfoData });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
