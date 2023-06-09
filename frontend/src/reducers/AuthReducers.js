import {
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT_ERROR,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
} from '../constants/AuthConstants';

export const signinReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case SIGNIN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const signoutReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNOUT_REQUEST:
      return {
        loading: true,
      };
    case SIGNOUT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SIGNOUT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
