import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Product from './productModel.js';

const StockHistory = sequelize.define(
  'stock_history',
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: '_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    changeType: {
      type: DataTypes.ENUM('IN', 'OUT'),
    },
  },
  { timestamps: true }
);
StockHistory.belongsTo(Product, { onDelete: 'cascade' });
Product.hasOne(StockHistory, {
  onDelete: 'cascade',
});
export default StockHistory;
