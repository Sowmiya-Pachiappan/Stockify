import {
  Alert,
  Button,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaskLoader from '../components/MaskLoader';
import { listStockHistory } from '../../actions/ReportActions';
import dayjs from 'dayjs';
import moment from 'moment';
const ReportsIndex = () => {
  const { loading, error, stockHistory } = useSelector(
    (state) => state.stockHistory
  );
  const startDate = dayjs(new Date()).subtract(1, 'year');
  const endDate = dayjs(new Date());
  const [selectedDate, setSelectedDate] = useState([
    startDate,
    endDate,
  ]);
  console.log(stockHistory);
  const dateChangeHandler = (dates) => {
    setSelectedDate(dates);
  };
  const dispatch = useDispatch();

  const reportHandler = () => {
    if (selectedDate) {
      dispatch(
        listStockHistory({
          startDate: selectedDate[0],
          endDate: selectedDate[1],
        })
      );
    }
  };

  useEffect(() => {
    if (!stockHistory) {
      dispatch(
        listStockHistory({
          startDate: selectedDate[0],
          endDate: selectedDate[1],
        })
      );
    }
  }, []);

  const columns = [
    {
      dataIndex: 'sno',
      title: 'S.No',
    },
    {
      dataIndex: ['product', 'sku'],
      title: 'SKU',
    },
    {
      dataIndex: ['product', 'name'],
      title: 'Product Name',
    },
    {
      dataIndex: ['quantity'],
      title: 'Quantity',
    },
    {
      dataIndex: 'changeType',
      title: 'Type',
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
  ];
  const dataSource = stockHistory?.map((history, i) => ({
    ...history,
    sno: i + 1,
    key: i,
  }));
  console.log(dataSource);
  return loading ? (
    <MaskLoader />
  ) : error ? (
    <Alert type={'error'} message={error} />
  ) : (
    <>
      <Row
        justify={'space-between'}
        align={'middle'}
        gutter={[24, 24]}
        className='mb-5'
      >
        <Col>
          <Typography.Title level={3}>Stock History</Typography.Title>
        </Col>
        <Col>
          <Space size={'large'}>
            <DatePicker.RangePicker
              value={selectedDate}
              onChange={dateChangeHandler}
            />
            <Button type={'primary'} onClick={reportHandler}>
              Get Data
            </Button>
          </Space>
        </Col>
      </Row>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ReportsIndex;
