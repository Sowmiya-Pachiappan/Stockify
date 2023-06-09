import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import StockHistory from '../models/stockHistory.js';
import { Op } from 'sequelize';
const ReportRouter = express.Router();

ReportRouter.get(
  '/stockHistory/:startDate/:endDate',
  expressAsyncHandler(async (req, res) => {
    try {
      const { startDate, endDate } = req.params;
      let stockHistory;
      console.log(startDate && endDate);
      if (startDate && endDate) {
        stockHistory = await StockHistory.findAll({
          include: { all: true },
          where: {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
        });
      } else {
        stockHistory = await StockHistory.findAll({
          include: { all: true },
        });
      }

      console.log(stockHistory);
      res.send({ stockHistory: stockHistory });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  })
);

export default ReportRouter;
