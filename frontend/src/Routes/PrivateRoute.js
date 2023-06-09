import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signin);

  return userInfo ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
