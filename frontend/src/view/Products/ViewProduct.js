import {
  Alert,
  Avatar,
  Descriptions,
  Divider,
  Drawer,
  Space,
  Spin,
  Typography,
  theme,
} from 'antd';
import React, { useCallback, useEffect } from 'react';
import Icon from '../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../../actions/ProductActions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MaskLoader from '../components/MaskLoader';

const ViewProduct = ({ productId, onClose, show }) => {
  const { token } = theme.useToken();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const fetchViewProductDetails = useCallback(() => {
    if (productId) {
      dispatch(detailsProduct(productId));
    }
  }, [productId]);
  useEffect(() => {
    fetchViewProductDetails();
  }, [fetchViewProductDetails]);

  const closeHandler = () => {
    onClose();
  };
  return loading ? (
    <MaskLoader />
  ) : error ? (
    <Alert type={'error'} />
  ) : (
    product && (
      <Drawer
        open={show}
        onClose={closeHandler}
        extra={
          <Link to={`/products/edit/${product._id}`}>
            <Space style={{ cursor: 'pointer' }}>
              <Icon
                className='fi fi-rr-pencil'
                style={{
                  color: token.colorLink,
                  fontSize: 14,
                }}
              ></Icon>
              Edit
            </Space>
          </Link>
        }
      >
        <Space size={'large'}>
          <Avatar
            size={100}
            style={{ background: token.colorBgLayout }}
            icon={
              <Icon
                className='fi fi-rr-boxes'
                color={token.colorPrimary}
                size={50}
              ></Icon>
            }
            shape={'square'}
          />

          <Space direction={'vertical'} size={0}>
            <Typography.Title level={4} className='mb-0'>
              {product.name}
            </Typography.Title>
            <Typography.Text
              className='mb-0'
              italic
              type={'secondary'}
            >
              {product.sku}
            </Typography.Text>
          </Space>
        </Space>
        <Divider />
        <Descriptions column={1}>
          <Descriptions.Item
            label={
              <Space size={'large'}>
                <Icon
                  className='fi fi-rr-balance-scale-left'
                  color={token.colorPrimary}
                  size={16}
                ></Icon>
                Quantity
              </Space>
            }
          >
            {product.quantity}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space size={'large'}>
                <Icon
                  className='fi fi-rr-tags'
                  color={token.colorPrimary}
                  size={16}
                ></Icon>
                Price
              </Space>
            }
          >
            {product.price || '-'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <Space size={'large'}>
                <Icon
                  className='fi fi-rr-calendar'
                  color={token.colorPrimary}
                  size={16}
                ></Icon>
                Created At
              </Space>
            }
          >
            {moment(product.createdAt).format('DD MMM YYYY')}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space size={'large'}>
                <Icon
                  className='fi fi-rr-calendar-lines-pen'
                  color={token.colorPrimary}
                  size={16}
                ></Icon>
                Updated At
              </Space>
            }
          >
            {moment(product.updatedAt).format('DD MMM YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    )
  );
};

export default ViewProduct;
