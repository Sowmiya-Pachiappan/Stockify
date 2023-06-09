import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import InvoiceItems from './invoiceItemsModel.js';

const Invoice = sequelize.define(
  'invoices',
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoiceId: {
      type: DataTypes.STRING,
      unique: true,
    },
    total: { type: DataTypes.DECIMAL(10, 2) },
  },
  { timestamps: true }
);

InvoiceItems.hasMany(Invoice);
Invoice.belongsTo(InvoiceItems);
export default Invoice;
