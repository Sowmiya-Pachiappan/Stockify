import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'antd';
import { signout } from '../../actions/AuthActions';

const Logout = () => {
  const { loading, error, success } = useSelector(
    (state) => state.signout
  );
  const dispatch = useDispatch();

  const signoutHandler = useCallback(async () => {
    await dispatch(signout());
  }, [dispatch]);
  useLayoutEffect(() => {
    signoutHandler();
  }, [signoutHandler]);
  useEffect(() => {
    if (success) {
      window.location.href = '/login';
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      return <Alert type={'error'} message={error} />;
    }
  }, [error]);

  return;
};

export default Logout;
