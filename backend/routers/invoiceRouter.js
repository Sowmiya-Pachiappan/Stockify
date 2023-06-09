import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';
import sequelize from '../config/dbConfig.js';
import Product from '../models/productModel.js';
import InvoiceItems from '../models/invoiceItemsModel.js';
import easyinvoice from 'easyinvoice';
import StockHistory from '../models/stockHistory.js';

const InvoiceRouter = express.Router();

// ADD A INVOICE
InvoiceRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const lastId = (await Invoice.max('_id')) + 1;
      const invoice = {
        invoiceId: lastId.toString().padStart(5, '0'),
        total: req.body.total,
        date: req.body.date,
      };

      const newInvoice = await Invoice.create(invoice, {
        transaction: t,
      });
      const invoiceItems = req.body.products.map((product) => ({
        invoiceId: newInvoice._id,
        productId: product.productId,
        productName: product.name,
        quantity: product.quantity,
        price: product.price,
        subtotal: product.subtotal,
      }));
      const newInvoiceItems = await InvoiceItems.bulkCreate(
        invoiceItems,
        {
          transaction: t,
        }
      );

      await Promise.all(
        newInvoiceItems.map(async (invoiceItem) => {
          await Product.decrement('quantity', {
            by: invoiceItem.quantity,
            where: { _id: invoiceItem.productId },
            transaction: t,
          });
          const stockData = {
            productId: invoiceItem.productId,
            quantity: invoiceItem.quantity,
            changeType: 'OUT',
          };
          await StockHistory.create(stockData, {
            transaction: t,
          });
        })
      )
        .then(async (r) => {
          await t.commit();
          res.send({
            message: 'New Invoice Created',
          });
        })
        .catch(async (e) => {
          await t.rollback();
          res.status(500).send({
            message: err,
          });
        });
    } catch (err) {
      await t.rollback();
      res.status(500).send({
        message: err,
      });
    }
  })
);

// GET ALL INVOICES
InvoiceRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    try {
      const invoices = await Invoice.findAll();
      res.send({ invoices: invoices });
    } catch (err) {
      res.status(500).send({ message: err.name });
    }
  })
);

// // GET SINGLE INVOICES
// InvoiceRouter.get(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const invoiceId = req.params.id;

//       const invoice = await InvoiceItems.findAll({
//         include: [{ all: true, nested: true }],
//         where: { _id: invoiceId },
//       });
//       res.send({ invoice: invoice });
//     } catch (err) {
//       res.status(500).send({ message: err.name });
//     }
//   })
// );

// DOWNLOAD INVOICE
InvoiceRouter.get(
  '/download/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const invoiceId = req.params.id;

      const invoice = await Invoice.findOne({
        where: { _id: invoiceId },
      });
      const invoiceItems = await InvoiceItems.findAll({
        where: { invoiceId: invoiceId },
      });
      res.send({
        invoice: invoice,
        invoiceItems: invoiceItems,
      });

      // res.send({ data: result });
    } catch (err) {
      res.status(500).send({ message: err.name });
    }
  })
);
export default InvoiceRouter;
