import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbConfig.js';
import ProductRouter from './routers/productRouter.js';
import InvoiceRouter from './routers/invoiceRouter.js';
import ReportRouter from './routers/reportsRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
sequelize
  .authenticate()
  .then(() =>
    console.log('Connection has been established successfully.')
  )
  .catch((err) =>
    console.error('Unable to connect to the database: ', err)
  );

sequelize.sync();

app.use('/api/products', ProductRouter);
app.use('/api/invoices', InvoiceRouter);
app.use('/api/reports/', ReportRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at ${process.env.APP_PORT}`);
});
