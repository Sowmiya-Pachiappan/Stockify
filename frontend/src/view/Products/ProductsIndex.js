import {
  Alert,
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Typography,
  notification,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  listProducts,
  removeProduct,
} from '../../actions/ProductActions';
import Icon from '../components/Icon';
import ViewProduct from './ViewProduct';
import { PRODUCT_DELETE_RESET } from '../../constants/ProductConstants';
import MaskLoader from '../components/MaskLoader';

const ProductsIndex = () => {
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);
  const { token } = theme.useToken();
  const [showProductView, setShowProductView] = useState(false);
  const [viewProductId, setViewProductId] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!products) {
      dispatch(listProducts());
    }
  }, [products, dispatch]);
  const dataSource = products?.map((product, i) => ({
    ...product,
    sno: i + 1,
    key: i,
  }));
  // PRODUCT EDIT HANDLER
  const editProductHandler = (id) => {
    navigate(`/products/edit/${id}`);
  };
  // PRODUCT DELETE HANDLER
  const deleteProductHandler = (id) => {
    dispatch(removeProduct(id));
  };

  const columns = [
    {
      dataIndex: 'sno',
      title: 'S.No',
    },
    {
      dataIndex: 'sku',
      title: 'SKU',
    },
    {
      dataIndex: 'name',
      title: 'Product Name',
    },
    {
      dataIndex: 'quantity',
      title: 'Quantity',
    },
    {
      dataIndex: 'price',
      title: 'Price',
    },
    {
      dataIndex: 'createdAt',
      title: 'Created At',
      render: (text) => moment(text).format('DD MMM, YYYY'),
    },
    {
      dataIndex: 'updatedAt',
      title: 'Updated At',
      render: (text) => moment(text).format('DD MMM, YYYY'),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Space size={'large'}>
          <Icon
            className='fi fi-rr-eye'
            color={token.colorInfo}
            size={18}
            onClick={() => {
              productViewShowHandler(record._id);
            }}
          />
          <Icon
            className='fi fi-rr-pencil'
            color={token.colorWarning}
            size={18}
            onClick={() => {
              editProductHandler(record._id);
            }}
          />

          <Popconfirm
            title='Are you sure to delete this Product?'
            onConfirm={() => deleteProductHandler(record._id)}
            okText='Yes'
            okButtonProps={{
              loading: loadingDelete,
              htmlType: 'submit',
            }}
            cancelText='No'
          >
            <Icon
              color={token.colorError}
              className={'fi fi-rr-trash'}
              size={18}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  //  TO OPEN DRAWER WINDOW
  const productViewShowHandler = (id) => {
    setShowProductView(true);
    setViewProductId(id);
  };
  //  TO CLOSE DRAWER WINDOW
  const productViewCloseHandler = () => {
    setShowProductView(false);
    setViewProductId('');
  };

  useEffect(() => {
    if (successDelete) {
      notification.success({
        message: 'Success',
        description: 'Product is deleted successfully',
        onClose: () => {
          dispatch(listProducts());
          dispatch({ type: PRODUCT_DELETE_RESET });
          navigate('/products');
        },
      });
    }
  }, [successDelete]);
  useEffect(() => {
    if (errorDelete) {
      notification.error({
        message: 'Error',
        description: errorDelete,
        duration: 1.5,
        onClose: () => {
          dispatch({ type: PRODUCT_DELETE_RESET });
        },
      });
    }
  }, [errorDelete]);

  return loading ? (
    <MaskLoader />
  ) : error ? (
    <Alert type={'error'} message={error} />
  ) : (
    products && (
      <>
        {showProductView && (
          <ViewProduct
            productId={viewProductId}
            onClose={productViewCloseHandler}
            show={showProductView}
          />
        )}
        <Row
          justify={'space-between'}
          align={'middle'}
          gutter={[24, 24]}
          className='mb-5'
        >
          <Col>
            <Typography.Title level={3}>
              Manage Products
            </Typography.Title>
          </Col>
          <Col>
            <Link to={'/products/new'}>
              <Button type={'primary'}>Add New Product</Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={products && products.length > 10}
        />
      </>
    )
  );
};

export default ProductsIndex;
