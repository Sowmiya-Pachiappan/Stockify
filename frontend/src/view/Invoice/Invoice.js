import {
  Table,
  Button,
  Alert,
  Col,
  Row,
  Typography,
  Space,
} from 'antd';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import MaskLoader from '../components/MaskLoader';
import moment from 'moment';
import { useRef } from 'react';

const Invoice = () => {
  const { loading, error, invoiceData } = useSelector(
    (state) => state.fileDownload
  );
  const invoiceRef = useRef();
  console.log();
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const data = invoiceData?.items.map((item, i) => ({
    key: '1',
    item: item.productName,
    price: item.price,
    quantity: item.quantity,
    total: item.subtotal,
  }));

  const generatePDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };
  return loading ? (
    <MaskLoader></MaskLoader>
  ) : error ? (
    <Alert type={'error'} message={error} />
  ) : (
    invoiceData && (
      <div ref={invoiceRef}>
        <div className='m-5'>
          <Row justify={'center'}>
            <Col>
              <Typography.Title level={3}>Invoice</Typography.Title>
            </Col>
          </Row>
          <Row justify={'space-between'} className='mb-5'>
            <Col>
              <Typography.Title level={3}>Stockify</Typography.Title>
            </Col>
            <Col>
              <div>
                <Space split=':' className=''>
                  Date
                  <Typography.Text>
                    {moment(invoiceData.date).format('DD-MM-YYYY')}
                  </Typography.Text>
                </Space>
              </div>
              <div>
                <Space split=':'>
                  Invoice Number
                  <Typography.Text>
                    {invoiceData.invoiceId}
                  </Typography.Text>
                </Space>
              </div>
            </Col>
          </Row>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            className='mb-5'
          />
          <Row justify={'end'}>
            <Col>
              <Typography.Title level={4}>
                Total :{invoiceData.total}
              </Typography.Title>
            </Col>
          </Row>
          <Button
            data-html2canvas-ignore='true'
            type={'primary'}
            className='mt-5 d-print-none'
            onClick={generatePDF}
          >
            Download Invoice
          </Button>
        </div>
      </div>
    )
  );
};

export default Invoice;
