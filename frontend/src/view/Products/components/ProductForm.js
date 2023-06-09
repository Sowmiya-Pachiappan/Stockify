import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from 'antd';

const ProductForm = ({ initialValues, onSubmit, loading, type }) => {
  console.log(initialValues);
  const submitHanlder = (e) => {
    onSubmit(e);
  };
  return (
    <Form initialValues={initialValues} onFinish={submitHanlder}>
      <Form.Item>
        <Typography.Title level={3}>{`${
          type === 'edit' ? 'Edit' : 'Add New'
        }  Product`}</Typography.Title>
      </Form.Item>
      {type === 'edit' && (
        <Form.Item hidden name={'_id'}>
          <Input />
        </Form.Item>
      )}
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <Form.Item
            name={'sku'}
            label={'SKU'}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name={'name'}
            label={'Name'}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <Form.Item
            name={'quantity'}
            label={'Quantity'}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <InputNumber
              controls={false}
              className={'w-100'}
              precision={0}
              min={0}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name={'price'}
            label={'Price'}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: '${label} is required',
              },
            ]}
          >
            <InputNumber
              controls={false}
              className={'w-100'}
              precision={2}
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'end'}>
        <Col>
          <Form.Item>
            <Button
              type={'primary'}
              block
              htmlType={'submit'}
              loading={loading}
            >
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
