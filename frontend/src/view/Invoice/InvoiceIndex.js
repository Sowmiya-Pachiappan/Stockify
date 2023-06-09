import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Col,
  Row,
  Space,
  Table,
  Typography,
  theme,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../components/Icon';
import moment from 'moment';
import MaskLoader from '../components/MaskLoader';
import { listInvoices } from '../../actions/InvoiceActions';
import { fileDownload } from '../../actions/FileActions';

const InvoiceIndex = () => {
  const { loading, error, invoices } = useSelector(
    (state) => state.invoiceList
  );
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceDownloadHandler = (id) => {
    dispatch(fileDownload(id));
    navigate('/invoices/download');
  };
  const columns = [
    {
      dataIndex: 'sno',
      title: 'S.No',
    },
    {
      dataIndex: 'invoiceId',
      title: 'Invoice ID',
    },
    {
      dataIndex: 'total',
      title: 'Total',
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
            className='fi fi-rr-download'
            color={token.colorInfo}
            size={18}
            onClick={() => {
              invoiceDownloadHandler(record._id);
            }}
          />
        </Space>
      ),
    },
  ];
  const dataSource = invoices?.map((invoice, i) => ({
    ...invoice,
    sno: i + 1,
    key: i,
  }));
  useEffect(() => {
    if (!invoices) {
      dispatch(listInvoices());
    }
  }, [invoices, dispatch]);
  return loading ? (
    <MaskLoader />
  ) : error ? (
    <Alert type={'error'} message={error} />
  ) : (
    invoices && (
      <>
        <Row
          justify={'space-between'}
          align={'middle'}
          gutter={[24, 24]}
          className='mb-5'
        >
          <Col>
            <Typography.Title level={3}>
              Manage Invoices
            </Typography.Title>
          </Col>
          <Col>
            <Link to={'/invoices/new'}>
              <Button type={'primary'}>Add New Invoice</Button>
            </Link>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={invoices && invoices.length > 10}
        />
      </>
    )
  );
};

export default InvoiceIndex;
