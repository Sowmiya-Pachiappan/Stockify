import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Invoice from './invoiceModel.js';

const InvoiceItems = sequelize.define(
  'invoice_items',
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'invoices',
        key: '_id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
  }
);

export default InvoiceItems;
