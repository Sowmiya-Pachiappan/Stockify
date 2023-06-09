import { Alert, Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/AuthActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const initValues = {
    email: 'admin@admin.com',
    password: 'admin',
  };
  const { loading, error, userInfo } = useSelector(
    (state) => state.signin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInHandler = (e) => {
    dispatch(signin(e));
  };
  useEffect(() => {
    if (userInfo) {
      console.log('His');
      navigate('/');
    }
  }, [userInfo, dispatch, navigate]);
  return (
    <Form initialValues={initValues} onFinish={signInHandler}>
      <Form.Item>
        <Typography.Title level={1} className='text-center'>
          Welcome
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
      {error && (
        <Form.Item>
          <Alert type={'error'} message={error} />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type={'primary'}
          block
          htmlType={'submit'}
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
