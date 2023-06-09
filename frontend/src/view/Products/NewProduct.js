import { Breadcrumb, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  createProduct,
  listProducts,
} from '../../actions/ProductActions';
import { useCallback, useEffect } from 'react';
import { PRODUCT_CREATE_RESET } from '../../constants/ProductConstants';
import ProductForm from './components/ProductForm';
import { Link } from 'react-router-dom';

const NewProduct = () => {
  const { loading, error, success } = useSelector(
    (state) => state.productCreate
  );
  const initialValues = {
    sku: '',
    name: '',
    quantity: '',
    price: '',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductHanlder = (e) => {
    dispatch(createProduct(e));
  };

  const successHandler = useCallback(() => {
    if (success) {
      notification.success({
        description: 'Product created successfully',
        message: 'Success',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: PRODUCT_CREATE_RESET });
          dispatch(listProducts());
          navigate('/products');
        },
      });
    }
  }, [success]);

  useEffect(() => {
    successHandler();
  }, [successHandler]);

  const errorHandler = useCallback(() => {
    if (error) {
      notification.error({
        description: error,
        message: 'Error',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: PRODUCT_CREATE_RESET });
        },
      });
    }
  }, [error]);

  useEffect(() => {
    errorHandler();
  }, [errorHandler]);
  const breadCrumbItems = [
    {
      key: 'products',
      title: <Link to={'/products'}>Products</Link>,
    },
    {
      key: 'new',
      title: 'New',
    },
  ];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} className='mb-5' />
      <ProductForm
        initialValues={initialValues}
        onSubmit={addProductHanlder}
        loading={loading}
      />
    </>
  );
};

export default NewProduct;
