import { Navigate, Route, Routes } from 'react-router';
import ProductsIndex from './view/Products/ProductsIndex';
import NewProduct from './view/Products/NewProduct';
import EditProduct from './view/Products/EditProduct';
import { useSelector } from 'react-redux';
import Login from './view/Auth/Login';
import AuthLayout from './layout/AuthLayout';
import GuestLayout from './layout/GuestLayout';
import InvoiceIndex from './view/Invoice/InvoiceIndex';
import NewInvoice from './view/Invoice/NewInvoice';
import ReportsIndex from './view/Reports/ReportsIndex';
import Profile from './view/User/Profile';
import { Button, Result } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Logout from './view/Auth/Logout';
import PrivateRoute from './Routes/PrivateRoute';
import Invoice from './view/Invoice/Invoice';

const App = () => {
  const { userInfo } = useSelector((state) => state.signin);

  return (
    <Routes>
      <Route path='/'>
        <Route
          index
          element={
            <Navigate to={userInfo ? '/products' : '/login'} />
          }
        ></Route>
        <Route
          path='products'
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route index element={<ProductsIndex />}></Route>
          <Route path='new' element={<NewProduct />}></Route>
          <Route path='edit/:id' element={<EditProduct />}></Route>
        </Route>
        <Route
          path='invoices'
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route index element={<InvoiceIndex />}></Route>
          <Route path='new' element={<NewInvoice />}></Route>
          <Route path='download' element={<Invoice />}></Route>
        </Route>
        <Route
          path='reports'
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route index element={<ReportsIndex />}></Route>
          <Route path='new' element={<NewInvoice />}></Route>
        </Route>
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route index element={<Profile />}></Route>
        </Route>
        <Route
          path='login'
          element={
            <GuestLayout>
              <Login />
            </GuestLayout>
          }
        ></Route>
        <Route path='logout' element={<Logout />}></Route>
      </Route>
      <Route
        path='*'
        element={
          <Result
            status={404}
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
              <Link to={userInfo ? '/products' : '/login'}>
                <Button type='primary'>Back Home</Button>
              </Link>
            }
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;
