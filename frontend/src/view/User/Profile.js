import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from 'antd';
import { editUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/UserConstants';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.signin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.profileUpdate);
  const dispatch = useDispatch();
  const updateHandler = (e) => {
    dispatch(editUser(e));
  };
  const navigate = useNavigate();
  const successHandler = useCallback(() => {
    if (successUpdate) {
      notification.success({
        description: 'Profile updated successfully',
        message: 'Success',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: USER_UPDATE_RESET });

          navigate(0);
        },
      });
    }
  }, [successUpdate]);

  useEffect(() => {
    successHandler();
  }, [successHandler]);
  return (
    <Row justify={'center'}>
      <Col span={8}>
        <Form initialValues={userInfo} onFinish={updateHandler}>
          <Form.Item>
            <Typography.Title level={3} className='text-center'>
              Profile
            </Typography.Title>
          </Form.Item>
          <Form.Item
            name={'email'}
            label={'Email'}
            labelCol={{ span: 24 }}
            rules={[
              {
                type: 'email',
                message: 'Please input valid ${label}',
              },
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'password'}
            label={'Password'}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {errorUpdate && (
            <Form.Item>
              <Alert type={'error'} message={errorUpdate} />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type={'primary'}
              block
              htmlType={'submit'}
              loading={loadingUpdate}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Profile;
