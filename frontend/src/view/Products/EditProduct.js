import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  detailsProduct,
  editProduct,
  listProducts,
} from '../../actions/ProductActions';
import { Alert, Breadcrumb, Spin, notification } from 'antd';
import ProductForm from './components/ProductForm';
import { PRODUCT_UPDATE_RESET } from '../../constants/ProductConstants';
import MaskLoader from '../components/MaskLoader';

const EditProduct = () => {
  const { id } = useParams();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProduct = useCallback(() => {
    dispatch(detailsProduct(id));
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const updateHandler = (e) => {
    const { _id, ...productData } = e;
    dispatch(editProduct(_id, productData));
  };
  const successUpdateHandler = useCallback(() => {
    if (successUpdate) {
      notification.success({
        description: 'Product updated successfully',
        message: 'Success',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: PRODUCT_UPDATE_RESET });
          dispatch(listProducts());
          navigate('/products');
        },
      });
    }
  }, [successUpdate]);

  useEffect(() => {
    successUpdateHandler();
  }, [successUpdateHandler]);

  const errorUpdateHandler = useCallback(() => {
    if (errorUpdate) {
      notification.error({
        description: errorUpdate,
        message: 'Error',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: PRODUCT_UPDATE_RESET });
        },
      });
    }
  }, [errorUpdate]);

  useEffect(() => {
    errorUpdateHandler();
  }, [errorUpdateHandler]);
  const breadCrumbItems = [
    {
      key: 'products',
      title: <Link to={'/products'}>Products</Link>,
    },
    {
      key: 'edit',
      title: 'Edit',
    },
  ];
  return loading ? (
    <MaskLoader />
  ) : error ? (
    <Alert type={'error'} message={error} />
  ) : (
    product && (
      <>
        <Breadcrumb
          className='mb-5'
          items={breadCrumbItems}
        ></Breadcrumb>
        <ProductForm
          type='edit'
          initialValues={product}
          onSubmit={updateHandler}
          loading={loadingUpdate}
        />
      </>
    )
  );
};

export default EditProduct;
