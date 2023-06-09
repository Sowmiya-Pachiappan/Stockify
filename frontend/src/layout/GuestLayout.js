import { Col, Row } from 'antd';
import Layout from 'antd/es/layout/layout';

const GuestLayout = ({ children }) => {
  return (
    <Layout className='bg-transparent h-100'>
      <Row justify={'center'} align={'middle'} className='min-vh-100'>
        <Col span={24} md={8}>
          {children}
        </Col>
      </Row>
    </Layout>
  );
};

export default GuestLayout;
