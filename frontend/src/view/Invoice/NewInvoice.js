import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  notification,
} from 'antd';
import { listProducts } from '../../actions/ProductActions';
import dayjs from 'dayjs';
import Icon from '../components/Icon';
import FormItem from 'antd/es/form/FormItem';
import {
  createInvoice,
  listInvoices,
} from '../../actions/InvoiceActions';
import { INVOICE_CREATE_RESET } from '../../constants/invoiceConstants';
import { useNavigate } from 'react-router';
const NewInvoice = () => {
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.invoiceCreate);

  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const initialValues = {
    date: dayjs(new Date()),
    products: [
      {
        name: '',
        quantity: '',
        price: '',
        productId: '',
        subtotal: '',
      },
    ],
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    const allData = { ...e, total };
    console.log(allData);
    dispatch(createInvoice(allData));
  };
  useEffect(() => {
    if (!products) {
      dispatch(listProducts());
    }
  }, [products]);
  const calculateTotalAmount = (products) =>
    products.reduce((a, b) => a + b.subtotal, 0);
  const productChangeHandler = (value) => {
    const productsList = form.getFieldValue('products');
    const filteredProduct = products.find((p) => p.name === value);
    const duplicateCheck = productsList.filter(
      (p) => p.name === value
    );
    if (duplicateCheck.length === 1) {
      const updatedProducts = productsList.map((product) => {
        if (product.name === value) {
          return {
            ...product,
            quantity: '',
            price: filteredProduct.price,
            productId: filteredProduct._id,
            subtotal: '',
          };
        }

        return product;
      });
      form.setFieldsValue({
        products: updatedProducts,
      });
      const total = calculateTotalAmount(updatedProducts);
      setTotal(total);
    }
  };
  const qtyChangeHandler = (qty, value) => {
    const productsList = form.getFieldValue('products');
    const filteredProduct = products.find((p) => p.name === value);
    const duplicateCheck = productsList.filter(
      (p) => p.name === value
    );
    const stock = filteredProduct.quantity;

    if (duplicateCheck.length === 1 && qty <= stock) {
      const updatedProducts = productsList.map((product) => {
        if (product.name === value) {
          return {
            ...product,
            quantity: qty,
            subtotal: filteredProduct.price * qty,
          };
        }
        return product;
      });

      form.setFieldsValue({
        products: updatedProducts,
      });
      const total = calculateTotalAmount(updatedProducts);
      setTotal(total);
    }
  };
  const successHandler = useCallback(() => {
    if (successCreate) {
      notification.success({
        description: 'Invoice created successfully',
        message: 'Success',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: INVOICE_CREATE_RESET });
          dispatch(listInvoices());
          navigate('/invoices');
        },
      });
    }
  }, [successCreate]);

  useEffect(() => {
    successHandler();
  }, [successHandler]);

  const errorHandler = useCallback(() => {
    if (errorCreate) {
      notification.error({
        description: errorCreate,
        message: 'Error',
        duration: 1.5,
        onClose: () => {
          dispatch({ type: INVOICE_CREATE_RESET });
        },
      });
    }
  }, [errorCreate]);
  useEffect(() => {
    errorHandler();
  }, [errorHandler]);
  return (
    <Form
      onFinish={submitHandler}
      initialValues={initialValues}
      form={form}
    >
      <Form.Item>
        <Typography.Title level={3}>Add New Invoice</Typography.Title>
      </Form.Item>
      <Row justify={'space-between'} className='mb-5'>
        <Col>
          <Typography.Title level={4}>Invoice No:1</Typography.Title>
        </Col>
        <Col>
          <Form.Item name={'date'}>
            <DatePicker></DatePicker>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'} className=''>
        <Col>
          <Typography.Title level={4}>Items</Typography.Title>
        </Col>
        <Col>
          <FormItem name={'total'}>
            <Typography.Title level={4}>
              Total: {Number(total).toFixed(2)}
            </Typography.Title>{' '}
          </FormItem>
        </Col>
      </Row>
      <Form.List name='products'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[24, 24]} align={'bottom'}>
                <Col span={24} md={7}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue('products').some(
                              (d) => d === undefined
                            )
                          ) {
                            return Promise.reject(
                              new Error('Missing Product.')
                            );
                          } else if (
                            !value ||
                            getFieldValue('products').filter(
                              (d) => d.name === value
                            ).length !== 1
                          ) {
                            form.setFieldValue(
                              [
                                'products',
                                fields[restField.fieldKey].name,
                                'quantity',
                              ],
                              ''
                            );
                            form.setFieldValue(
                              [
                                'products',
                                fields[restField.fieldKey].name,
                                'subtotal',
                              ],
                              ''
                            );
                            form.setFieldValue(
                              [
                                'products',
                                fields[restField.fieldKey].name,
                                'price',
                              ],
                              ''
                            );
                            const total = calculateTotalAmount(
                              getFieldValue('products')
                            );
                            setTotal(total);
                            return Promise.reject(
                              new Error(
                                'Duplicate values are not allowed.'
                              )
                            );
                          } else {
                            form.getFieldsError([
                              'products',
                              fields[restField.fieldKey].name,
                              'name',
                            ])[2].errors.length > 0 &&
                              form.setFields({
                                name: [
                                  'products',
                                  fields[restField.fieldKey].name,
                                  'name',
                                ],
                                errors: [],
                              });
                            return Promise.resolve();
                          }
                        },
                      }),
                    ]}
                  >
                    <Select
                      onChange={productChangeHandler}
                      loading={loading}
                      placeholder='Product Name'
                      options={
                        products &&
                        products.map((product) => ({
                          label: product.name,
                          value: product.name,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Form.Item hidden {...restField} name={[name, '_id']}>
                  <Input />
                </Form.Item>
                <Col span={24} md={5}>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const stock = products.find(
                            (p) =>
                              p.name ===
                              getFieldValue([
                                'products',
                                fields[restField.fieldKey].name,
                                'name',
                              ])
                          ).quantity;
                          if (!value) {
                            return Promise.reject(
                              new Error('Missing Product.')
                            );
                          } else if (value > stock) {
                            return Promise.reject(
                              new Error(
                                `Greater than Stock Count ${stock}`
                              )
                            );
                          } else {
                            form.getFieldsError([
                              'products',
                              fields[restField.fieldKey].name,
                              'quantity',
                            ])[2].errors.length > 0 &&
                              form.setFields({
                                name: [
                                  'products',
                                  fields[restField.fieldKey].name,
                                  'quantity',
                                ],
                                errors: [],
                              });
                            return Promise.resolve();
                          }
                        },
                      }),
                    ]}
                  >
                    <InputNumber
                      required
                      className='w-100'
                      precision={0}
                      controls={false}
                      placeholder='Quantity'
                      onChange={() => {
                        const qty = form.getFieldValue([
                          'products',
                          fields[restField.fieldKey].name,
                          'quantity',
                        ]);
                        const productName = form.getFieldValue([
                          'products',
                          fields[restField.fieldKey].name,
                          'name',
                        ]);

                        qtyChangeHandler(qty, productName);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={5}>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Price',
                      },
                    ]}
                  >
                    <InputNumber
                      className='w-100'
                      controls={false}
                      precision={2}
                      min={0}
                      placeholder='Price'
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={5}>
                  <Form.Item
                    {...restField}
                    name={[name, 'subtotal']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Subtotal',
                      },
                    ]}
                  >
                    <InputNumber
                      className='w-100'
                      controls={false}
                      precision={2}
                      min={0}
                      placeholder='Subtotal'
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={2}>
                  <Form.Item>
                    <Icon
                      className='fi fi-rr-minus-circle'
                      onClick={() => {
                        fields.length > 1 && remove(name);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<Icon className='fi fi-rr-plus-circle' />}
              >
                Add Row
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={loadingCreate}
        >
          Create Invoice
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewInvoice;
